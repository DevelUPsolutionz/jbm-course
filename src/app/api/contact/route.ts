import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';
import { saveLocalContactMessage } from '@/lib/contact-store';
import { sendContactInquiryNotificationEmail } from '@/lib/email/send';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, purpose = 'general', message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // 1. Local fallback storage
    const localRecord = saveLocalContactMessage({
      name,
      email,
      phone,
      purpose,
      message,
    });

    // 2. Trigger email notification asynchronously
    sendContactInquiryNotificationEmail({
      name,
      email,
      phone,
      purpose,
      message,
    }).catch((err) => console.warn("Email alert warning:", err));

    // 3. Primary persistent database storage: Supabase Admin Client
    let dbRecord = null;
    let dbSuccess = false;

    try {
      const supabase = getAdminClient();
      const { data: dbData, error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name,
            email,
            phone: phone || '',
            purpose: purpose || 'general',
            message,
            status: 'unread'
          }
        ])
        .select();

      if (dbError) {
        console.error('Supabase contact insert error:', dbError.message || dbError);
      } else if (dbData && dbData.length > 0) {
        dbRecord = dbData[0];
        dbSuccess = true;
        console.log('Supabase contact insert successful:', dbRecord.id);
      }
    } catch (dbErr) {
      console.warn('Supabase contact insert exception:', dbErr);
    }

    return NextResponse.json({ 
      success: true, 
      data: dbRecord || localRecord,
      dbSynced: dbSuccess 
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


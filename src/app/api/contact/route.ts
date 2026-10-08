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

    // 1. Always save locally first so message is never lost
    const localRecord = saveLocalContactMessage({
      name,
      email,
      phone,
      purpose,
      message,
    });

    // 2. Trigger email notification to admin asynchronously
    sendContactInquiryNotificationEmail({
      name,
      email,
      phone,
      purpose,
      message,
    }).catch((err) => console.warn("Email alert warning:", err));

    // 3. Attempt Supabase insert with Admin client (bypasses RLS)
    try {
      const supabase = getAdminClient();
      const { data: dbData, error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name,
            email,
            phone,
            purpose,
            message,
            status: 'unread'
          }
        ])
        .select();

      if (dbError) {
        console.error('Supabase contact insert error:', dbError.message || dbError);
      } else {
        console.log('Supabase contact insert success:', dbData);
      }
    } catch (dbErr) {
      console.warn('Supabase contact insert exception:', dbErr);
    }

    return NextResponse.json({ success: true, data: localRecord });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


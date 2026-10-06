import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { Mail, Phone, Calendar, Tag, Inbox } from 'lucide-react';

export const revalidate = 0; // Disable cache to always fetch latest messages

export default async function AdminMessagesPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch messages, ordered by newest first
  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Error loading messages. Ensure the contact_messages table is created in Supabase.
        <br />
        Details: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
          <p className="text-sm text-slate-500 mt-1">View and manage inquiries from the website contact form.</p>
        </div>
        <div className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Inbox className="w-4 h-4" />
          <span>{messages?.length || 0} Total</span>
        </div>
      </div>

      {(!messages || messages.length === 0) ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No messages yet</h3>
          <p className="text-slate-500 mt-1">When users submit the contact form, their messages will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              {msg.status === 'unread' && (
                <div className="absolute top-0 right-0 w-2 h-full bg-maroon-600"></div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{msg.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 hover:text-maroon-700 transition-colors">
                      <Mail className="w-4 h-4" />
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 hover:text-maroon-700 transition-colors">
                        <Phone className="w-4 h-4" />
                        {msg.phone}
                      </a>
                    )}
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  msg.purpose === 'corporate' ? 'bg-indigo-100 text-indigo-700' :
                  msg.purpose === 'institution' ? 'bg-emerald-100 text-emerald-700' :
                  msg.purpose === 'course' ? 'bg-amber-100 text-amber-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {msg.purpose}
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 text-slate-700 text-sm whitespace-pre-wrap leading-relaxed border border-slate-100">
                {msg.message}
              </div>

              <div className="flex items-center gap-2 mt-5 text-xs text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(msg.created_at), 'PPP ')} at {format(new Date(msg.created_at), 'p')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

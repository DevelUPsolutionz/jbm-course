"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Mail, Phone, Calendar, Inbox, RefreshCw, Sparkles } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  purpose: string;
  message: string;
  status: "unread" | "read";
  created_at: string;
}

interface MessagesClientViewProps {
  initialMessages: ContactMessage[];
}

export function MessagesClientView({ initialMessages }: MessagesClientViewProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [filterPurpose, setFilterPurpose] = useState<string>("all");

  const fetchMessages = async (isManual = false) => {
    if (isManual) setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.messages && Array.isArray(data.messages)) {
          setMessages(data.messages);
          setLastRefreshed(new Date());
        }
      }
    } catch (err) {
      console.warn("Auto-refresh messages fetch warning:", err);
    } finally {
      if (isManual) setLoading(false);
    }
  };

  // Real-time polling every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages(false);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredMessages = messages.filter((msg) => {
    if (filterPurpose === "all") return true;
    return msg.purpose?.toLowerCase() === filterPurpose.toLowerCase();
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Contact Messages
            </h1>
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" title="Real-time Live Sync Active" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time contact form inquiries from website visitors. Auto-refreshes every 8s.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchMessages(true)}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Syncing..." : "Refresh Messages"}</span>
          </button>

          <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
            <Inbox className="w-4 h-4 text-amber-400" />
            <span>{messages.length} Total</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {["all", "general", "course", "institution", "corporate"].map((p) => (
          <button
            key={p}
            onClick={() => setFilterPurpose(p)}
            className={`px-3.5 py-1.5 rounded-xl border transition-all uppercase tracking-wider ${
              filterPurpose === p
                ? "bg-maroon-800 text-white border-maroon-800 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {p === "all" ? "All Messages" : p}
          </button>
        ))}
      </div>

      {/* Messages Grid or Empty State */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No messages found</h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            When users submit the website contact form, inquiries will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Purpose</th>
                  <th className="px-6 py-4 w-1/3">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50/80 transition-colors relative">
                    <td className="px-6 py-4">
                      {msg.status === "unread" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-maroon-50 text-maroon-700 border border-maroon-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-maroon-600 animate-pulse" />
                          New
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                          Read
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-700">{format(new Date(msg.created_at), "MMM d, yyyy")}</span>
                        <span className="text-[10px]">{format(new Date(msg.created_at), "p")}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        {msg.name}
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                          LIVE
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                        <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-maroon-800 transition-colors">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {msg.email}
                        </a>
                        {msg.phone && (
                          <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-maroon-800 transition-colors">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {msg.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border whitespace-nowrap ${
                        msg.purpose === "corporate"
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                          : msg.purpose === "institution"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : msg.purpose === "course"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}>
                        {msg.purpose}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-slate-700 bg-slate-50/50 p-3 rounded-xl border border-slate-200/60 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto custom-scrollbar">
                        {msg.message}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

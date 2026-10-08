import React from "react";
import { getAdminClient } from "@/lib/supabase/admin";
import { getLocalContactMessages } from "@/lib/contact-store";
import { MessagesClientView } from "@/components/admin/MessagesClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMessagesPage() {
  const localMsgs = getLocalContactMessages();
  let messages: any[] = [...localMsgs];

  try {
    const supabase = getAdminClient();
    const dbPromise = supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 10000)
    );

    const result: any = await Promise.race([dbPromise, timeoutPromise]);

    if (result && !result.error && Array.isArray(result.data)) {
      const dbMsgs = result.data;
      const existingIds = new Set(localMsgs.map((m) => m.id));
      dbMsgs.forEach((dbM: any) => {
        if (!existingIds.has(dbM.id)) {
          messages.push(dbM);
        }
      });
      messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  } catch (err: any) {
    console.warn("Messages page fetch notice (serving local messages):", err.message || err);
  }

  return <MessagesClientView initialMessages={messages} />;
}


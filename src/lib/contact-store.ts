import fs from "fs";
import path from "path";

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  purpose: string;
  message: string;
  status: "unread" | "read";
  created_at: string;
}

const MESSAGES_FILE_PATH = path.join(process.cwd(), "src", "config", "contact-messages.json");

export function getLocalContactMessages(): ContactMessageRecord[] {
  try {
    if (fs.existsSync(MESSAGES_FILE_PATH)) {
      const data = fs.readFileSync(MESSAGES_FILE_PATH, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("Error reading local contact messages:", err);
  }
  return [];
}

export function saveLocalContactMessage(msg: Omit<ContactMessageRecord, "id" | "created_at" | "status">): ContactMessageRecord {
  const existing = getLocalContactMessages();
  const newRecord: ContactMessageRecord = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...msg,
    status: "unread",
    created_at: new Date().toISOString(),
  };

  const updated = [newRecord, ...existing];

  try {
    const dir = path.dirname(MESSAGES_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(MESSAGES_FILE_PATH, JSON.stringify(updated, null, 2), "utf8");
  } catch (err) {
    console.warn("Failed to write local contact message:", err);
  }

  return newRecord;
}

/**
 * Cyber Security & Data Sanitization Utilities
 */

/**
 * Strips dangerous HTML tags and scripts to protect against Cross-Site Scripting (XSS)
 */
export function sanitizeText(input: string | null | undefined): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/javascript:[^"']*/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/[<>]/g, (char) => (char === "<" ? "&lt;" : "&gt;"))
    .trim();
}

/**
 * Defangs CSV/Spreadsheet formula injection characters (=, +, -, @, tab, return)
 * Prevents malicious formula execution when administrators export data into Microsoft Excel or Google Sheets.
 */
export function sanitizeCsvCell(value: any): string {
  if (value === null || value === undefined) {
    return "";
  }

  const str = String(value).trim();

  // If the cell starts with an Excel/Sheets formula operator, prepend a single quote
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str}`;
  }

  return str;
}

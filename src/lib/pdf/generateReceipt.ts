import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Type definitions for jspdf-autotable to avoid TS errors
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

export interface ReceiptData {
  invoiceNo: string;
  date: string;
  studentName: string;
  phone: string;
  email: string;
  courseName: string;
  feeAmount: number;
  paymentMode: string;
  transactionId: string;
}

export async function generateReceiptPDF(data: ReceiptData): Promise<Buffer> {
  // Create a new PDF document (A4, portrait)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Basic styling configurations
  const primaryColor = [128, 0, 0]; // Maroon
  const lightBgColor = [240, 240, 240];

  // Header Title
  doc.setFontSize(24);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.text("JOHANNA BRIGHT MENTORS", 20, 25);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text("Skill Development | Career Readiness | Professional Training", 20, 32);

  // Line break
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 37, 190, 37);

  // Invoice Title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("PAYMENT INVOICE / RECEIPT", 20, 50);

  // Invoice Meta
  doc.setFontSize(10);
  doc.text(`Invoice No.: ${data.invoiceNo}`, 140, 47);
  doc.text(`Date: ${data.date}`, 140, 53);

  // AutoTable: Student Details
  doc.autoTable({
    startY: 65,
    margin: { left: 20, right: 20 },
    head: [[{ content: 'STUDENT DETAILS', colSpan: 2 }]],
    body: [
      ['Name', data.studentName],
      ['Phone Number', data.phone],
      ['Email ID', data.email],
    ],
    theme: 'plain',
    headStyles: { fillColor: primaryColor as [number, number, number], textColor: 255, fontStyle: 'bold' },
    bodyStyles: { textColor: 50 },
    columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' } },
    styles: { cellPadding: 3, fontSize: 10 },
  });

  // AutoTable: Course Details
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 8,
    margin: { left: 20, right: 20 },
    head: [[{ content: 'COURSE DETAILS', colSpan: 2 }]],
    body: [
      ['Course Name', data.courseName],
    ],
    theme: 'plain',
    headStyles: { fillColor: primaryColor as [number, number, number], textColor: 255, fontStyle: 'bold' },
    bodyStyles: { textColor: 50 },
    columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' } },
    styles: { cellPadding: 3, fontSize: 10 },
  });

  // AutoTable: Payment Details
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 8,
    margin: { left: 20, right: 20 },
    head: [[{ content: 'PAYMENT DETAILS', colSpan: 2 }]],
    body: [
      ['Total Course Fee', `INR ${data.feeAmount.toLocaleString()}`],
      ['Amount Paid', `INR ${data.feeAmount.toLocaleString()}`],
      ['Payment Mode', data.paymentMode],
      ['Transaction ID', data.transactionId],
      ['Payment Date', data.date],
    ],
    theme: 'plain',
    headStyles: { fillColor: primaryColor as [number, number, number], textColor: 255, fontStyle: 'bold' },
    bodyStyles: { textColor: 50 },
    columnStyles: { 0: { cellWidth: 50, fontStyle: 'bold' } },
    styles: { cellPadding: 3, fontSize: 10 },
  });

  // Footer success message
  const finalY = doc.lastAutoTable.finalY + 20;
  doc.setFillColor(245, 245, 245);
  doc.rect(20, finalY, 170, 25, 'F');
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Payment Received Successfully!", 25, finalY + 10);
  
  doc.setTextColor(50, 50, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Thank you for choosing Johanna Bright Mentors. We are excited to have you with us!", 25, finalY + 18);

  // Return the PDF document as a Buffer (suitable for Supabase upload and Resend attachment)
  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}

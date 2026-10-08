import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

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
  totalCourseFee: number;
  couponCode: string;
  scholarshipDiscount: string;
  discountApplied: number;
  finalAmount: number;
  amountPaid: number;
  paymentMode: string;
  transactionId: string;
  paymentDate: string;
}

export async function generateReceiptPDF(data: ReceiptData): Promise<Buffer> {
  const templatePath = path.join(process.cwd(), 'public', 'invoice_template.pdf');

  // 1. Try filling official template PDF if present
  if (fs.existsSync(templatePath)) {
    try {
      const templateBytes = fs.readFileSync(templatePath);
      const pdfDoc = await PDFDocument.load(templateBytes);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const page = pdfDoc.getPages()[0];
      const { width, height } = page.getSize();

      const textColor = rgb(0.1, 0.1, 0.1);
      const maroonColor = rgb(0.5, 0, 0.125);

      // Coordinates mapped relative to 768 x 1152 point canvas
      const scaleX = width / 768;
      const scaleY = height / 1152;
      const sx = (x: number) => x * scaleX;
      const sy = (y: number) => height - (y * scaleY);

      // Invoice Meta (Top Right Box)
      // "Invoice No. :" colon is at x ~ 710, "Date :" colon is at x ~ 710.
      // Text starts right after colon at x = 725.
      page.drawText(data.invoiceNo, {
        x: sx(725),
        y: sy(216),
        size: 11,
        font: fontBold,
        color: maroonColor,
      });

      page.drawText(data.date, {
        x: sx(725),
        y: sy(240),
        size: 11,
        font: fontBold,
        color: textColor,
      });

      // Student Details Section
      // Colons for Name, Phone, Email are at x ~ 260. Text starts right after colon at x = 280.
      page.drawText(data.studentName, {
        x: sx(280),
        y: sy(318),
        size: 11,
        font: fontBold,
        color: textColor,
      });

      page.drawText(data.phone, {
        x: sx(280),
        y: sy(358),
        size: 11,
        font: fontBold,
        color: textColor,
      });

      page.drawText(data.email, {
        x: sx(280),
        y: sy(398),
        size: 11,
        font: fontBold,
        color: textColor,
      });

      // Course Details Section
      // Colon for Course Name is at x ~ 260. Text starts at x = 280.
      page.drawText(data.courseName, {
        x: sx(280),
        y: sy(485),
        size: 11,
        font: fontBold,
        color: textColor,
      });

      // Payment Details Section
      // Colons for Payment Details labels are at x ~ 285.
      // Values start right after colon at x = 300.
      // Explicit Y coordinates per row for perfect background box alignment:
      const payX = sx(300);
      const payRowsY = [582, 608, 634, 660, 705, 736, 764, 792, 820];

      // 1. Total Course Fee
      page.drawText(`INR ${data.totalCourseFee.toLocaleString()}`, {
        x: payX, y: sy(payRowsY[0]), size: 11, font: fontBold, color: textColor,
      });

      // 2. Coupon Code
      page.drawText(data.couponCode || "-", {
        x: payX, y: sy(payRowsY[1]), size: 11, font: fontBold, color: textColor,
      });

      // 3. Scholarship / Discount
      page.drawText(data.scholarshipDiscount, {
        x: payX, y: sy(payRowsY[2]), size: 11, font: fontBold, color: maroonColor,
      });

      // 4. Discount Applied
      page.drawText(`INR ${data.discountApplied.toLocaleString()}`, {
        x: payX, y: sy(payRowsY[3]), size: 11, font: fontBold, color: textColor,
      });

      // 5. Final Amount (Red text inside Pink Highlighted Band)
      page.drawText(`INR ${data.finalAmount.toLocaleString()}`, {
        x: payX, y: sy(payRowsY[4]), size: 12, font: fontBold, color: maroonColor,
      });

      // 6. Amount Paid
      page.drawText(`INR ${data.amountPaid.toLocaleString()}`, {
        x: payX, y: sy(payRowsY[5]), size: 11, font: fontBold, color: textColor,
      });

      // 7. Payment Mode
      page.drawText(data.paymentMode, {
        x: payX, y: sy(payRowsY[6]), size: 11, font: fontBold, color: textColor,
      });

      // 8. Transaction ID
      page.drawText(data.transactionId, {
        x: payX, y: sy(payRowsY[7]), size: 11, font: fontBold, color: textColor,
      });

      // 9. Payment Date
      page.drawText(data.paymentDate, {
        x: payX, y: sy(payRowsY[8]), size: 11, font: fontBold, color: textColor,
      });

      const pdfBytes = await pdfDoc.save();
      return Buffer.from(pdfBytes);
    } catch (err) {
      console.error("Error overlaying text onto invoice_template.pdf:", err);
    }
  }

  // 2. Clean fallback generation using jsPDF if template file is missing/unreadable
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [128, 0, 0];

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
      ['Total Course Fee', `INR ${data.totalCourseFee.toLocaleString()}`],
      ['Coupon Code', data.couponCode || "None"],
      ['Scholarship / Discount', data.scholarshipDiscount],
      ['Discount Applied', `INR ${data.discountApplied.toLocaleString()}`],
      ['Final Amount', `INR ${data.finalAmount.toLocaleString()}`],
      ['Amount Paid', `INR ${data.amountPaid.toLocaleString()}`],
      ['Payment Mode', data.paymentMode],
      ['Transaction ID', data.transactionId],
      ['Payment Date', data.paymentDate],
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

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}

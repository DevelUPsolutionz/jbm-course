import { NextRequest, NextResponse } from "next/server";
import { generateReceiptPDF } from "@/lib/pdf/generateReceipt";

export async function GET(req: NextRequest) {
  try {
    const paymentDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata"
    });

    const pdfBuffer = await generateReceiptPDF({
      invoiceNo: "JBM-2026-TEST",
      date: paymentDate,
      studentName: "John Doe",
      phone: "+91 98765 43210",
      email: "john.doe@example.com",
      courseName: "JBM Professional English & Communication Program",
      totalCourseFee: 23000,
      couponCode: "JBM25XXXy",
      scholarshipDiscount: "50% Scholarship",
      discountApplied: 11500,
      finalAmount: 11500,
      amountPaid: 11500,
      paymentMode: "UPI",
      transactionId: "UTR1234567890",
      paymentDate: paymentDate
    });

    return new NextResponse(pdfBuffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="test_invoice.pdf"',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

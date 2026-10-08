import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  PDFDocument,
  rgb,
  StandardFonts,
} from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// ============================================================
// Type definitions for jspdf-autotable
// ============================================================

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

// ============================================================
// Receipt Data
// ============================================================

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

// ============================================================
// Template configuration
// ============================================================

const TEMPLATE_WIDTH = 768;
const TEMPLATE_HEIGHT = 1152;

// ============================================================
// Coordinates
//
// IMPORTANT:
// These coordinates use TOP-LEFT visual positioning.
//
// X → left to right
// Y → top to bottom
//
// pdf-lib internally uses:
// X → left to right
// Y → bottom to top
//
// The helper `pdfY()` converts visual Y to PDF Y.
// ============================================================

const POSITIONS = {

  // ----------------------------------------------------------
  // Invoice top-right information (common X = 636)
  // ----------------------------------------------------------

  invoiceNo: {
    x: 636,
    y: 216,
  },

  date: {
    x: 636,
    y: 242,
  },


  // ----------------------------------------------------------
  // Student Details (all common X = 260)
  // ----------------------------------------------------------

  studentName: {
    x: 260,
    y: 331,
  },

  phone: {
    x: 260,
    y: 364,
  },

  email: {
    x: 260,
    y: 400,
  },


  // ----------------------------------------------------------
  // Course Details (common X = 260)
  // ----------------------------------------------------------

  courseName: {
    x: 260,
    y: 495,
  },


  // ----------------------------------------------------------
  // Payment Details (all common X = 285)
  // ----------------------------------------------------------

  totalCourseFee: {
    x: 285,
    y: 585,
  },

  couponCode: {
    x: 285,
    y: 612,
  },

  scholarshipDiscount: {
    x: 285,
    y: 641,
  },

  discountApplied: {
    x: 285,
    y: 670,
  },

  finalAmount: {
    x: 285,
    y: 702,
  },

  amountPaid: {
    x: 285,
    y: 734,
  },

  paymentMode: {
    x: 285,
    y: 764,
  },

  transactionId: {
    x: 285,
    y: 795,
  },

  paymentDate: {
    x: 285,
    y: 827,
  },
};

// ============================================================
// Utility: Convert top-left Y coordinate to PDF Y coordinate
// ============================================================

function pdfY(
  visualY: number,
  pageHeight: number = TEMPLATE_HEIGHT
): number {
  return pageHeight - visualY;
}

// ============================================================
// Utility: Format Indian currency
// ============================================================

function formatCurrency(value: number): string {
  return `INR ${value.toLocaleString('en-IN')}`;
}

// ============================================================
// Utility: Draw text with optional maximum width
// ============================================================

function drawFittedText(
  page: any,
  text: string,
  options: {
    x: number;
    y: number;
    size: number;
    font: any;
    color: any;
    maxWidth?: number;
    minSize?: number;
  }
) {
  if (!text) {
    return;
  }

  let fontSize = options.size;

  const minSize = options.minSize ?? 7;

  if (options.maxWidth) {
    while (
      fontSize > minSize &&
      options.font.widthOfTextAtSize(
        text,
        fontSize
      ) > options.maxWidth
    ) {
      fontSize -= 0.25;
    }
  }

  page.drawText(text, {
    x: options.x,
    y: options.y,
    size: fontSize,
    font: options.font,
    color: options.color,
  });
}

// ============================================================
// MAIN FUNCTION
// ============================================================

export async function generateReceiptPDF(
  data: ReceiptData
): Promise<Buffer> {

  // ==========================================================
  // Template path
  // ==========================================================

  const templatePath = path.join(
    process.cwd(),
    'public',
    'invoice_template.pdf'
  );

  // ==========================================================
  // Check template
  // ==========================================================

  if (!fs.existsSync(templatePath)) {
    console.warn(
      'invoice_template.pdf not found. Using fallback invoice.'
    );

    return generateFallbackInvoice(data);
  }

  // ==========================================================
  // Read original template
  // ==========================================================

  const templateBytes =
    fs.readFileSync(templatePath);

  // ==========================================================
  // Load original template
  // ==========================================================

  const templateDoc =
    await PDFDocument.load(templateBytes);

  const templatePages =
    templateDoc.getPages();

  if (!templatePages.length) {
    throw new Error(
      'Invoice template does not contain any pages.'
    );
  }

  const templatePage =
    templatePages[0];

  const {
    width,
    height,
  } = templatePage.getSize();

  console.log(
    'Invoice template PDF size:',
    {
      width,
      height,
    }
  );

  // ==========================================================
  // Safety check
  // ==========================================================

  if (
    Math.abs(width - TEMPLATE_WIDTH) > 2 ||
    Math.abs(height - TEMPLATE_HEIGHT) > 2
  ) {
    console.warn(
      `Template size is ${width}x${height}, expected ` +
      `${TEMPLATE_WIDTH}x${TEMPLATE_HEIGHT}.`
    );
  }

  // ==========================================================
  // Create a SEPARATE transparent overlay document
  //
  // This is the important fix.
  //
  // We do NOT draw dynamic text directly on the template.
  // ==========================================================

  const overlayDoc =
    await PDFDocument.create();

  const overlayPage =
    overlayDoc.addPage([
      width,
      height,
    ]);

  // ==========================================================
  // Embed fonts into overlay
  // ==========================================================

  const fontRegular =
    await overlayDoc.embedFont(
      StandardFonts.Helvetica
    );

  const fontBold =
    await overlayDoc.embedFont(
      StandardFonts.HelveticaBold
    );

  // ==========================================================
  // Colors
  // ==========================================================

  const textColor = rgb(
    0.10,
    0.10,
    0.10
  );

  const maroonColor = rgb(
    0.50,
    0.00,
    0.125
  );

  // ==========================================================
  // Helper for this overlay page
  // ==========================================================

  const drawText = ({
    value,
    x,
    y,
    size = 11,
    font = fontBold,
    color = textColor,
    maxWidth,
    minSize = 7,
  }: {
    value: string;
    x: number;
    y: number;
    size?: number;
    font?: any;
    color?: any;
    maxWidth?: number;
    minSize?: number;
  }) => {

    if (
      value === undefined ||
      value === null ||
      value === ''
    ) {
      return;
    }

    drawFittedText(
      overlayPage,
      String(value),
      {
        x,
        y: pdfY(y, height),
        size,
        font,
        color,
        maxWidth,
        minSize,
      }
    );
  };

  // ==========================================================
  // 1. INVOICE NUMBER
  // ==========================================================

  drawText({
    value: data.invoiceNo,
    x: POSITIONS.invoiceNo.x,
    y: POSITIONS.invoiceNo.y,
    size: 10,
    font: fontBold,
    color: maroonColor,
    maxWidth: 110,
  });

  // ==========================================================
  // 2. INVOICE DATE
  // ==========================================================

  drawText({
    value: data.date,
    x: POSITIONS.date.x,
    y: POSITIONS.date.y,
    size: 10,
    font: fontBold,
    color: textColor,
    maxWidth: 110,
  });

  // ==========================================================
  // 3. STUDENT NAME
  // ==========================================================

  drawText({
    value: data.studentName,
    x: POSITIONS.studentName.x,
    y: POSITIONS.studentName.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 400,
  });

  // ==========================================================
  // 4. PHONE
  // ==========================================================

  drawText({
    value: data.phone,
    x: POSITIONS.phone.x,
    y: POSITIONS.phone.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 400,
  });

  // ==========================================================
  // 5. EMAIL
  // ==========================================================

  drawText({
    value: data.email,
    x: POSITIONS.email.x,
    y: POSITIONS.email.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 400,
    minSize: 8,
  });

  // ==========================================================
  // 6. COURSE NAME
  // ==========================================================

  drawText({
    value: data.courseName,
    x: POSITIONS.courseName.x,
    y: POSITIONS.courseName.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 400,
    minSize: 8,
  });

  // ==========================================================
  // 7. TOTAL COURSE FEE
  // ==========================================================

  drawText({
    value: formatCurrency(
      data.totalCourseFee
    ),
    x: POSITIONS.totalCourseFee.x,
    y: POSITIONS.totalCourseFee.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 350,
  });

  // ==========================================================
  // 8. COUPON CODE
  // ==========================================================

  drawText({
    value:
      data.couponCode ||
      '-',
    x: POSITIONS.couponCode.x,
    y: POSITIONS.couponCode.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 350,
  });

  // ==========================================================
  // 9. SCHOLARSHIP / DISCOUNT
  // ==========================================================

  drawText({
    value:
      data.scholarshipDiscount ||
      '-',
    x: POSITIONS.scholarshipDiscount.x,
    y: POSITIONS.scholarshipDiscount.y,
    size: 11,
    font: fontBold,
    color: maroonColor,
    maxWidth: 350,
  });

  // ==========================================================
  // 10. DISCOUNT APPLIED
  // ==========================================================

  drawText({
    value: formatCurrency(
      data.discountApplied
    ),
    x: POSITIONS.discountApplied.x,
    y: POSITIONS.discountApplied.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 350,
  });

  // ==========================================================
  // 11. FINAL AMOUNT
  // ==========================================================

  drawText({
    value: formatCurrency(
      data.finalAmount
    ),
    x: POSITIONS.finalAmount.x,
    y: POSITIONS.finalAmount.y,
    size: 12,
    font: fontBold,
    color: maroonColor,
    maxWidth: 350,
  });

  // ==========================================================
  // 12. AMOUNT PAID
  // ==========================================================

  drawText({
    value: formatCurrency(
      data.amountPaid
    ),
    x: POSITIONS.amountPaid.x,
    y: POSITIONS.amountPaid.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 350,
  });

  // ==========================================================
  // 13. PAYMENT MODE
  // ==========================================================

  drawText({
    value:
      data.paymentMode ||
      '-',
    x: POSITIONS.paymentMode.x,
    y: POSITIONS.paymentMode.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 350,
  });

  // ==========================================================
  // 14. TRANSACTION ID
  // ==========================================================

  drawText({
    value:
      data.transactionId ||
      '-',
    x: POSITIONS.transactionId.x,
    y: POSITIONS.transactionId.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 350,
    minSize: 8,
  });

  // ==========================================================
  // 15. PAYMENT DATE
  // ==========================================================

  drawText({
    value:
      data.paymentDate ||
      '-',
    x: POSITIONS.paymentDate.x,
    y: POSITIONS.paymentDate.y,
    size: 11,
    font: fontBold,
    color: textColor,
    maxWidth: 350,
  });

  // ==========================================================
  // Save overlay
  // ==========================================================

  const overlayBytes =
    await overlayDoc.save();

  // ==========================================================
  // Embed overlay page into original template
  // ==========================================================

  const [
    embeddedOverlay,
  ] = await templateDoc.embedPdf(
    overlayBytes
  );

  // ==========================================================
  // Draw overlay on top of original template
  //
  // IMPORTANT:
  // The original template is never modified.
  // The dynamic text exists on a separate page layer.
  // ==========================================================

  templatePage.drawPage(
    embeddedOverlay,
    {
      x: 0,
      y: 0,
      width,
      height,
    }
  );

  // ==========================================================
  // Save final PDF
  // ==========================================================

  const finalBytes =
    await templateDoc.save();

  return Buffer.from(finalBytes);
}


// ============================================================
// FALLBACK INVOICE
//
// This is only used if invoice_template.pdf is missing.
// ============================================================

async function generateFallbackInvoice(
  data: ReceiptData
): Promise<Buffer> {

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [128, 0, 0];

  // ==========================================================
  // Header
  // ==========================================================

  doc.setFontSize(24);

  doc.setTextColor(
    primaryColor[0],
    primaryColor[1],
    primaryColor[2]
  );

  doc.setFont(
    'helvetica',
    'bold'
  );

  doc.text(
    'JOHANNA BRIGHT MENTORS',
    20,
    25
  );

  // ==========================================================
  // Subtitle
  // ==========================================================

  doc.setFontSize(10);

  doc.setTextColor(
    100,
    100,
    100
  );

  doc.setFont(
    'helvetica',
    'normal'
  );

  doc.text(
    'Skill Development | Career Readiness | Professional Training',
    20,
    32
  );

  // ==========================================================
  // Header line
  // ==========================================================

  doc.setDrawColor(
    primaryColor[0],
    primaryColor[1],
    primaryColor[2]
  );

  doc.setLineWidth(0.5);

  doc.line(
    20,
    37,
    190,
    37
  );

  // ==========================================================
  // Invoice title
  // ==========================================================

  doc.setFontSize(20);

  doc.setTextColor(
    0,
    0,
    0
  );

  doc.setFont(
    'helvetica',
    'bold'
  );

  doc.text(
    'PAYMENT INVOICE / RECEIPT',
    20,
    50
  );

  // ==========================================================
  // Invoice meta
  // ==========================================================

  doc.setFontSize(10);

  doc.text(
    `Invoice No.: ${data.invoiceNo}`,
    140,
    47
  );

  doc.text(
    `Date: ${data.date}`,
    140,
    53
  );

  // ==========================================================
  // Student Details
  // ==========================================================

  doc.autoTable({
    startY: 65,

    margin: {
      left: 20,
      right: 20,
    },

    head: [
      [
        {
          content: 'STUDENT DETAILS',
          colSpan: 2,
        },
      ],
    ],

    body: [
      [
        'Name',
        data.studentName,
      ],
      [
        'Phone Number',
        data.phone,
      ],
      [
        'Email ID',
        data.email,
      ],
    ],

    theme: 'plain',

    headStyles: {
      fillColor:
        primaryColor as [
          number,
          number,
          number
        ],

      textColor: 255,

      fontStyle: 'bold',
    },

    bodyStyles: {
      textColor: 50,
    },

    columnStyles: {
      0: {
        cellWidth: 50,
        fontStyle: 'bold',
      },
    },

    styles: {
      cellPadding: 3,
      fontSize: 10,
    },
  });

  // ==========================================================
  // Course Details
  // ==========================================================

  doc.autoTable({
    startY:
      doc.lastAutoTable.finalY + 8,

    margin: {
      left: 20,
      right: 20,
    },

    head: [
      [
        {
          content: 'COURSE DETAILS',
          colSpan: 2,
        },
      ],
    ],

    body: [
      [
        'Course Name',
        data.courseName,
      ],
    ],

    theme: 'plain',

    headStyles: {
      fillColor:
        primaryColor as [
          number,
          number,
          number
        ],

      textColor: 255,

      fontStyle: 'bold',
    },

    bodyStyles: {
      textColor: 50,
    },

    columnStyles: {
      0: {
        cellWidth: 50,
        fontStyle: 'bold',
      },
    },

    styles: {
      cellPadding: 3,
      fontSize: 10,
    },
  });

  // ==========================================================
  // Payment Details
  // ==========================================================

  doc.autoTable({
    startY:
      doc.lastAutoTable.finalY + 8,

    margin: {
      left: 20,
      right: 20,
    },

    head: [
      [
        {
          content: 'PAYMENT DETAILS',
          colSpan: 2,
        },
      ],
    ],

    body: [
      [
        'Total Course Fee',
        formatCurrency(
          data.totalCourseFee
        ),
      ],

      [
        'Coupon Code',
        data.couponCode || 'None',
      ],

      [
        'Scholarship / Discount',
        data.scholarshipDiscount,
      ],

      [
        'Discount Applied',
        formatCurrency(
          data.discountApplied
        ),
      ],

      [
        'Final Amount',
        formatCurrency(
          data.finalAmount
        ),
      ],

      [
        'Amount Paid',
        formatCurrency(
          data.amountPaid
        ),
      ],

      [
        'Payment Mode',
        data.paymentMode,
      ],

      [
        'Transaction ID',
        data.transactionId,
      ],

      [
        'Payment Date',
        data.paymentDate,
      ],
    ],

    theme: 'plain',

    headStyles: {
      fillColor:
        primaryColor as [
          number,
          number,
          number
        ],

      textColor: 255,

      fontStyle: 'bold',
    },

    bodyStyles: {
      textColor: 50,
    },

    columnStyles: {
      0: {
        cellWidth: 50,
        fontStyle: 'bold',
      },
    },

    styles: {
      cellPadding: 3,
      fontSize: 10,
    },
  });

  // ==========================================================
  // Footer success message
  // ==========================================================

  const finalY =
    doc.lastAutoTable.finalY + 20;

  doc.setFillColor(
    245,
    245,
    245
  );

  doc.rect(
    20,
    finalY,
    170,
    25,
    'F'
  );

  doc.setTextColor(
    primaryColor[0],
    primaryColor[1],
    primaryColor[2]
  );

  doc.setFont(
    'helvetica',
    'bold'
  );

  doc.setFontSize(14);

  doc.text(
    'Payment Received Successfully!',
    25,
    finalY + 10
  );

  doc.setTextColor(
    50,
    50,
    50
  );

  doc.setFont(
    'helvetica',
    'normal'
  );

  doc.setFontSize(10);

  doc.text(
    'Thank you for choosing Johanna Bright Mentors. We are excited to have you with us!',
    25,
    finalY + 18
  );

  // ==========================================================
  // Return Buffer
  // ==========================================================

  const arrayBuffer =
    doc.output('arraybuffer');

  return Buffer.from(
    arrayBuffer
  );
}

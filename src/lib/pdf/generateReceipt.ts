import {
  PDFDocument,
  rgb,
  StandardFonts,
} from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// ============================================================
// Receipt Data Interface (Preserved 100% for full compatibility)
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
// Utility: Format Currency in standard Indian numbering
// ============================================================

function formatCurrency(value: number): string {
  if (value === undefined || value === null || isNaN(value)) {
    return 'INR 0';
  }
  return `INR ${Number(value).toLocaleString('en-IN')}`;
}

// ============================================================
// Utility: Draw text fitted within a maximum width
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
  if (!text) return;

  let fontSize = options.size;
  const minSize = options.minSize ?? 7;

  if (options.maxWidth) {
    while (
      fontSize > minSize &&
      options.font.widthOfTextAtSize(text, fontSize) > options.maxWidth
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
// MAIN FUNCTION: Generate Vector PDF based on Excel Template
// ============================================================

export async function generateReceiptPDF(
  data: ReceiptData
): Promise<Buffer> {
  const doc = await PDFDocument.create();

  // Standard A4 dimensions: 595.28 x 841.89 points
  const page = doc.addPage([595.28, 841.89]);
  const { height: pageHeight } = page.getSize();

  // 1. Embed Vector Fonts (True vector glyphs = 100% sharp at any zoom level)
  const fontHelvetica = await doc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontTimesRomanBold = await doc.embedFont(StandardFonts.TimesRomanBold);

  // 2. Load High-Resolution Template Assets (Logo & Seal)
  let logoImg = null;
  let sealImg = null;

  try {
    const logoPath = path.join(process.cwd(), 'public', 'images', 'excel_template', 'logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);
      logoImg = await doc.embedPng(logoBytes);
    } else {
      const altLogoPath = path.join(process.cwd(), 'public', 'images', 'jbm-logo.png');
      if (fs.existsSync(altLogoPath)) {
        const logoBytes = fs.readFileSync(altLogoPath);
        logoImg = await doc.embedPng(logoBytes);
      }
    }
  } catch (err) {
    console.warn('Logo loading notice in invoice generator:', err);
  }

  try {
    const sealPath = path.join(process.cwd(), 'public', 'images', 'excel_template', 'seal.png');
    if (fs.existsSync(sealPath)) {
      const sealBytes = fs.readFileSync(sealPath);
      sealImg = await doc.embedPng(sealBytes);
    }
  } catch (err) {
    console.warn('Seal loading notice in invoice generator:', err);
  }

  // 3. Exact Color Palette Derived from the Excel Template
  const maroon = rgb(0.663, 0.0, 0.0);        // Primary Maroon Header (#A90000)
  const accentRed = rgb(0.753, 0.0, 0.0);     // Accent Slogan Red (#C00000)
  const roseFill = rgb(0.988, 0.894, 0.894);  // Highlight Pink (#FFFCE4E4)
  const lightGrey = rgb(0.953, 0.957, 0.965); // Disclaimer Background (#F3F4F6)
  const tableBorder = rgb(0.82, 0.835, 0.855);// Crisp Thin Table Borders
  const labelBg = rgb(0.98, 0.984, 0.99);     // Soft Label Cell Fill
  const textDark = rgb(0.12, 0.12, 0.12);     // Near Black
  const textMuted = rgb(0.35, 0.35, 0.35);    // Muted Subtitle Grey
  const white = rgb(1, 1, 1);

  // Layout Boundaries (A4 Centered with 36pt Margins)
  const leftMargin = 36;
  const contentWidth = 523;
  const toPdfY = (topY: number, h: number = 0) => pageHeight - topY - h;

  // ------------------------------------------------------------
  // SECTION 1: HEADER (Rows 1–4 of Excel)
  // ------------------------------------------------------------

  // JBM Logo on the top left
  if (logoImg) {
    page.drawImage(logoImg, {
      x: leftMargin,
      y: toPdfY(32, 57),
      width: 56,
      height: 57,
    });
  }

  // Brand Name, Slogan & Tagline in the center
  const centerTitleX = leftMargin + 245;
  const titleText = 'JOHANNA BRIGHT MENTORS';
  const titleWidth = fontTimesRomanBold.widthOfTextAtSize(titleText, 19);
  page.drawText(titleText, {
    x: centerTitleX - (titleWidth / 2),
    y: toPdfY(48),
    size: 19,
    font: fontTimesRomanBold,
    color: textDark,
  });

  const sloganText = 'ALWAYS BEST LESSON';
  const sloganWidth = fontHelveticaBold.widthOfTextAtSize(sloganText, 8.5);
  page.drawText(sloganText, {
    x: centerTitleX - (sloganWidth / 2),
    y: toPdfY(62),
    size: 8.5,
    font: fontHelveticaBold,
    color: maroon,
  });

  const subText = 'Skill Development  |  Career Readiness  |  Professional Training';
  const subWidth = fontHelvetica.widthOfTextAtSize(subText, 8.5);
  page.drawText(subText, {
    x: centerTitleX - (subWidth / 2),
    y: toPdfY(76),
    size: 8.5,
    font: fontHelvetica,
    color: textMuted,
  });

  // Vertical Maroon Divider
  page.drawLine({
    start: { x: 442, y: toPdfY(32) },
    end: { x: 442, y: toPdfY(86) },
    thickness: 1.5,
    color: accentRed,
  });

  // Right Side Slogans (Learn, Grow, Build, Your Future)
  const rightSlogans = ['Learn', 'Grow', 'Build', 'Your Future'];
  rightSlogans.forEach((word, idx) => {
    page.drawText(word, {
      x: 452,
      y: toPdfY(42 + (idx * 13)),
      size: 9.5,
      font: fontHelveticaBold,
      color: accentRed,
    });
  });

  // Top Separator Divider Line
  page.drawLine({
    start: { x: leftMargin, y: toPdfY(93) },
    end: { x: leftMargin + contentWidth, y: toPdfY(93) },
    thickness: 0.8,
    color: tableBorder,
  });

  // ------------------------------------------------------------
  // SECTION 2: INVOICE META BAR (Rows 6–7 of Excel)
  // ------------------------------------------------------------
  const metaBoxY = 100;

  // Left Box: PAYMENT INVOICE
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(metaBoxY, 38),
    width: 280,
    height: 38,
    borderWidth: 0.8,
    borderColor: tableBorder,
    color: white,
  });
  const invBadgeText = 'PAYMENT INVOICE';
  const invBadgeW = fontTimesRomanBold.widthOfTextAtSize(invBadgeText, 15);
  page.drawText(invBadgeText, {
    x: leftMargin + (140 - (invBadgeW / 2)),
    y: toPdfY(metaBoxY + 24),
    size: 15,
    font: fontTimesRomanBold,
    color: maroon,
  });

  // Right Box: Invoice Number & Date
  const metaRightX = leftMargin + 288;
  const metaRightW = contentWidth - 288;
  const metaLabelW = 75;
  const metaValW = metaRightW - metaLabelW;

  // Row 1: Invoice No
  page.drawRectangle({
    x: metaRightX,
    y: toPdfY(metaBoxY, 19),
    width: metaLabelW,
    height: 19,
    color: roseFill,
    borderWidth: 0.8,
    borderColor: tableBorder,
  });
  page.drawText('Invoice No.', {
    x: metaRightX + 8,
    y: toPdfY(metaBoxY + 13),
    size: 8.5,
    font: fontHelveticaBold,
    color: textDark,
  });
  page.drawRectangle({
    x: metaRightX + metaLabelW,
    y: toPdfY(metaBoxY, 19),
    width: metaValW,
    height: 19,
    color: white,
    borderWidth: 0.8,
    borderColor: tableBorder,
  });
  drawFittedText(page, data.invoiceNo || 'JBM-2026-0001', {
    x: metaRightX + metaLabelW + 8,
    y: toPdfY(metaBoxY + 13),
    size: 9,
    font: fontHelveticaBold,
    color: maroon,
    maxWidth: metaValW - 14,
  });

  // Row 2: Date
  page.drawRectangle({
    x: metaRightX,
    y: toPdfY(metaBoxY + 19, 19),
    width: metaLabelW,
    height: 19,
    color: roseFill,
    borderWidth: 0.8,
    borderColor: tableBorder,
  });
  page.drawText('Date', {
    x: metaRightX + 8,
    y: toPdfY(metaBoxY + 19 + 13),
    size: 8.5,
    font: fontHelveticaBold,
    color: textDark,
  });
  page.drawRectangle({
    x: metaRightX + metaLabelW,
    y: toPdfY(metaBoxY + 19, 19),
    width: metaValW,
    height: 19,
    color: white,
    borderWidth: 0.8,
    borderColor: tableBorder,
  });
  drawFittedText(page, data.date || 'Today', {
    x: metaRightX + metaLabelW + 8,
    y: toPdfY(metaBoxY + 19 + 13),
    size: 8.5,
    font: fontHelveticaBold,
    color: textDark,
    maxWidth: metaValW - 14,
  });

  // ------------------------------------------------------------
  // HELPERS: Drawing Section Headers and Table Rows
  // ------------------------------------------------------------

  const drawSectionHeader = (topY: number, title: string, isCentered = false) => {
    page.drawRectangle({
      x: leftMargin,
      y: toPdfY(topY, 18),
      width: contentWidth,
      height: 18,
      color: maroon,
      borderWidth: 0.8,
      borderColor: maroon,
    });
    const tw = fontHelveticaBold.widthOfTextAtSize(title, 9);
    const tx = isCentered ? (leftMargin + (contentWidth / 2) - (tw / 2)) : (leftMargin + 10);
    page.drawText(title, {
      x: tx,
      y: toPdfY(topY + 12.5),
      size: 9,
      font: fontHelveticaBold,
      color: white,
    });
  };

  const drawTableRow = (
    topY: number,
    label: string,
    val: string,
    options: {
      height?: number;
      fill?: any;
      labelFill?: any;
      labelFont?: any;
      valFont?: any;
      valColor?: any;
      valSize?: number;
      isCentered?: boolean;
    } = {}
  ) => {
    const rowH = options.height || 17.5;
    const labelW = 160;
    const valW = contentWidth - labelW;
    const bg = options.fill || white;
    const lBg = options.labelFill || labelBg;
    const valColor = options.valColor || textDark;
    const valFont = options.valFont || fontHelvetica;
    const valSize = options.valSize || 8.5;

    // Label Cell
    page.drawRectangle({
      x: leftMargin,
      y: toPdfY(topY, rowH),
      width: labelW,
      height: rowH,
      color: lBg,
      borderWidth: 0.6,
      borderColor: tableBorder,
    });
    const labelX = options.isCentered
      ? (leftMargin + (labelW / 2) - (fontHelvetica.widthOfTextAtSize(label, 8.5) / 2))
      : (leftMargin + 10);
    page.drawText(label, {
      x: labelX,
      y: toPdfY(topY + (rowH / 2) + 3),
      size: 8.5,
      font: options.labelFont || fontHelvetica,
      color: textDark,
    });

    // Value Cell
    page.drawRectangle({
      x: leftMargin + labelW,
      y: toPdfY(topY, rowH),
      width: valW,
      height: rowH,
      color: bg,
      borderWidth: 0.6,
      borderColor: tableBorder,
    });

    const displayVal = String(val || '-');
    if (options.isCentered) {
      const vWidth = valFont.widthOfTextAtSize(displayVal, valSize);
      page.drawText(displayVal, {
        x: leftMargin + labelW + (valW / 2) - (vWidth / 2),
        y: toPdfY(topY + (rowH / 2) + 3),
        size: valSize,
        font: valFont,
        color: valColor,
      });
    } else {
      drawFittedText(page, displayVal, {
        x: leftMargin + labelW + 10,
        y: toPdfY(topY + (rowH / 2) + 3),
        size: valSize,
        font: valFont,
        color: valColor,
        maxWidth: valW - 20,
      });
    }
  };

  // ------------------------------------------------------------
  // SECTION 3: STUDENT DETAILS (Rows 9–12 of Excel)
  // ------------------------------------------------------------
  drawSectionHeader(146, 'STUDENT DETAILS');
  drawTableRow(164, 'Name', data.studentName, { valFont: fontHelveticaBold });
  drawTableRow(181.5, 'Phone Number', data.phone);
  drawTableRow(199, 'Email ID', data.email);

  // ------------------------------------------------------------
  // SECTION 4: COURSE DETAILS (Rows 13–14 of Excel)
  // ------------------------------------------------------------
  drawSectionHeader(224, 'COURSE DETAILS', true);
  drawTableRow(242, 'Course Name', data.courseName, {
    valFont: fontHelveticaBold,
    valSize: 9.5,
    isCentered: true,
  });

  // ------------------------------------------------------------
  // SECTION 5: PAYMENT DETAILS (Rows 15–24 of Excel)
  // ------------------------------------------------------------
  drawSectionHeader(267, 'PAYMENT DETAILS');
  drawTableRow(285, 'Total Course Fee', formatCurrency(data.totalCourseFee));
  drawTableRow(302.5, 'Coupon Code', data.couponCode || 'N/A');
  drawTableRow(320, 'Scholarship / Discount', data.scholarshipDiscount || 'Standard Enrollment');
  drawTableRow(337.5, 'Discount Applied', formatCurrency(data.discountApplied));

  // Final Amount (Highlighted in Excel with Rose Fill #FFFCE4E4)
  drawTableRow(355, 'Final Amount', formatCurrency(data.finalAmount), {
    height: 19,
    fill: roseFill,
    labelFill: roseFill,
    labelFont: fontHelveticaBold,
    valFont: fontHelveticaBold,
    valColor: maroon,
    valSize: 9.5,
  });

  // Amount Paid (Highlighted in Excel with Rose Fill #FFFCE4E4)
  drawTableRow(374, 'Amount Paid', formatCurrency(data.amountPaid), {
    height: 19,
    fill: roseFill,
    labelFill: roseFill,
    labelFont: fontHelveticaBold,
    valFont: fontHelveticaBold,
    valColor: maroon,
    valSize: 10,
  });

  drawTableRow(393, 'Payment Mode', data.paymentMode || 'Online / UPI');
  drawTableRow(410.5, 'Transaction ID', data.transactionId || 'N/A');
  drawTableRow(428, 'Payment Date', data.paymentDate || data.date);

  // ------------------------------------------------------------
  // SECTION 6: SUCCESS BANNER (Row 26 of Excel)
  // ------------------------------------------------------------
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(453, 21),
    width: contentWidth,
    height: 21,
    color: roseFill,
    borderWidth: 0.8,
    borderColor: maroon,
  });

  const succMsg = 'PAYMENT RECEIVED SUCCESSFULLY!';
  const succW = fontHelveticaBold.widthOfTextAtSize(succMsg, 10);
  const checkX = leftMargin + (contentWidth / 2) - (succW / 2) - 14;
  const checkY = toPdfY(453 + 10.5);

  // Vector checkmark (Crisp, sharp, non-unicode safe)
  page.drawLine({
    start: { x: checkX - 4, y: checkY },
    end: { x: checkX - 1, y: checkY - 3.5 },
    thickness: 1.8,
    color: maroon,
  });
  page.drawLine({
    start: { x: checkX - 1, y: checkY - 3.5 },
    end: { x: checkX + 5, y: checkY + 4.5 },
    thickness: 1.8,
    color: maroon,
  });

  page.drawText(succMsg, {
    x: leftMargin + (contentWidth / 2) - (succW / 2) + 4,
    y: toPdfY(453 + 14.5),
    size: 10,
    font: fontHelveticaBold,
    color: maroon,
  });

  // ------------------------------------------------------------
  // SECTION 7: ACKNOWLEDGEMENT (Rows 27–28 of Excel)
  // ------------------------------------------------------------
  const ackText1 = 'Thank you for choosing Johanna Bright Mentors.';
  const ackText2 = 'We are excited to have you with us!';
  page.drawText(ackText1, {
    x: leftMargin + (contentWidth / 2) - (fontHelveticaBold.widthOfTextAtSize(ackText1, 9.5) / 2),
    y: toPdfY(480),
    size: 9.5,
    font: fontHelveticaBold,
    color: textDark,
  });
  page.drawText(ackText2, {
    x: leftMargin + (contentWidth / 2) - (fontHelvetica.widthOfTextAtSize(ackText2, 8.5) / 2),
    y: toPdfY(492),
    size: 8.5,
    font: fontHelvetica,
    color: textMuted,
  });

  // ------------------------------------------------------------
  // SECTION 8: OFFICIAL SEAL & STAMP (Rows 23–28 of Excel, Right side)
  // ------------------------------------------------------------
  if (sealImg) {
    page.drawImage(sealImg, {
      x: leftMargin + contentWidth - 95,
      y: toPdfY(460, 85),
      width: 82,
      height: 85,
    });
  }

  // ------------------------------------------------------------
  // SECTION 9: ELECTRONIC DISCLAIMER BOX (Rows 29–30 of Excel)
  // ------------------------------------------------------------
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(512, 25),
    width: contentWidth,
    height: 25,
    color: lightGrey,
    borderWidth: 0.6,
    borderColor: tableBorder,
  });
  const disc1 = 'This is an electronically generated invoice from Johanna Bright Mentors (JBM).';
  const disc2 = 'No signature is required.';
  page.drawText(disc1, {
    x: leftMargin + (contentWidth / 2) - (fontHelvetica.widthOfTextAtSize(disc1, 8) / 2),
    y: toPdfY(521),
    size: 8,
    font: fontHelvetica,
    color: textMuted,
  });
  page.drawText(disc2, {
    x: leftMargin + (contentWidth / 2) - (fontHelveticaBold.widthOfTextAtSize(disc2, 8) / 2),
    y: toPdfY(531),
    size: 8,
    font: fontHelveticaBold,
    color: textMuted,
  });

  // ------------------------------------------------------------
  // SECTION 10: BOTTOM FOOTER BAR (Row 31 of Excel)
  // ------------------------------------------------------------
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(544, 18),
    width: contentWidth,
    height: 18,
    color: maroon,
  });
  const footerText = 'hello.johannabrightmentors@gmail.com   |   +91 8778578437   |   Pudukkottai - Tamil Nadu, India';
  const footerW = fontHelveticaBold.widthOfTextAtSize(footerText, 7.8);
  page.drawText(footerText, {
    x: leftMargin + (contentWidth / 2) - (footerW / 2),
    y: toPdfY(544 + 12.5),
    size: 7.8,
    font: fontHelveticaBold,
    color: white,
  });

  // 4. Save and return PDF Buffer
  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}

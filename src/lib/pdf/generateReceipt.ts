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
// 1:1 Cell Layout & Exact Coordinate Mapping
// ============================================================

export async function generateReceiptPDF(
  data: ReceiptData
): Promise<Buffer> {
  const doc = await PDFDocument.create();

  // Standard A4 dimensions: 595.28 x 841.89 points
  const page = doc.addPage([595.28, 841.89]);
  const { height: pageHeight } = page.getSize();

  // 1. Embed Standard Fonts (100% vector sharp at any zoom level)
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

  // 3. Exact Color Palette Derived from the Excel XML Styles
  const maroon = rgb(0.663, 0.0, 0.0);         // #A90000 - Excel Header & Theme Fill
  const accentRed = rgb(0.753, 0.0, 0.0);      // #C00000 - Excel Accent Red & Lines
  const roseFill = rgb(0.988, 0.894, 0.894);   // #FFFCE4E4 - Excel Highlight Fill
  const grayDisclaimer = rgb(0.949, 0.949, 0.949); // #FFF2F2F2 - Excel Disclaimer Box Fill
  const tableBorder = rgb(0.81, 0.82, 0.84);  // Clean Table Border
  const thinRedBorder = rgb(0.85, 0.35, 0.35); // Soft border for highlight rows
  const labelBg = rgb(0.985, 0.988, 0.992);    // Very soft label tint
  const textDark = rgb(0.13, 0.13, 0.13);      // #222222 - Text
  const textMuted = rgb(0.38, 0.38, 0.38);     // Muted Subtitle Text
  const white = rgb(1, 1, 1);

  // Layout Dimensions (A4 Page: Width 595.28, Margin 34pt, Content Width 527pt)
  const leftMargin = 34;
  const contentWidth = 527;
  const toPdfY = (topY: number, h: number = 0) => pageHeight - topY - h;

  // ------------------------------------------------------------
  // SECTION 1: HEADER (Rows 1–4 of Excel)
  // ------------------------------------------------------------

  // JBM Logo on top left (Excel Picture 6: ~72x74pt)
  if (logoImg) {
    page.drawImage(logoImg, {
      x: leftMargin + 2,
      y: toPdfY(28, 66),
      width: 65,
      height: 66,
    });
  }

  // Brand Name, Slogan & Subtitle in Center
  const centerTitleX = leftMargin + 250;
  const titleText = 'JOHANNA BRIGHT MENTORS';
  const titleWidth = fontTimesRomanBold.widthOfTextAtSize(titleText, 20);
  page.drawText(titleText, {
    x: centerTitleX - (titleWidth / 2),
    y: toPdfY(46),
    size: 20,
    font: fontTimesRomanBold,
    color: textDark,
  });

  const sloganText = 'ALWAYS BEST LESSON';
  const sloganWidth = fontHelveticaBold.widthOfTextAtSize(sloganText, 9.5);
  page.drawText(sloganText, {
    x: centerTitleX - (sloganWidth / 2),
    y: toPdfY(61),
    size: 9.5,
    font: fontHelveticaBold,
    color: maroon,
  });

  const subText = 'Skill Development   |   Career Readiness   |   Professional Training';
  const subWidth = fontHelvetica.widthOfTextAtSize(subText, 8.8);
  page.drawText(subText, {
    x: centerTitleX - (subWidth / 2),
    y: toPdfY(76),
    size: 8.8,
    font: fontHelvetica,
    color: textMuted,
  });

  // Vertical Red Divider Line (Excel Shape 10: x=446, height=58pt)
  page.drawLine({
    start: { x: 446, y: toPdfY(30) },
    end: { x: 446, y: toPdfY(88) },
    thickness: 1.5,
    color: accentRed,
  });

  // Right Side Slogans (Learn, Grow, Build, Your Future)
  const rightSlogans = ['Learn', 'Grow', 'Build', 'Your Future'];
  rightSlogans.forEach((word, idx) => {
    page.drawText(word, {
      x: 456,
      y: toPdfY(41 + (idx * 13.5)),
      size: 9.5,
      font: fontHelveticaBold,
      color: accentRed,
    });
  });

  // Header bottom boundary line
  page.drawLine({
    start: { x: leftMargin, y: toPdfY(97) },
    end: { x: leftMargin + contentWidth, y: toPdfY(97) },
    thickness: 0.8,
    color: tableBorder,
  });

  // ------------------------------------------------------------
  // SECTION 2: INVOICE META BAR (Rows 6–7 of Excel)
  // ------------------------------------------------------------
  const metaBoxY = 106;
  const metaHeight = 42;

  // Left Box: PAYMENT INVOICE (Merged A6:D7)
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(metaBoxY, metaHeight),
    width: 290,
    height: metaHeight,
    borderWidth: 0.8,
    borderColor: tableBorder,
    color: white,
  });
  const invBadgeText = 'PAYMENT INVOICE';
  const invBadgeW = fontTimesRomanBold.widthOfTextAtSize(invBadgeText, 16);
  page.drawText(invBadgeText, {
    x: leftMargin + (145 - (invBadgeW / 2)),
    y: toPdfY(metaBoxY + 26),
    size: 16,
    font: fontTimesRomanBold,
    color: maroon,
  });

  // Right Box: Invoice Number & Date (E6:F7)
  const metaRightX = leftMargin + 298;
  const metaRightW = contentWidth - 298;
  const metaLabelW = 80;
  const metaValW = metaRightW - metaLabelW;
  const metaRowH = metaHeight / 2; // 21pt per row

  // Row 1: Invoice No.
  page.drawRectangle({
    x: metaRightX,
    y: toPdfY(metaBoxY, metaRowH),
    width: metaLabelW,
    height: metaRowH,
    color: roseFill,
    borderWidth: 0.8,
    borderColor: tableBorder,
  });
  page.drawText('Invoice No.', {
    x: metaRightX + 10,
    y: toPdfY(metaBoxY + 14.5),
    size: 9,
    font: fontHelveticaBold,
    color: textDark,
  });

  page.drawRectangle({
    x: metaRightX + metaLabelW,
    y: toPdfY(metaBoxY, metaRowH),
    width: metaValW,
    height: metaRowH,
    color: white,
    borderWidth: 0.8,
    borderColor: tableBorder,
  });
  drawFittedText(page, data.invoiceNo || 'JBM-2026-TEST', {
    x: metaRightX + metaLabelW + 10,
    y: toPdfY(metaBoxY + 14.5),
    size: 9.5,
    font: fontHelveticaBold,
    color: maroon,
    maxWidth: metaValW - 16,
  });

  // Row 2: Date
  page.drawRectangle({
    x: metaRightX,
    y: toPdfY(metaBoxY + metaRowH, metaRowH),
    width: metaLabelW,
    height: metaRowH,
    color: roseFill,
    borderWidth: 0.8,
    borderColor: tableBorder,
  });
  page.drawText('Date', {
    x: metaRightX + 10,
    y: toPdfY(metaBoxY + metaRowH + 14.5),
    size: 9,
    font: fontHelveticaBold,
    color: textDark,
  });

  page.drawRectangle({
    x: metaRightX + metaLabelW,
    y: toPdfY(metaBoxY + metaRowH, metaRowH),
    width: metaValW,
    height: metaRowH,
    color: white,
    borderWidth: 0.8,
    borderColor: tableBorder,
  });
  drawFittedText(page, data.date || 'Today', {
    x: metaRightX + metaLabelW + 10,
    y: toPdfY(metaBoxY + metaRowH + 14.5),
    size: 9,
    font: fontHelveticaBold,
    color: textDark,
    maxWidth: metaValW - 16,
  });

  // ------------------------------------------------------------
  // HELPERS: Drawing Section Headers and Table Rows (Excel matched)
  // ------------------------------------------------------------

  const drawSectionHeader = (topY: number, title: string, isCentered = false) => {
    const headerH = 20;
    page.drawRectangle({
      x: leftMargin,
      y: toPdfY(topY, headerH),
      width: contentWidth,
      height: headerH,
      color: maroon,
      borderWidth: 0.8,
      borderColor: maroon,
    });
    const tw = fontHelveticaBold.widthOfTextAtSize(title, 9.5);
    const tx = isCentered ? (leftMargin + (contentWidth / 2) - (tw / 2)) : (leftMargin + 12);
    page.drawText(title, {
      x: tx,
      y: toPdfY(topY + 14),
      size: 9.5,
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
      borderColor?: any;
      isCentered?: boolean;
    } = {}
  ) => {
    const rowH = options.height || 20;
    const labelW = 165;
    const valW = contentWidth - labelW;
    const bg = options.fill || white;
    const lBg = options.labelFill || labelBg;
    const valColor = options.valColor || textDark;
    const valFont = options.valFont || fontHelvetica;
    const valSize = options.valSize || 9;
    const bColor = options.borderColor || tableBorder;

    // Label Cell
    page.drawRectangle({
      x: leftMargin,
      y: toPdfY(topY, rowH),
      width: labelW,
      height: rowH,
      color: lBg,
      borderWidth: 0.6,
      borderColor: bColor,
    });
    const labelX = options.isCentered
      ? (leftMargin + (labelW / 2) - (fontHelvetica.widthOfTextAtSize(label, 9) / 2))
      : (leftMargin + 12);
    page.drawText(label, {
      x: labelX,
      y: toPdfY(topY + (rowH / 2) + 3.5),
      size: 9,
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
      borderColor: bColor,
    });

    const displayVal = String(val || '-');
    if (options.isCentered) {
      const vWidth = valFont.widthOfTextAtSize(displayVal, valSize);
      page.drawText(displayVal, {
        x: leftMargin + labelW + (valW / 2) - (vWidth / 2),
        y: toPdfY(topY + (rowH / 2) + 3.5),
        size: valSize,
        font: valFont,
        color: valColor,
      });
    } else {
      drawFittedText(page, displayVal, {
        x: leftMargin + labelW + 12,
        y: toPdfY(topY + (rowH / 2) + 3.5),
        size: valSize,
        font: valFont,
        color: valColor,
        maxWidth: valW - 24,
      });
    }
  };

  // ------------------------------------------------------------
  // SECTION 3: STUDENT DETAILS (Rows 9–12 of Excel)
  // ------------------------------------------------------------
  let currentY = 156;
  drawSectionHeader(currentY, 'STUDENT DETAILS');
  currentY += 20;

  drawTableRow(currentY, 'Name', data.studentName, { valFont: fontHelveticaBold });
  currentY += 20;
  drawTableRow(currentY, 'Phone Number', data.phone);
  currentY += 20;
  drawTableRow(currentY, 'Email ID', data.email);
  currentY += 20;

  // ------------------------------------------------------------
  // SECTION 4: COURSE DETAILS (Rows 13–14 of Excel)
  // ------------------------------------------------------------
  currentY += 8;
  drawSectionHeader(currentY, 'COURSE DETAILS', true);
  currentY += 20;

  drawTableRow(currentY, 'Course Name', data.courseName, {
    valFont: fontHelveticaBold,
    valSize: 9.5,
    isCentered: true,
  });
  currentY += 20;

  // ------------------------------------------------------------
  // SECTION 5: PAYMENT DETAILS (Rows 15–24 of Excel)
  // ------------------------------------------------------------
  currentY += 8;
  drawSectionHeader(currentY, 'PAYMENT DETAILS');
  currentY += 20;

  drawTableRow(currentY, 'Total Course Fee', formatCurrency(data.totalCourseFee));
  currentY += 20;
  drawTableRow(currentY, 'Coupon Code', data.couponCode || 'N/A');
  currentY += 20;
  drawTableRow(currentY, 'Scholarship / Discount', data.scholarshipDiscount || 'Standard Enrollment');
  currentY += 20;
  drawTableRow(currentY, 'Discount Applied', formatCurrency(data.discountApplied));
  currentY += 20;

  // Final Amount (Excel Row 20: Rose Fill #FFFCE4E4, Red Bold Text)
  drawTableRow(currentY, 'Final Amount', formatCurrency(data.finalAmount), {
    fill: roseFill,
    labelFill: roseFill,
    labelFont: fontHelveticaBold,
    valFont: fontHelveticaBold,
    valColor: maroon,
    valSize: 10,
    borderColor: thinRedBorder,
  });
  currentY += 20;

  // Amount Paid (Excel Row 21: Rose Fill #FFFCE4E4, Red Bold Text)
  drawTableRow(currentY, 'Amount Paid', formatCurrency(data.amountPaid), {
    fill: roseFill,
    labelFill: roseFill,
    labelFont: fontHelveticaBold,
    valFont: fontHelveticaBold,
    valColor: maroon,
    valSize: 10.5,
    borderColor: thinRedBorder,
  });
  currentY += 20;

  drawTableRow(currentY, 'Payment Mode', data.paymentMode || 'Online / UPI');
  currentY += 20;
  drawTableRow(currentY, 'Transaction ID', data.transactionId || 'N/A');
  currentY += 20;
  drawTableRow(currentY, 'Payment Date', data.paymentDate || data.date);
  currentY += 20;

  // ------------------------------------------------------------
  // SECTION 6: SUCCESS BANNER (Row 26 of Excel)
  // Excel: Soft solid Rose Fill (#FFFCE4E4), bold crimson red text
  // ------------------------------------------------------------
  currentY += 12;
  const bannerH = 24;
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(currentY, bannerH),
    width: contentWidth,
    height: bannerH,
    color: roseFill,
  });

  const succMsg = 'PAYMENT RECEIVED SUCCESSFULLY!';
  const succW = fontHelveticaBold.widthOfTextAtSize(succMsg, 11);
  const checkX = leftMargin + (contentWidth / 2) - (succW / 2) - 15;
  const checkY = toPdfY(currentY + 12);

  // Vector checkmark (Clean, sharp, vector geometry)
  page.drawLine({
    start: { x: checkX - 5, y: checkY },
    end: { x: checkX - 1, y: checkY - 4 },
    thickness: 2,
    color: maroon,
  });
  page.drawLine({
    start: { x: checkX - 1, y: checkY - 4 },
    end: { x: checkX + 6, y: checkY + 5.5 },
    thickness: 2,
    color: maroon,
  });

  page.drawText(succMsg, {
    x: leftMargin + (contentWidth / 2) - (succW / 2) + 5,
    y: toPdfY(currentY + 16.5),
    size: 11,
    font: fontHelveticaBold,
    color: maroon,
  });
  currentY += bannerH;

  // ------------------------------------------------------------
  // SECTION 7: ACKNOWLEDGEMENT & SEAL (Rows 27–28 of Excel)
  // ------------------------------------------------------------
  currentY += 10;
  const ackBoxY = currentY;

  const ackText1 = 'Thank you for choosing Johanna Bright Mentors.';
  const ackText2 = 'We are excited to have you with us!';

  // Center acknowledgment text (clean Aptos/Helvetica font)
  page.drawText(ackText1, {
    x: leftMargin + (contentWidth / 2) - (fontHelveticaBold.widthOfTextAtSize(ackText1, 10.5) / 2),
    y: toPdfY(ackBoxY + 14),
    size: 10.5,
    font: fontHelveticaBold,
    color: textDark,
  });
  page.drawText(ackText2, {
    x: leftMargin + (contentWidth / 2) - (fontHelvetica.widthOfTextAtSize(ackText2, 9.5) / 2),
    y: toPdfY(ackBoxY + 28),
    size: 9.5,
    font: fontHelvetica,
    color: textMuted,
  });

  // OFFICIAL SEAL (Excel Anchor: Col E-F, 88pt x 90pt, placed cleanly on right)
  // Positioned so it NEVER overlaps disclaimer or footer
  if (sealImg) {
    const sealSize = 78;
    page.drawImage(sealImg, {
      x: leftMargin + contentWidth - sealSize - 8,
      y: toPdfY(ackBoxY - 4, sealSize),
      width: sealSize,
      height: sealSize,
    });
  }

  currentY += 46;

  // ------------------------------------------------------------
  // SECTION 8: ELECTRONIC DISCLAIMER BOX (Rows 29–30 of Excel)
  // Excel: #FFF2F2F2 light grey background, centered text
  // ------------------------------------------------------------
  const discH = 26;
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(currentY, discH),
    width: contentWidth,
    height: discH,
    color: grayDisclaimer,
    borderWidth: 0.6,
    borderColor: tableBorder,
  });

  const disc1 = 'This is an electronically generated invoice from Johanna Bright Mentors (JBM).';
  const disc2 = 'No signature is required.';
  page.drawText(disc1, {
    x: leftMargin + (contentWidth / 2) - (fontHelvetica.widthOfTextAtSize(disc1, 8.5) / 2),
    y: toPdfY(currentY + 10.5),
    size: 8.5,
    font: fontHelvetica,
    color: textMuted,
  });
  page.drawText(disc2, {
    x: leftMargin + (contentWidth / 2) - (fontHelveticaBold.widthOfTextAtSize(disc2, 8.5) / 2),
    y: toPdfY(currentY + 20),
    size: 8.5,
    font: fontHelveticaBold,
    color: textMuted,
  });
  currentY += discH + 10;

  // ------------------------------------------------------------
  // SECTION 9: BOTTOM FOOTER BAR (Row 31 of Excel)
  // Excel: Solid Maroon #A90000 Bar, White Bold Contact Info
  // ------------------------------------------------------------
  const footerH = 20;
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(currentY, footerH),
    width: contentWidth,
    height: footerH,
    color: maroon,
  });
  const footerText = 'hello.johannabrightmentors@gmail.com   |   +91 8778578437   |   Pudukkottai - Tamil Nadu, India';
  const footerW = fontHelveticaBold.widthOfTextAtSize(footerText, 8.2);
  page.drawText(footerText, {
    x: leftMargin + (contentWidth / 2) - (footerW / 2),
    y: toPdfY(currentY + 14),
    size: 8.2,
    font: fontHelveticaBold,
    color: white,
  });

  // 4. Save and return PDF Buffer
  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}

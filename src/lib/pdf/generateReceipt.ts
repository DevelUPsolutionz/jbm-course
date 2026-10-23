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
// 100% 1:1 Pixel & Color Alignment with Excel XML
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

  // 2. Load High-Resolution Template Assets (Cropped Logo & Official Seal)
  let logoImg = null;
  let sealImg = null;

  try {
    const croppedLogoPath = path.join(process.cwd(), 'public', 'images', 'excel_template', 'logo_cropped.png');
    const standardLogoPath = path.join(process.cwd(), 'public', 'images', 'excel_template', 'logo.png');

    if (fs.existsSync(croppedLogoPath)) {
      const logoBytes = fs.readFileSync(croppedLogoPath);
      logoImg = await doc.embedPng(logoBytes);
    } else if (fs.existsSync(standardLogoPath)) {
      const logoBytes = fs.readFileSync(standardLogoPath);
      logoImg = await doc.embedPng(logoBytes);
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

  // 3. Exact Color Palette Extracted from Excel styles.xml
  const maroon = rgb(0.663, 0.0, 0.0);           // #A90000 - Excel Header Fill & Accent
  const redBorder = rgb(0.753, 0.0, 0.0);        // #C00000 - Excel Cell Borders & Lines
  const roseFill = rgb(0.988, 0.894, 0.894);     // #FFFCE4E4 - Excel Highlight Fill
  const grayDisclaimer = rgb(0.949, 0.949, 0.949); // #FFF2F2F2 - Excel Disclaimer Box Fill
  const textDark = rgb(0.13, 0.13, 0.13);        // #222222 - Dark Body Text
  const textMuted = rgb(0.38, 0.38, 0.38);       // #606060 - Subtitle & Disclaimer Text
  const white = rgb(1, 1, 1);

  // Layout Dimensions (A4 Page: Width 595.28, Margin 32pt, Content Width 531pt)
  const leftMargin = 32;
  const contentWidth = 531;
  const toPdfY = (topY: number, h: number = 0) => pageHeight - topY - h;

  // ------------------------------------------------------------
  // SECTION 1: HEADER (Rows 1–4 of Excel)
  // ------------------------------------------------------------

  // JBM Cropped Logo on top left (Emblem only, matching Excel Picture 6)
  if (logoImg) {
    page.drawImage(logoImg, {
      x: leftMargin + 6,
      y: toPdfY(26, 58),
      width: 68,
      height: 58,
    });
  }

  // Brand Name, Slogan & Subtitle in Center
  const centerTitleX = leftMargin + 252;
  const titleText = 'JOHANNA BRIGHT MENTORS';
  const titleWidth = fontTimesRomanBold.widthOfTextAtSize(titleText, 20);
  page.drawText(titleText, {
    x: centerTitleX - (titleWidth / 2),
    y: toPdfY(42),
    size: 20,
    font: fontTimesRomanBold,
    color: textDark,
  });

  const sloganText = 'ALWAYS BEST LESSON';
  const sloganWidth = fontHelveticaBold.widthOfTextAtSize(sloganText, 9.5);
  page.drawText(sloganText, {
    x: centerTitleX - (sloganWidth / 2),
    y: toPdfY(58),
    size: 9.5,
    font: fontHelveticaBold,
    color: maroon,
  });

  const subText = 'Skill Development   |   Career Readiness   |   Professional Training';
  const subWidth = fontHelvetica.widthOfTextAtSize(subText, 8.8);
  page.drawText(subText, {
    x: centerTitleX - (subWidth / 2),
    y: toPdfY(73),
    size: 8.8,
    font: fontHelvetica,
    color: textMuted,
  });

  // Vertical Red Divider Line (Excel Shape 10: #C00000)
  page.drawLine({
    start: { x: 446, y: toPdfY(26) },
    end: { x: 446, y: toPdfY(86) },
    thickness: 1.5,
    color: redBorder,
  });

  // Right Side Slogans (Learn, Grow, Build, Your Future)
  const rightSlogans = ['Learn', 'Grow', 'Build', 'Your Future'];
  rightSlogans.forEach((word, idx) => {
    page.drawText(word, {
      x: 456,
      y: toPdfY(38 + (idx * 13.5)),
      size: 9.5,
      font: fontHelveticaBold,
      color: redBorder,
    });
  });

  // Header bottom boundary line (#C00000)
  page.drawLine({
    start: { x: leftMargin, y: toPdfY(94) },
    end: { x: leftMargin + contentWidth, y: toPdfY(94) },
    thickness: 0.8,
    color: redBorder,
  });

  // ------------------------------------------------------------
  // SECTION 2: INVOICE META BAR (Rows 6–7 of Excel)
  // ------------------------------------------------------------
  const metaBoxY = 104;
  const metaHeight = 44;

  // Left Box: PAYMENT INVOICE (Merged A6:D7) with thin red border
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(metaBoxY, metaHeight),
    width: 295,
    height: metaHeight,
    borderWidth: 0.8,
    borderColor: redBorder,
    color: white,
  });
  const invBadgeText = 'PAYMENT INVOICE';
  const invBadgeW = fontTimesRomanBold.widthOfTextAtSize(invBadgeText, 16.5);
  page.drawText(invBadgeText, {
    x: leftMargin + (147.5 - (invBadgeW / 2)),
    y: toPdfY(metaBoxY + 27.5),
    size: 16.5,
    font: fontTimesRomanBold,
    color: maroon,
  });

  // Right Box: Invoice Number & Date (E6:F7) with thin red borders
  const metaRightX = leftMargin + 295;
  const metaRightW = contentWidth - 295;
  const metaLabelW = 85;
  const metaValW = metaRightW - metaLabelW;
  const metaRowH = metaHeight / 2; // 22pt per row

  // Row 1: Invoice No.
  page.drawRectangle({
    x: metaRightX,
    y: toPdfY(metaBoxY, metaRowH),
    width: metaLabelW,
    height: metaRowH,
    color: roseFill,
    borderWidth: 0.8,
    borderColor: redBorder,
  });
  page.drawText('Invoice No.', {
    x: metaRightX + 10,
    y: toPdfY(metaBoxY + 15),
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
    borderColor: redBorder,
  });
  drawFittedText(page, data.invoiceNo || 'JBM-2026-TEST', {
    x: metaRightX + metaLabelW + 10,
    y: toPdfY(metaBoxY + 15),
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
    borderColor: redBorder,
  });
  page.drawText('Date', {
    x: metaRightX + 10,
    y: toPdfY(metaBoxY + metaRowH + 15),
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
    borderColor: redBorder,
  });
  drawFittedText(page, data.date || 'Today', {
    x: metaRightX + metaLabelW + 10,
    y: toPdfY(metaBoxY + metaRowH + 15),
    size: 9,
    font: fontHelveticaBold,
    color: textDark,
    maxWidth: metaValW - 16,
  });

  // ------------------------------------------------------------
  // HELPERS: Drawing Section Headers and Table Rows (Excel matched)
  // ------------------------------------------------------------

  const drawSectionHeader = (topY: number, title: string, isCentered = false) => {
    const headerH = 21;
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
      y: toPdfY(topY + 14.5),
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
      isCentered?: boolean;
    } = {}
  ) => {
    const rowH = options.height || 21;
    const labelW = 165;
    const valW = contentWidth - labelW;
    const bg = options.fill || white;
    const lBg = options.labelFill || white;
    const valColor = options.valColor || textDark;
    const valFont = options.valFont || fontHelvetica;
    const valSize = options.valSize || 9;

    // Label Cell (Thin Red Border #C00000)
    page.drawRectangle({
      x: leftMargin,
      y: toPdfY(topY, rowH),
      width: labelW,
      height: rowH,
      color: lBg,
      borderWidth: 0.7,
      borderColor: redBorder,
    });
    const labelX = leftMargin + 12;
    page.drawText(label, {
      x: labelX,
      y: toPdfY(topY + (rowH / 2) + 3.5),
      size: 9,
      font: options.labelFont || fontHelvetica,
      color: textDark,
    });

    // Value Cell (Thin Red Border #C00000)
    page.drawRectangle({
      x: leftMargin + labelW,
      y: toPdfY(topY, rowH),
      width: valW,
      height: rowH,
      color: bg,
      borderWidth: 0.7,
      borderColor: redBorder,
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
  let currentY = 158;
  drawSectionHeader(currentY, 'STUDENT DETAILS');
  currentY += 21;

  drawTableRow(currentY, 'Name', data.studentName, { valFont: fontHelveticaBold });
  currentY += 21;
  drawTableRow(currentY, 'Phone Number', data.phone);
  currentY += 21;
  drawTableRow(currentY, 'Email ID', data.email);
  currentY += 21;

  // ------------------------------------------------------------
  // SECTION 4: COURSE DETAILS (Rows 13–14 of Excel)
  // ------------------------------------------------------------
  currentY += 9;
  drawSectionHeader(currentY, 'COURSE DETAILS', true);
  currentY += 21;

  drawTableRow(currentY, 'Course Name', data.courseName, {
    valFont: fontHelveticaBold,
    valSize: 9.5,
  });
  currentY += 21;

  // ------------------------------------------------------------
  // SECTION 5: PAYMENT DETAILS (Rows 15–24 of Excel)
  // ------------------------------------------------------------
  currentY += 9;
  drawSectionHeader(currentY, 'PAYMENT DETAILS');
  currentY += 21;

  drawTableRow(currentY, 'Total Course Fee', formatCurrency(data.totalCourseFee));
  currentY += 21;
  drawTableRow(currentY, 'Coupon Code', data.couponCode || 'N/A');
  currentY += 21;
  drawTableRow(currentY, 'Scholarship / Discount', data.scholarshipDiscount || 'Standard Enrollment');
  currentY += 21;
  drawTableRow(currentY, 'Discount Applied', formatCurrency(data.discountApplied));
  currentY += 21;

  // Final Amount (Excel Row 20: Rose Fill #FFFCE4E4, Red Bold Text)
  drawTableRow(currentY, 'Final Amount', formatCurrency(data.finalAmount), {
    fill: roseFill,
    labelFill: roseFill,
    labelFont: fontHelveticaBold,
    valFont: fontHelveticaBold,
    valColor: maroon,
    valSize: 10,
  });
  currentY += 21;

  // Amount Paid (Excel Row 21: Rose Fill #FFFCE4E4, Red Bold Text)
  drawTableRow(currentY, 'Amount Paid', formatCurrency(data.amountPaid), {
    fill: roseFill,
    labelFill: roseFill,
    labelFont: fontHelveticaBold,
    valFont: fontHelveticaBold,
    valColor: maroon,
    valSize: 10.5,
  });
  currentY += 21;

  drawTableRow(currentY, 'Payment Mode', data.paymentMode || 'Online / UPI');
  currentY += 21;
  drawTableRow(currentY, 'Transaction ID', data.transactionId || 'N/A');
  currentY += 21;
  drawTableRow(currentY, 'Payment Date', data.paymentDate || data.date);
  currentY += 21;

  // Store the Y coordinate after Payment Date for Seal Positioning
  const paymentDateEndY = currentY;

  // ------------------------------------------------------------
  // SECTION 6: SUCCESS BANNER (Row 26 of Excel)
  // Excel: Soft solid Rose Fill (#FFFCE4E4), bold crimson red text
  // ------------------------------------------------------------
  currentY += 12;
  const bannerY = currentY;
  const bannerH = 25;
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(bannerY, bannerH),
    width: contentWidth,
    height: bannerH,
    color: roseFill,
  });

  const succMsg = 'PAYMENT RECEIVED SUCCESSFULLY!';
  const succW = fontHelveticaBold.widthOfTextAtSize(succMsg, 11);
  const checkX = leftMargin + (contentWidth / 2) - (succW / 2) - 15;
  const checkY = toPdfY(bannerY + 12.5);

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
    y: toPdfY(bannerY + 17),
    size: 11,
    font: fontHelveticaBold,
    color: maroon,
  });
  currentY += bannerH;

  // ------------------------------------------------------------
  // SECTION 7: ACKNOWLEDGEMENT (Rows 27–28 of Excel)
  // ------------------------------------------------------------
  currentY += 10;
  const ackBoxY = currentY;

  const ackText1 = 'Thank you for choosing Johanna Bright Mentors.';
  const ackText2 = 'We are excited to have you with us!';

  // Center acknowledgment text
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

  currentY += 46;

  // ------------------------------------------------------------
  // SECTION 8: OFFICIAL SEAL & STAMP (Excel Row 24–28, Right Side)
  // Exactly matching Excel Screenshot 2:
  // Starts right around Payment Date / Banner, ends strictly ABOVE disclaimer!
  // ------------------------------------------------------------
  if (sealImg) {
    const sealSize = 78;
    // Positioned horizontally centered in Column E (right side)
    // Vertically overlapping Payment Date bottom and Banner right side, ending ABOVE disclaimer box
    const sealX = leftMargin + contentWidth - sealSize - 32;
    const sealY = bannerY - 18; // Sits across the banner, perfectly above disclaimer

    page.drawImage(sealImg, {
      x: sealX,
      y: toPdfY(sealY, sealSize),
      width: sealSize,
      height: sealSize,
    });
  }

  // ------------------------------------------------------------
  // SECTION 9: ELECTRONIC DISCLAIMER BOX (Rows 29–30 of Excel)
  // Excel: #FFF2F2F2 light grey background, centered text, below seal
  // ------------------------------------------------------------
  const discH = 26;
  page.drawRectangle({
    x: leftMargin,
    y: toPdfY(currentY, discH),
    width: contentWidth,
    height: discH,
    color: grayDisclaimer,
    borderWidth: 0.6,
    borderColor: redBorder,
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
  // SECTION 10: BOTTOM FOOTER BAR (Row 31 of Excel)
  // Excel: Solid Maroon #A90000 Bar, White Bold Contact Info
  // ------------------------------------------------------------
  const footerH = 21;
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
    y: toPdfY(currentY + 14.5),
    size: 8.2,
    font: fontHelveticaBold,
    color: white,
  });

  // 4. Save and return PDF Buffer
  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}

import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/lib/utils";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_your_resend_api_key") {
    console.warn("Resend API key is missing. Transactional emails will not be sent.");
    return null;
  }
  return new Resend(apiKey);
}

/**
 * 1. REGISTRATION RECEIVED & CONFIRMATION EMAIL
 * Triggered immediately when a student submits the enrollment form.
 */
export async function sendRegistrationReceivedEmail(params: {
  fullName: string;
  email: string;
  courseTitle: string;
  registrationReference: string;
  amount: number;
}) {
  const resend = getResendClient();
  const fromEmail = process.env.EMAIL_FROM || "Johanna Bright Mentors <noreply@johannabrightmentors.com>";
  const adminEmail = process.env.ADMIN_EMAIL || "hello.johannabrightmentors@gmail.com";
  const siteUrl = siteConfig.url;

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmed - ${siteConfig.name}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 30px 15px;
    }
    .main-card {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
    }
    .header-bar {
      background: linear-gradient(135deg, #800020 0%, #5a0016 100%);
      padding: 32px 28px 26px 28px;
      text-align: center;
      position: relative;
    }
    .brand-title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 1.5px;
      margin: 0;
      text-transform: uppercase;
    }
    .brand-slogan {
      display: inline-block;
      margin-top: 6px;
      padding: 3px 12px;
      background: rgba(245, 158, 11, 0.18);
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 9999px;
      color: #fef3c7;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .content-body {
      padding: 36px 32px;
    }
    .greeting {
      font-size: 17px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 14px 0;
    }
    .lead-text {
      font-size: 14.5px;
      line-height: 1.65;
      color: #475569;
      margin: 0 0 24px 0;
    }
    .ref-box {
      background: #fff5f7;
      border: 1.5px dashed #f43f5e;
      border-radius: 12px;
      padding: 16px 20px;
      text-align: center;
      margin: 0 0 26px 0;
    }
    .ref-label {
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #9f1239;
      margin: 0 0 4px 0;
    }
    .ref-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 20px;
      font-weight: 800;
      color: #800020;
      letter-spacing: 1.5px;
      margin: 0;
    }
    .summary-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px 22px;
      margin: 0 0 26px 0;
    }
    .summary-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 14px 0;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
    .summary-row {
      padding: 7px 0;
      font-size: 13.5px;
    }
    .summary-label {
      color: #64748b;
      font-weight: 500;
    }
    .summary-val {
      color: #0f172a;
      font-weight: 700;
      text-align: right;
    }
    .steps-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px 20px;
      margin: 0 0 26px 0;
    }
    .steps-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .step-item {
      font-size: 13px;
      color: #334155;
      line-height: 1.5;
      margin-bottom: 10px;
      display: flex;
      align-items: flex-start;
    }
    .help-card {
      background: #f1f5f9;
      border-radius: 10px;
      padding: 16px 20px;
      margin: 0 0 24px 0;
      font-size: 13px;
      color: #475569;
      line-height: 1.5;
    }
    .help-card strong {
      color: #0f172a;
    }
    .help-card a {
      color: #800020;
      font-weight: 700;
      text-decoration: none;
    }
    .footer {
      background: #0f172a;
      padding: 24px 28px;
      text-align: center;
      color: #94a3b8;
      font-size: 11.5px;
      line-height: 1.6;
    }
    .footer a {
      color: #cbd5e1;
      text-decoration: none;
    }
    .footer-divider {
      height: 1px;
      background: #334155;
      margin: 14px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      
      <!-- Top Brand Header -->
      <div class="header-bar">
        <h1 class="brand-title">${siteConfig.name}</h1>
        <div class="brand-slogan">✨ ${siteConfig.slogan}</div>
      </div>

      <!-- Main Body -->
      <div class="content-body">
        <p class="greeting">Dear ${params.fullName},</p>
        
        <p class="lead-text">
          Thank you for initiating your enrollment with <strong>${siteConfig.name}</strong>. We are thrilled to welcome you to our professional mentorship and career transformation community. Your registration has been successfully recorded in our academic registry.
        </p>

        <!-- Reference Code Box -->
        <div class="ref-box">
          <div class="ref-label">Official Registration Reference</div>
          <div class="ref-code">${params.registrationReference}</div>
        </div>

        <!-- Enrollment Summary Card -->
        <div class="summary-card">
          <div class="summary-title">Program Summary</div>
          <table>
            <tr class="summary-row">
              <td class="summary-label">Selected Program:</td>
              <td class="summary-val">${params.courseTitle}</td>
            </tr>
            <tr class="summary-row">
              <td class="summary-label">Training Format:</td>
              <td class="summary-val">Live Mentorship + Hands-on Labs</td>
            </tr>
            <tr class="summary-row">
              <td class="summary-label">Course Fee:</td>
              <td class="summary-val">${formatCurrency(params.amount)}</td>
            </tr>
            <tr class="summary-row">
              <td class="summary-label">Registration Status:</td>
              <td class="summary-val" style="color: #b45309;">Application Recorded</td>
            </tr>
          </table>
        </div>

        <!-- Next Steps -->
        <div class="steps-box">
          <div class="steps-title">What Happens Next?</div>
          <div class="step-item">
            <strong>1.&nbsp;Fee Verification / Payment:</strong>&nbsp;If payment was not completed at registration, you can finalize it through your admissions link or via Razorpay on the platform.
          </div>
          <div class="step-item">
            <strong>2.&nbsp;Admissions Onboarding:</strong>&nbsp;Our academic coordinator will reach out via WhatsApp/Phone with your orientation schedule, batch timings, and learning portal access.
          </div>
          <div class="step-item">
            <strong>3.&nbsp;Live Batch Access:</strong>&nbsp;You will receive the mentorship link and course repository ahead of the opening session.
          </div>
        </div>

        <!-- Contact Details Box -->
        <div style="background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 0 0 24px 0;">
          <div style="font-size: 13px; font-weight: 800; color: #800020; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
            📞 Admissions & Support Desk (Contact Details)
          </div>
          <table style="width: 100%; font-size: 13px; color: #334155;">
            <tr>
              <td style="padding: 5px 0; font-weight: 600; width: 130px; color: #64748b;">✉️ Official Email:</td>
              <td style="padding: 5px 0;">
                <a href="mailto:hello.johannabrightmentors@gmail.com" style="color: #800020; font-weight: 700; text-decoration: none;">
                  hello.johannabrightmentors@gmail.com
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 5px 0; font-weight: 600; color: #64748b;">💬 WhatsApp:</td>
              <td style="padding: 5px 0;">
                <a href="https://wa.me/918778578437?text=Hi%20JBM%20Team,%20my%20registration%20ref%20is%20${params.registrationReference}" style="color: #047857; font-weight: 700; text-decoration: none;">
                  +91 87785 78437 (Click to Chat)
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 5px 0; font-weight: 600; color: #64748b;">📞 Call Support:</td>
              <td style="padding: 5px 0;">
                <a href="tel:+918778578437" style="color: #0f172a; font-weight: 600; text-decoration: none;">
                  +91 87785 78437
                </a>
              </td>
            </tr>
          </table>
        </div>

        <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.5;">
          Warm regards,<br>
          <strong style="color: #0f172a; font-size: 14px;">Admissions & Mentorship Team</strong><br>
          ${siteConfig.name} • <em>${siteConfig.tagline}</em>
        </p>
      </div>

      <!-- Institutional Footer -->
      <div class="footer">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #ffffff;">${siteConfig.name}</p>
        <p style="margin: 0;">${siteConfig.contact.address} • <a href="${siteUrl}">${siteConfig.contact.website}</a></p>
        <div class="footer-divider"></div>
        <p style="margin: 0; font-size: 10.5px; color: #64748b;">
          This is an official automated communication from ${siteConfig.name}. Please keep your Registration Reference (<strong>${params.registrationReference}</strong>) safe for all future communications.
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `;

  if (!resend) {
    console.log(`[EMAIL STUB] Registration email simulated for ${params.email} (Ref: ${params.registrationReference})`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      replyTo: adminEmail,
      to: params.email,
      subject: `Registration Confirmed: ${params.courseTitle} [${params.registrationReference}]`,
      html: emailHtml,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send registration email via Resend:", error);
    return { success: false, error };
  }
}

/**
 * 2. OFFICIAL PAYMENT RECEIPT & ADMISSION CONFIRMED EMAIL
 * Triggered automatically upon successful Razorpay payment verification.
 */
export async function sendPaymentConfirmedEmail(params: {
  fullName: string;
  email: string;
  courseTitle: string;
  registrationReference: string;
  amount: number;
  paymentId: string;
  receiptBuffer?: Buffer;
}) {
  const resend = getResendClient();
  const fromEmail = process.env.EMAIL_FROM || "Johanna Bright Mentors <noreply@johannabrightmentors.com>";
  const adminEmail = process.env.ADMIN_EMAIL || "hello.johannabrightmentors@gmail.com";
  const siteUrl = siteConfig.url;
  const downloadUrl = `${siteUrl}/api/invoice/download?ref=${params.registrationReference}`;

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Receipt - ${siteConfig.name}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 30px 15px;
    }
    .main-card {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    .header-bar {
      background: linear-gradient(135deg, #800020 0%, #5a0016 100%);
      padding: 32px 28px 24px 28px;
      text-align: center;
    }
    .brand-title {
      color: #ffffff;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 1.5px;
      margin: 0;
      text-transform: uppercase;
    }
    .brand-slogan {
      display: inline-block;
      margin-top: 6px;
      padding: 3px 12px;
      background: rgba(245, 158, 11, 0.18);
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 9999px;
      color: #fef3c7;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .content-body {
      padding: 32px 28px;
    }
    .status-badge {
      display: inline-block;
      background-color: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #047857;
      font-size: 12px;
      font-weight: 800;
      padding: 6px 16px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 12px 0;
    }
    .lead-text {
      font-size: 14px;
      line-height: 1.6;
      color: #475569;
      margin: 0 0 24px 0;
    }
    .details-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px 20px;
      margin: 0 0 24px 0;
    }
    .details-row {
      padding: 8px 0;
      font-size: 13.5px;
      border-bottom: 1px solid #f1f5f9;
    }
    .details-row:last-child {
      border-bottom: none;
    }
    .details-label {
      color: #64748b;
      font-weight: 500;
    }
    .details-val {
      color: #0f172a;
      font-weight: 700;
      text-align: right;
    }
    .cta-container {
      text-align: center;
      margin: 28px 0;
    }
    .download-btn {
      display: inline-block;
      background-color: #800020;
      color: #ffffff !important;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 28px;
      border-radius: 10px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(128, 0, 32, 0.25);
    }
    .steps-box {
      background: #fff5f7;
      border: 1px solid #fed7aa;
      border-radius: 12px;
      padding: 18px 20px;
      margin: 0 0 24px 0;
    }
    .steps-title {
      font-size: 13px;
      font-weight: 700;
      color: #800020;
      margin: 0 0 10px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .step-item {
      font-size: 12.5px;
      color: #334155;
      line-height: 1.5;
      margin-bottom: 8px;
    }
    .help-card {
      background: #f1f5f9;
      border-radius: 10px;
      padding: 14px 18px;
      font-size: 12.5px;
      color: #475569;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .footer {
      background: #0f172a;
      padding: 24px 28px;
      text-align: center;
      color: #94a3b8;
      font-size: 11px;
      line-height: 1.6;
    }
    .footer a {
      color: #cbd5e1;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <div class="header-bar">
        <h1 class="brand-title">${siteConfig.name}</h1>
        <div class="brand-slogan">✨ ${siteConfig.slogan}</div>
      </div>

      <div class="content-body">
        <div style="text-align: center;">
          <span class="status-badge">✔ Payment Verified & Admission Confirmed</span>
        </div>

        <p class="greeting">Dear ${params.fullName},</p>
        <p class="lead-text">
          Thank you for choosing <strong>${siteConfig.name}</strong>. Your payment has been successfully verified, and your enrollment seat has been officially locked. Welcome aboard!
        </p>

        <!-- Summary Card -->
        <div class="details-card">
          <table>
            <tr class="details-row">
              <td class="details-label">Enrolled Program:</td>
              <td class="details-val">${params.courseTitle}</td>
            </tr>
            <tr class="details-row">
              <td class="details-label">Registration Ref:</td>
              <td class="details-val" style="color: #800020; font-family: monospace;">${params.registrationReference}</td>
            </tr>
            <tr class="details-row">
              <td class="details-label">Payment Gateway ID:</td>
              <td class="details-val" style="font-family: monospace; font-size: 12px;">${params.paymentId}</td>
            </tr>
            <tr class="details-row">
              <td class="details-label">Amount Paid:</td>
              <td class="details-val" style="color: #047857; font-size: 16px;">${formatCurrency(params.amount)}</td>
            </tr>
            <tr class="details-row">
              <td class="details-label">Payment Status:</td>
              <td class="details-val" style="color: #047857;">✔ Confirmed Paid</td>
            </tr>
          </table>
        </div>

        <!-- Download Button -->
        <div class="cta-container">
          <a href="${downloadUrl}" target="_blank" class="download-btn">
            📄 Download Official Receipt (PDF)
          </a>
          <p style="font-size: 11.5px; color: #64748b; margin: 10px 0 0 0;">
            A copy of your official PDF receipt is also attached directly to this email.
          </p>
        </div>

        <!-- Onboarding Steps -->
        <div class="steps-box">
          <div class="steps-title">What Happens Next?</div>
          <div class="step-item">
            <strong>1.&nbsp;Academic Onboarding:</strong> Our admissions desk will share your live classroom link and batch schedule before cohort kickoff.
          </div>
          <div class="step-item">
            <strong>2.&nbsp;Direct Support:</strong> Quote reference <strong>${params.registrationReference}</strong> for any queries with your assigned mentor.
          </div>
        </div>

        <!-- Contact Details Box -->
        <div style="background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; margin: 0 0 24px 0;">
          <div style="font-size: 13px; font-weight: 800; color: #800020; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
            📞 Admissions & Support Desk (Contact Details)
          </div>
          <table style="width: 100%; font-size: 13px; color: #334155;">
            <tr>
              <td style="padding: 5px 0; font-weight: 600; width: 130px; color: #64748b;">✉️ Official Email:</td>
              <td style="padding: 5px 0;">
                <a href="mailto:hello.johannabrightmentors@gmail.com" style="color: #800020; font-weight: 700; text-decoration: none;">
                  hello.johannabrightmentors@gmail.com
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 5px 0; font-weight: 600; color: #64748b;">💬 WhatsApp:</td>
              <td style="padding: 5px 0;">
                <a href="https://wa.me/918778578437?text=Hi%20JBM%20Team,%20my%20registration%20ref%20is%20${params.registrationReference}" style="color: #047857; font-weight: 700; text-decoration: none;">
                  +91 87785 78437 (Click to Chat)
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 5px 0; font-weight: 600; color: #64748b;">📞 Call Support:</td>
              <td style="padding: 5px 0;">
                <a href="tel:+918778578437" style="color: #0f172a; font-weight: 600; text-decoration: none;">
                  +91 87785 78437
                </a>
              </td>
            </tr>
          </table>
        </div>

        <p style="font-size: 12.5px; color: #64748b; margin: 0; line-height: 1.5;">
          Warm regards,<br>
          <strong style="color: #0f172a; font-size: 13.5px;">Admissions & Mentorship Team</strong><br>
          ${siteConfig.name} • <em>${siteConfig.tagline}</em>
        </p>
      </div>

      <div class="footer">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #ffffff;">${siteConfig.name}</p>
        <p style="margin: 0;">${siteConfig.contact.address} • <a href="${siteUrl}">${siteConfig.contact.website}</a></p>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const emailText = `Dear ${params.fullName},

Thank you for choosing Johanna Bright Mentors! 

Your payment of INR ${params.amount} for the program "${params.courseTitle}" has been received successfully.
Your official payment receipt is attached to this email.

Registration Reference: ${params.registrationReference}
Transaction ID: ${params.paymentId}

You can also download your receipt online at:
${downloadUrl}

Contact Details / Support:
• Official Email: hello.johannabrightmentors@gmail.com
• WhatsApp: +91 87785 78437 (https://wa.me/918778578437)
• Phone: +91 87785 78437

Our Academic Coordinator will connect with you via Phone/WhatsApp within 24 business hours to share your live class schedule and onboarding details.

Warm regards,
Admissions & Academic Directorate
Johanna Bright Mentors`;

  if (!resend) {
    console.log(`[EMAIL STUB] Payment receipt simulated for ${params.email} (Payment ID: ${params.paymentId})`);
    return { success: true, mocked: true };
  }

  try {
    const attachments = [];
    if (params.receiptBuffer) {
      attachments.push({
        filename: `JBM_Invoice_${params.registrationReference}.pdf`,
        content: params.receiptBuffer,
      });
    }

    const data = await resend.emails.send({
      from: fromEmail,
      replyTo: adminEmail,
      to: params.email,
      subject: `Official Payment Receipt: ${params.courseTitle} [${params.registrationReference}]`,
      html: emailHtml,
      text: emailText,
      attachments: attachments.length > 0 ? attachments : undefined,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send payment confirmation email via Resend:", error);
    return { success: false, error };
  }
}

/**
 * 3. ADMIN INSTANT ALERT: NEW REGISTRATION
 * Sends an immediate notification email to hello.johannabrightmentors@gmail.com
 */
export async function sendAdminNewRegistrationAlert(params: {
  fullName: string;
  email: string;
  phone: string;
  courseTitle: string;
  registrationReference: string;
  amount: number;
  referralCode?: string | null;
  message?: string | null;
}) {
  const resend = getResendClient();
  const fromEmail = process.env.EMAIL_FROM || "Johanna Bright Mentors <noreply@johannabrightmentors.com>";
  const adminEmail = process.env.ADMIN_EMAIL || "hello.johannabrightmentors@gmail.com";
  const siteUrl = siteConfig.url;

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
    .card { max-width: 560px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; border-radius: 12px; overflow: hidden; }
    .header { background: #800020; padding: 20px; text-align: center; color: #ffffff; }
    .body { padding: 24px; font-size: 14px; line-height: 1.6; }
    .item { padding: 8px 0; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; }
    .label { color: #94a3b8; }
    .val { font-weight: 700; color: #ffffff; text-align: right; }
    .btn { display: inline-block; background: #f43f5e; color: #ffffff; font-weight: 700; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 18px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2 style="margin:0; font-size: 18px;">⚡ NEW STUDENT REGISTRATION</h2>
      <p style="margin:4px 0 0 0; font-size: 12px; color: #fecdd3;">Johanna Bright Mentors Admissions</p>
    </div>
    <div class="body">
      <p style="margin: 0 0 16px 0; font-size: 15px;">A new learner has just submitted an enrollment application on your website.</p>
      
      <div class="item"><span class="label">Reference ID:</span><span class="val" style="color: #fb7185; font-family: monospace;">${params.registrationReference}</span></div>
      <div class="item"><span class="label">Student Name:</span><span class="val">${params.fullName}</span></div>
      <div class="item"><span class="label">Course:</span><span class="val">${params.courseTitle}</span></div>
      <div class="item"><span class="label">Email:</span><span class="val">${params.email}</span></div>
      <div class="item"><span class="label">Phone:</span><span class="val">${params.phone}</span></div>
      <div class="item"><span class="label">Course Fee:</span><span class="val">${formatCurrency(params.amount)}</span></div>
      ${params.referralCode ? `<div class="item"><span class="label">Referral Code:</span><span class="val" style="color: #facc15;">${params.referralCode}</span></div>` : ""}
      ${params.message ? `<div class="item"><span class="label">Note/Message:</span><span class="val">${params.message}</span></div>` : ""}
      
      <div style="text-align: center;">
        <a href="${siteUrl}/admin/registrations" class="btn">Open Admin Dashboard</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  if (!resend) {
    console.log(`[ADMIN EMAIL STUB] New registration alert for ${params.fullName}`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `⚡ New Registration: ${params.fullName} - ${params.courseTitle} [${params.registrationReference}]`,
      html: emailHtml,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send admin registration alert:", error);
    return { success: false, error };
  }
}

/**
 * 4. ADMIN INSTANT ALERT: PAYMENT RECEIVED
 * Sends an immediate payment alert to hello.johannabrightmentors@gmail.com
 */
export async function sendAdminPaymentReceivedAlert(params: {
  fullName: string;
  email: string;
  courseTitle: string;
  registrationReference: string;
  amount: number;
  paymentId: string;
}) {
  const resend = getResendClient();
  const fromEmail = process.env.EMAIL_FROM || "Johanna Bright Mentors <noreply@johannabrightmentors.com>";
  const adminEmail = process.env.ADMIN_EMAIL || "hello.johannabrightmentors@gmail.com";
  const siteUrl = siteConfig.url;

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #064e3b; color: #f8fafc; margin: 0; padding: 20px; }
    .card { max-width: 560px; margin: 0 auto; background: #065f46; border: 1px solid #059669; border-radius: 12px; overflow: hidden; }
    .header { background: #047857; padding: 20px; text-align: center; color: #ffffff; }
    .body { padding: 24px; font-size: 14px; line-height: 1.6; }
    .item { padding: 8px 0; border-bottom: 1px solid #047857; display: flex; justify-content: space-between; }
    .label { color: #a7f3d0; }
    .val { font-weight: 700; color: #ffffff; text-align: right; }
    .btn { display: inline-block; background: #10b981; color: #ffffff; font-weight: 700; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 18px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2 style="margin:0; font-size: 18px;">💰 PAYMENT RECEIVED & VERIFIED</h2>
      <p style="margin:4px 0 0 0; font-size: 12px; color: #a7f3d0;">Johanna Bright Mentors Admissions</p>
    </div>
    <div class="body">
      <p style="margin: 0 0 16px 0; font-size: 15px;">A student has successfully paid the tuition fee via Razorpay.</p>
      
      <div class="item"><span class="label">Amount Paid:</span><span class="val" style="color: #fef08a; font-size: 16px;">${formatCurrency(params.amount)}</span></div>
      <div class="item"><span class="label">Student Name:</span><span class="val">${params.fullName}</span></div>
      <div class="item"><span class="label">Course:</span><span class="val">${params.courseTitle}</span></div>
      <div class="item"><span class="label">Reference ID:</span><span class="val" style="font-family: monospace;">${params.registrationReference}</span></div>
      <div class="item"><span class="label">Razorpay Payment ID:</span><span class="val" style="font-family: monospace;">${params.paymentId}</span></div>
      <div class="item"><span class="label">Student Email:</span><span class="val">${params.email}</span></div>
      
      <div style="text-align: center;">
        <a href="${siteUrl}/admin/registrations" class="btn">View in Registrations</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  if (!resend) {
    console.log(`[ADMIN EMAIL STUB] Payment received alert for ${params.fullName} (${params.paymentId})`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `💰 Payment Received: ${formatCurrency(params.amount)} from ${params.fullName} [${params.registrationReference}]`,
      html: emailHtml,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send admin payment alert:", error);
    return { success: false, error };
  }
}

/**
 * 6. CONTACT FORM INQUIRY ALERT TO ADMIN
 */
export async function sendContactInquiryNotificationEmail(params: {
  name: string;
  email: string;
  phone?: string;
  purpose: string;
  message: string;
}) {
  const resend = getResendClient();
  const fromEmail = process.env.EMAIL_FROM || "Johanna Bright Mentors <noreply@johannabrightmentors.com>";
  const adminEmail = process.env.ADMIN_EMAIL || "hello.johannabrightmentors@gmail.com";
  const siteUrl = siteConfig.url;

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: sans-serif; background: #f8fafc; padding: 20px; }
    .card { max-width: 550px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #800020; color: #fff; padding: 20px; }
    .body { padding: 20px; color: #334155; line-height: 1.6; }
    .field { margin-bottom: 12px; }
    .label { font-weight: bold; color: #0f172a; font-size: 13px; }
    .box { background: #f1f5f9; padding: 12px; rounded: 8px; border-left: 4px solid #800020; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h3 style="margin:0; text-transform: uppercase;">📩 New Contact Inquiry</h3>
      <p style="margin:4px 0 0 0; font-size: 12px; opacity: 0.9;">Johanna Bright Mentors Website</p>
    </div>
    <div class="body">
      <div class="field"><span class="label">Name:</span> ${params.name}</div>
      <div class="field"><span class="label">Email:</span> ${params.email}</div>
      <div class="field"><span class="label">Phone:</span> ${params.phone || "N/A"}</div>
      <div class="field"><span class="label">Purpose:</span> <span style="text-transform: uppercase; font-weight: bold; color: #800020;">${params.purpose}</span></div>
      <div class="field" style="margin-top: 16px;">
        <span class="label">Message:</span>
        <div class="box">${params.message}</div>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <a href="${siteUrl}/admin/messages" style="background: #800020; color: #fff; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px;">View Messages in Admin</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  if (!resend) {
    console.log(`[CONTACT EMAIL STUB] Inquiry from ${params.name} (${params.email}) - Purpose: ${params.purpose}`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `📩 New Website Inquiry from ${params.name} [${params.purpose.toUpperCase()}]`,
      html: emailHtml,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send contact inquiry notification:", error);
    return { success: false, error };
  }
}


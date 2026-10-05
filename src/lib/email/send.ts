import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/lib/utils";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_your_resend_api_key") {
    return null;
  }
  return new Resend(apiKey);
}

export async function sendRegistrationReceivedEmail(params: {
  fullName: string;
  email: string;
  courseTitle: string;
  registrationReference: string;
  amount: number;
}) {
  const resend = getResendClient();
  const fromEmail = process.env.EMAIL_FROM || "hello.johannabrightmentors@gmail.com";

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; color: #38bdf8; }
          .content { padding: 32px 24px; }
          .ref-badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 6px 14px; border-radius: 9999px; font-weight: 600; font-size: 14px; margin: 16px 0; }
          .card { background: #f1f5f9; border-left: 4px solid #0ea5e9; padding: 16px; border-radius: 4px; margin: 20px 0; }
          .footer { background: #f8fafc; color: #64748b; padding: 20px; text-align: center; font-size: 12px; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${siteConfig.name}</h1>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #94a3b8;">${siteConfig.tagline}</p>
          </div>
          <div class="content">
            <h2>Registration Received!</h2>
            <p>Dear <strong>${params.fullName}</strong>,</p>
            <p>Thank you for initiating your enrollment with ${siteConfig.name}. We have successfully recorded your registration details.</p>
            
            <div>
              <strong>Your Registration Reference:</strong><br />
              <span class="ref-badge">${params.registrationReference}</span>
            </div>

            <div class="card">
              <h3 style="margin-top: 0; font-size: 16px; color: #0f172a;">Course Summary</h3>
              <p style="margin: 4px 0;"><strong>Course:</strong> ${params.courseTitle}</p>
              <p style="margin: 4px 0;"><strong>Enrollment Fee:</strong> ${formatCurrency(params.amount)}</p>
              <p style="margin: 4px 0;"><strong>Status:</strong> Registration Recorded (Payment Pending / In-Progress)</p>
            </div>

            <p>If you haven't completed your payment yet, you can complete it anytime using your registration reference link or by reaching out to our admissions office.</p>
            
            <p>Need assistance? Contact our admissions counselor at <a href="mailto:${siteConfig.contact.email}">${siteConfig.contact.email}</a> or call ${siteConfig.contact.phone}.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.<br>${siteConfig.contact.address}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (!resend) {
    console.log(`[EMAIL STUB] Registration Received sent to ${params.email} (Ref: ${params.registrationReference})`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      replyTo: process.env.ADMIN_EMAIL || "hello.johannabrightmentors@gmail.com",
      to: params.email,
      subject: `Registration Confirmed: ${params.courseTitle} [${params.registrationReference}]`,
      html: emailHtml,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send registration email via Resend:", error);
    // Don't fail the registration if email fails
    return { success: false, error };
  }
}

export async function sendPaymentConfirmedEmail(params: {
  fullName: string;
  email: string;
  courseTitle: string;
  registrationReference: string;
  amount: number;
  paymentId: string;
}) {
  const resend = getResendClient();
  const fromEmail = process.env.EMAIL_FROM || "hello.johannabrightmentors@gmail.com";

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; color: #38bdf8; }
          .content { padding: 32px 24px; }
          .paid-badge { display: inline-block; background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 9999px; font-weight: 700; font-size: 14px; margin: 16px 0; }
          .card { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; border-radius: 4px; margin: 20px 0; }
          .footer { background: #f8fafc; color: #64748b; padding: 20px; text-align: center; font-size: 12px; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${siteConfig.name}</h1>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #94a3b8;">Official Payment Receipt & Admission Confirmation</p>
          </div>
          <div class="content">
            <h2>Payment Successful! 🎉</h2>
            <p>Dear <strong>${params.fullName}</strong>,</p>
            <p>We are delighted to confirm that your payment for <strong>${params.courseTitle}</strong> has been successfully verified and received.</p>
            
            <div>
              <span class="paid-badge">✔ PAYMENT CONFIRMED</span>
            </div>

            <div class="card">
              <h3 style="margin-top: 0; font-size: 16px; color: #14532d;">Enrollment Details</h3>
              <p style="margin: 4px 0;"><strong>Registration Ref:</strong> ${params.registrationReference}</p>
              <p style="margin: 4px 0;"><strong>Payment ID:</strong> ${params.paymentId}</p>
              <p style="margin: 4px 0;"><strong>Course:</strong> ${params.courseTitle}</p>
              <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ${formatCurrency(params.amount)}</p>
              <p style="margin: 4px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
            </div>

            <p>Our academic coordinator will reach out to you within 24 hours with your batch schedule, orientation link, and lab access credentials.</p>
            
            <p>For any queries, please reply directly to this email or reach us at <a href="mailto:${siteConfig.contact.email}">${siteConfig.contact.email}</a>.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.<br>${siteConfig.contact.address}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (!resend) {
    console.log(`[EMAIL STUB] Payment Confirmation sent to ${params.email} (Payment ID: ${params.paymentId})`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      replyTo: process.env.ADMIN_EMAIL || "hello.johannabrightmentors@gmail.com",
      to: params.email,
      subject: `Payment Receipt: ${params.courseTitle} [${params.registrationReference}]`,
      html: emailHtml,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send payment confirmation email via Resend:", error);
    return { success: false, error };
  }
}

import crypto from "crypto";
import Razorpay from "razorpay";

function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return null;
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}

/**
 * Creates a server-side order with Razorpay
 */
export async function createRazorpayOrder(params: {
  amount: number; // in INR (will be converted to paise)
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const razorpay = getRazorpayInstance();

  if (!razorpay) {
    // If Razorpay credentials are not configured, provide a structured mock response for local testing
    return {
      id: `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      amount: params.amount * 100,
      currency: params.currency || "INR",
      receipt: params.receipt,
      status: "created",
      isMock: true,
    };
  }

  const options = {
    amount: Math.round(params.amount * 100), // Razorpay takes amount in smallest currency unit (paise)
    currency: params.currency || "INR",
    receipt: params.receipt.substring(0, 40), // Razorpay receipt max 40 chars
    notes: params.notes || {},
  };

  const order = await razorpay.orders.create(options);
  return {
    id: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
    status: order.status,
    isMock: false,
  };
}

/**
 * Verifies Razorpay payment signature server-side
 * Uses constant-time HMAC comparison (crypto.timingSafeEqual) to prevent side-channel timing attacks
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!params.orderId || !params.paymentId || !params.signature) {
    return false;
  }

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  const isProduction = process.env.NODE_ENV === "production";

  // Strict check: Mock mode is NEVER permitted in production
  if (!key_secret || key_secret === "your_razorpay_key_secret") {
    if (isProduction) {
      console.error("CRITICAL SECURITY ALERT: RAZORPAY_KEY_SECRET is not configured in production.");
      return false;
    }
    // Only in non-production local development with mock order format
    return (
      params.orderId.startsWith("order_mock_") &&
      params.signature.startsWith("mock_sig_")
    );
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(`${params.orderId}|${params.paymentId}`)
      .digest("hex");

    const genBuffer = Buffer.from(generatedSignature, "utf-8");
    const sigBuffer = Buffer.from(params.signature, "utf-8");

    if (genBuffer.length !== sigBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(genBuffer, sigBuffer);
  } catch (err) {
    console.error("Signature verification exception:", err);
    return false;
  }
}

/**
 * Verifies Razorpay Webhook signature with constant-time comparison
 */
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret || !signature || !payload) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(payload)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf-8");
    const sigBuffer = Buffer.from(signature, "utf-8");

    if (expectedBuffer.length !== sigBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, sigBuffer);
  } catch (err) {
    console.error("Webhook signature verification exception:", err);
    return false;
  }
}

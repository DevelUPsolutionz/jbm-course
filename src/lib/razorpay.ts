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
    // If Razorpay credentials are not yet configured, provide a structured mock response for local testing
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
 */
export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  // In test / mock mode when secret is placeholder, handle gracefully
  if (!key_secret || key_secret === "your_razorpay_key_secret") {
    return params.signature.startsWith("mock_sig_") || params.signature.length > 0;
  }

  const generatedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");

  return generatedSignature === params.signature;
}

/**
 * Verifies Razorpay Webhook signature
 */
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(payload)
    .digest("hex");

  return expectedSignature === signature;
}

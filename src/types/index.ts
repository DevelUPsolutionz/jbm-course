export interface SyllabusModule {
  week: string;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  shortDescription: string;
  description: string;
  actualFee: number; // Original crossed-out price
  fee: number; // Offer price
  currency: string;
  duration: string;
  level: string;
  introVideoUrl: string;
  thumbnailUrl: string;
  posterUrl?: string; // High-res course flyer poster
  headerImageUrl?: string; // Official wide landscape course header banner
  isActive: boolean;
  syllabus: SyllabusModule[];
  learningOutcomes: string[];
  prerequisites: string[];
  targetAudience: string[];
  additionalBenefits?: string[];
  instructor?: {
    name: string;
    role: string;
    bio: string;
    avatarUrl?: string;
  };
}

export interface RegistrationPayload {
  fullName: string;
  email: string;
  phone: string;
  courseSlug: string;
  couponCode?: string;
  message?: string;
  termsAccepted: boolean;
}

export interface RegistrationRecord {
  id: string;
  registrationReference: string;
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  amount: number;
  currency: string;
  couponCode?: string | null;
  discountAmount?: number;
  message?: string | null;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  termsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  registrationReference: string;
  keyId: string;
  courseTitle: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  discountApplied?: number;
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  registrationReference: string;
}

export interface AdminStats {
  totalRegistrations: number;
  paidRegistrations: number;
  pendingRegistrations: number;
  failedRegistrations: number;
  totalRevenue: number;
  courseStats: {
    courseSlug: string;
    courseTitle: string;
    total: number;
    paid: number;
    pending: number;
    revenue: number;
  }[];
}

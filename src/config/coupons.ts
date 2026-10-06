export interface ReferralCode {
  code: string;
  staffName: string;
  staffRole: string;
  description: string;
}

export type Coupon = ReferralCode & {
  discountPercentage: number;
  isReferral?: boolean;
};

// ─── 10 Official Staff / Counselor Referral Codes ───────────────────────────
// These codes are strictly for lead tracking and counselor attribution.
// They do NOT alter or discount the course price.
export const JBM_REFERRAL_CODES: Record<string, ReferralCode> = {
  JBM10X7K: {
    code: "JBM10X7K",
    staffName: "Counselor 01",
    staffRole: "Admissions Specialist",
    description: "Official JBM Counselor Referral - 01",
  },
  JBM20A9P: {
    code: "JBM20A9P",
    staffName: "Counselor 02",
    staffRole: "Admissions Specialist",
    description: "Official JBM Counselor Referral - 02",
  },
  JBM30M4Q: {
    code: "JBM30M4Q",
    staffName: "Counselor 03",
    staffRole: "Academic Mentor",
    description: "Official JBM Counselor Referral - 03",
  },
  JBM40R8T: {
    code: "JBM40R8T",
    staffName: "Counselor 04",
    staffRole: "Academic Mentor",
    description: "Official JBM Counselor Referral - 04",
  },
  JBM50K2L: {
    code: "JBM50K2L",
    staffName: "Counselor 05",
    staffRole: "Lead Outreach Partner",
    description: "Official JBM Counselor Referral - 05",
  },
  JBM60N7V: {
    code: "JBM60N7V",
    staffName: "Counselor 06",
    staffRole: "Senior Counselor",
    description: "Official JBM Counselor Referral - 06",
  },
  JBM70C5X: {
    code: "JBM70C5X",
    staffName: "Counselor 07",
    staffRole: "Senior Counselor",
    description: "Official JBM Counselor Referral - 07",
  },
  JBM80H3D: {
    code: "JBM80H3D",
    staffName: "Counselor 08",
    staffRole: "Career Advisor",
    description: "Official JBM Counselor Referral - 08",
  },
  JBM90P6W: {
    code: "JBM90P6W",
    staffName: "Counselor 09",
    staffRole: "Career Advisor",
    description: "Official JBM Counselor Referral - 09",
  },
  JBM100Z4F: {
    code: "JBM100Z4F",
    staffName: "Counselor 10",
    staffRole: "Executive Admissions Lead",
    description: "Official JBM Counselor Referral - 10",
  },
};

export const JBM_COUPONS: Record<string, Coupon> = Object.fromEntries(
  Object.entries(JBM_REFERRAL_CODES).map(([code, ref]) => [
    code,
    {
      ...ref,
      discountPercentage: 0, // No discount, pure referral tracking
    },
  ])
);

export function validateReferralCode(code: string): ReferralCode | null {
  if (!code) return null;
  const normalized = code.trim().toUpperCase();
  return JBM_REFERRAL_CODES[normalized] || null;
}

export function validateCoupon(code: string): Coupon | null {
  if (!code) return null;
  const normalized = code.trim().toUpperCase();
  return JBM_COUPONS[normalized] || null;
}

export function calculateDiscountedPrice(originalPrice: number, couponCode?: string): {
  finalPrice: number;
  discountAmount: number;
  appliedCoupon: Coupon | null;
} {
  if (!couponCode) {
    return { finalPrice: originalPrice, discountAmount: 0, appliedCoupon: null };
  }

  const referral = validateCoupon(couponCode);
  if (!referral) {
    return { finalPrice: originalPrice, discountAmount: 0, appliedCoupon: null };
  }

  // Referral code does not reduce price; 100% of course fee is retained
  return {
    finalPrice: originalPrice,
    discountAmount: 0,
    appliedCoupon: referral,
  };
}

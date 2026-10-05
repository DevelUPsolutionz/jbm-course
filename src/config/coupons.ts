export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
  isReferral?: boolean;
}

export const JBM_COUPONS: Record<string, Coupon> = {
  JBM10X7K: {
    code: "JBM10X7K",
    discountPercentage: 10,
    description: "10% Special Student Discount",
  },
  JBM20A9P: {
    code: "JBM20A9P",
    discountPercentage: 20,
    description: "20% Early Bird Scholar Discount",
  },
  JBM30M4Q: {
    code: "JBM30M4Q",
    discountPercentage: 30,
    description: "30% Fast Track Enrollment Discount",
  },
  JBM40R8T: {
    code: "JBM40R8T",
    discountPercentage: 40,
    description: "40% Merit Achiever Discount",
  },
  JBM50K2L: {
    code: "JBM50K2L",
    discountPercentage: 50,
    description: "50% Mega Flash Season Discount",
  },
  JBM60N7V: {
    code: "JBM60N7V",
    discountPercentage: 60,
    description: "60% Super Scholar Privilege Discount",
  },
  JBM70C5X: {
    code: "JBM70C5X",
    discountPercentage: 70,
    description: "70% Executive Skill Builder Discount",
  },
  JBM80H3D: {
    code: "JBM80H3D",
    discountPercentage: 80,
    description: "80% Leadership Grant Discount",
  },
  JBM90P6W: {
    code: "JBM90P6W",
    discountPercentage: 90,
    description: "90% Prime Ambassador Scholarship",
  },
  JBM100Z4F: {
    code: "JBM100Z4F",
    discountPercentage: 100,
    description: "100% Full VIP Referral & Scholarship Pass",
    isReferral: true,
  },
};

export function validateCoupon(code: string): Coupon | null {
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

  const coupon = validateCoupon(couponCode);
  if (!coupon) {
    return { finalPrice: originalPrice, discountAmount: 0, appliedCoupon: null };
  }

  const discountAmount = Math.round((originalPrice * coupon.discountPercentage) / 100);
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  return {
    finalPrice,
    discountAmount,
    appliedCoupon: coupon,
  };
}

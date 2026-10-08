import fs from "fs";
import path from "path";
import { COURSES, getCourseBySlug as getStaticCourseBySlug } from "@/config/courses";
import { Course } from "@/types";
import { getAdminClient } from "@/lib/supabase/admin";

export interface CoursePricingRecord {
  slug: string;
  actualFee: number;
  discountPercent: number;
  fee: number;
}

const PRICING_FILE_PATH = path.join(process.cwd(), "src", "config", "pricing-override.json");

// Read local cache safely
function readLocalPricingOverrides(): Record<string, CoursePricingRecord> {
  try {
    if (fs.existsSync(PRICING_FILE_PATH)) {
      const data = fs.readFileSync(PRICING_FILE_PATH, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("Failed to read local pricing overrides:", err);
  }
  return {
    "artificial-intelligence": { slug: "artificial-intelligence", actualFee: 23000, discountPercent: 50, fee: 11500 },
    "english": { slug: "english", actualFee: 20000, discountPercent: 50, fee: 10000 },
    "cyber-security": { slug: "cyber-security", actualFee: 21000, discountPercent: 50, fee: 10500 },
  };
}

// Write local cache safely
function writeLocalPricingOverrides(data: Record<string, CoursePricingRecord>): void {
  try {
    const dir = path.dirname(PRICING_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PRICING_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("Failed to save local pricing overrides:", err);
  }
}

/**
 * Retrieves all courses merged with dynamic pricing (from Supabase or local cache)
 */
export async function getDynamicCourses(): Promise<Course[]> {
  const overrides = readLocalPricingOverrides();

  // Attempt to fetch from Supabase with 2s timeout
  try {
    const supabase = getAdminClient();
    const dbPromise = supabase
      .from("courses")
      .select("slug, actual_fee, discount_percent, fee, is_active");

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Supabase Timeout")), 10000)
    );

    const result: any = await Promise.race([dbPromise, timeoutPromise]);

    if (result && !result.error && Array.isArray(result.data) && result.data.length > 0) {
      result.data.forEach((dbC: any) => {
        if (dbC.slug) {
          overrides[dbC.slug] = {
            slug: dbC.slug,
            actualFee: Number(dbC.actual_fee) || Number(dbC.fee) || 0,
            discountPercent: Number(dbC.discount_percent) || 0,
            fee: Number(dbC.fee) || 0,
          };
        }
      });
      // Synchronize back to local file
      writeLocalPricingOverrides(overrides);
    }
  } catch (err) {
    console.warn("Supabase course pricing fetch notice (using cached pricing):", err);
  }

  // Merge pricing into static course definitions
  return COURSES.map((course) => {
    const override = overrides[course.slug];
    if (override) {
      const actualFee = override.actualFee || course.actualFee;
      const discountPercent = override.discountPercent !== undefined ? override.discountPercent : 50;
      const fee = override.fee || course.fee;

      return {
        ...course,
        actualFee,
        discountPercent,
        fee,
      };
    }
    return course;
  });
}

/**
 * Retrieves a single course by slug with dynamic pricing
 */
export async function getDynamicCourseBySlug(slug: string): Promise<Course | undefined> {
  const courses = await getDynamicCourses();
  const normalized = slug.toLowerCase().trim();

  if (normalized === "ai" || normalized === "ai-foundation-productivity" || normalized === "artificial-intelligence") {
    return courses.find((c) => c.slug === "artificial-intelligence");
  }
  if (normalized === "english" || normalized === "jbm-professional-english" || normalized === "professional-english") {
    return courses.find((c) => c.slug === "english");
  }
  if (normalized === "cyber-security" || normalized === "cybersecurity" || normalized === "networking-in-cyber-security" || normalized === "networking") {
    return courses.find((c) => c.slug === "cyber-security");
  }

  return courses.find((c) => c.slug === normalized && c.isActive);
}

/**
 * Updates dynamic pricing for a course in Supabase and local cache
 */
export async function updateCoursePricing(
  slug: string,
  actualFee: number,
  discountPercent: number,
  fee: number
): Promise<CoursePricingRecord> {
  const overrides = readLocalPricingOverrides();
  const record: CoursePricingRecord = {
    slug,
    actualFee,
    discountPercent,
    fee,
  };

  overrides[slug] = record;
  writeLocalPricingOverrides(overrides);

  // Persist to Supabase database
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("courses")
      .update({
        actual_fee: actualFee,
        discount_percent: discountPercent,
        fee: fee,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug)
      .select();

    if (error) {
      console.error("Supabase course pricing update error:", error.message || error);
    } else {
      console.log("Supabase course pricing updated successfully for:", slug, data);
    }
  } catch (err) {
    console.warn("Supabase course pricing update notice (cached locally):", err);
  }

  return record;
}

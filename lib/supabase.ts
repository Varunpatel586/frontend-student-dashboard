import { createClient } from "@supabase/supabase-js";
import { Course } from "@/types/database.types";

// Retrieve Supabase credentials from Next.js environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Check if credentials are present, otherwise fallback to mock data
const hasCredentials = !!(supabaseUrl && supabaseAnonKey);

export const supabase = hasCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Toggle this boolean to true to force-test the error boundary state manually
const FORCE_SIMULATE_DB_ERROR = false;

/**
 * Fetches course data from Supabase.
 * If credentials are missing or query fails/returns empty, it handles it gracefully
 * or triggers Next.js error boundaries.
 */
export async function fetchCourses(): Promise<Course[]> {

  if (FORCE_SIMULATE_DB_ERROR) {
    throw new Error("Failed to establish a connection to the Supabase database. (SQLSTATE 08006)");
  }

  // If no Supabase environment variables are set, fallback to mock data
  if (!supabase) {
    console.warn("Supabase credentials missing from .env. Falling back to mock data.");
    return getMockCourses();
  }

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      // If the table 'courses' does not exist in the database schema cache (code PGRST205),
      // fallback to mock data to keep the prototype visible.
      if (error.code === "PGRST205") {
        console.warn("Supabase table 'courses' does not exist. Falling back to mock data.");
        return getMockCourses();
      }
      
      console.error("Supabase query error:", error);
      throw new Error(`Failed to query courses table: ${error.message}`);
    }

    // If table has no rows or is blocked by Row-Level Security (RLS) policies,
    // we return the high-fidelity mock data so the dashboard prototype is populated.
    if (!data || data.length === 0) {
      console.warn("Supabase query returned empty dataset (check RLS policies). Using mock data fallback.");
      return getMockCourses();
    }

    return data as Course[];
  } catch (err: any) {
    console.error("Supabase connection error caught:", err);
    // Propagate error up to trigger Next.js error.tsx boundary
    throw new Error(err.message || "Failed to establish a connection to the database.");
  }
}

/**
 * High-fidelity mock course dataset representing actual study topics
 */
function getMockCourses(): Course[] {
  return [
    {
      id: "c1",
      title: "Advanced Next.js App Router Architecture",
      progress: 78,
      icon_name: "Code2",
      created_at: "2026-05-15T08:00:00Z"
    },
    {
      id: "c2",
      title: "Interactive Animations with Framer Motion",
      progress: 92,
      icon_name: "Sparkles",
      created_at: "2026-05-20T10:30:00Z"
    },
    {
      id: "c3",
      title: "Database Engineering & PostgreSQL Optimizations",
      progress: 45,
      icon_name: "Database",
      created_at: "2026-05-25T14:15:00Z"
    },
    {
      id: "c4",
      title: "System Architecture & Microservices",
      progress: 20,
      icon_name: "Cpu",
      created_at: "2026-06-01T09:00:00Z"
    },
    {
      id: "c5",
      title: "UI/UX & Design Systems with Tailwind CSS v4",
      progress: 60,
      icon_name: "Palette",
      created_at: "2026-06-05T16:45:00Z"
    }
  ];
}

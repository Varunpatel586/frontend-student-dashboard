/**
 * TypeScript interface representing a course from the Supabase 'courses' table.
 */
export interface Course {
  id: string;          // uuid (primary key)
  title: string;       // text
  progress: number;    // integer (0-100)
  icon_name: string;   // text (maps to a Lucide icon name, e.g., 'Code2', 'Cpu')
  created_at: string;  // timestamp (ISO string representation)
}

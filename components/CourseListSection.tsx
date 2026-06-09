import { fetchCourses } from "@/lib/supabase";
import CourseGrid from "./CourseGrid";

/**
 * React Server Component that fetches courses from the database.
 * This component runs entirely on the server side.
 */
export default async function CourseListSection() {
  const courses = await fetchCourses();
  
  return (
    <div className="w-full">
      <CourseGrid courses={courses} />
    </div>
  );
}

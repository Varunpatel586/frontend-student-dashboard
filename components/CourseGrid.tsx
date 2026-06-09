"use client";

import { motion, Variants } from "framer-motion";
import { Course } from "@/types/database.types";
import CourseTile from "./CourseTile";

interface CourseGridProps {
  courses: Course[];
}

// Staggered grid container animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // delay of 100ms between each course tile entrance
      delayChildren: 0.1
    }
  }
};

// Individual card entrance animation variants (fade-in + y translation)
const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
    >
      {courses.map((course) => (
        <motion.div 
          key={course.id} 
          variants={itemVariants}
          // Ensure the wrapper layout doesn't cause shift repaints
          className="will-change-transform"
        >
          <CourseTile course={course} />
        </motion.div>
      ))}
    </motion.div>
  );
}

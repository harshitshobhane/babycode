import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition = ({ children, className }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 
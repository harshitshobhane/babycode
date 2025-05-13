import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  className?: string;
}

const LoadingScreen = ({ className }: LoadingScreenProps) => {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm", className)}>
      <div className="relative">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-primary/20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-primary"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/80" />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen; 
"use client";
import { motion, useReducedMotion } from "framer-motion";
/** The actual Framer Motion wrapper used for cards throughout the frontend. */
export default function MotionSurface({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0.75, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{
        type: "spring",
        stiffness: 170,
        damping: 23,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

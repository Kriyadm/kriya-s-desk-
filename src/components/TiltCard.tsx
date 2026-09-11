import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Real pointer-tracked 3D tilt — springs back flat on leave. */
export function TiltCard({
  children,
  className = "",
  baseRotate = 0,
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  baseRotate?: number;
  intensity?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        reduce
          ? { rotate: baseRotate }
          : { rotateX, rotateY, rotate: baseRotate, transformStyle: "preserve-3d", perspective: 700 }
      }
      whileHover={reduce ? {} : { rotate: 0, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onPointerMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

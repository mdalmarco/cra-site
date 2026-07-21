"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Hero com parallax discreto: o fundo se move mais devagar que o scroll,
// dando profundidade sem nunca travar a leitura nem "sequestrar" o scroll.
export function ParallaxHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-6 pb-16 pt-24 text-white sm:px-16"
    >
      <motion.div style={{ y }} className="cra-photo-placeholder absolute inset-0 -z-10 scale-110" />
      {children}
    </section>
  );
}

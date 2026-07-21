"use client";

import { motion } from "motion/react";

// Motion fisico: tudo chega (translate + fade), nada aparece do nada,
// nada some. Spring sem bounce (damping alto) — peso, nao elasticidade
// exagerada. Roda uma vez por elemento, na entrada em viewport.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ type: "spring", damping: 26, stiffness: 90, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ServicioDetalle({ items = [] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.08 }}
          className="flex items-start gap-3"
        >
          <CheckCircle2
            className="mt-0.5 shrink-0 text-primary"
            size={18}
            strokeWidth={2}
          />
          <span className="text-secondary text-sm leading-snug">
            {item.label}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

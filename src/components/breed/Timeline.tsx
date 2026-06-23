"use client";

import { motion } from "framer-motion";

export function Timeline({ items }: { items: { year: string; event: string }[] }) {
  return (
    <ol className="relative flex flex-col gap-5 border-l border-border pl-6">
      {items.map((item, i) => (
        <motion.li
          key={item.year + item.event}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="relative"
        >
          <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full gradient-ember ring-4 ring-[var(--bg)]" />
          <p className="font-display text-sm font-semibold text-amber">{item.year}</p>
          <p className="text-sm text-muted">{item.event}</p>
        </motion.li>
      ))}
    </ol>
  );
}

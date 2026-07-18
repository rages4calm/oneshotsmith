"use client";

import { useCallback, useRef } from "react";

// Torch-over-the-map: a warm light radius follows the pointer across the
// blue map, like reading it by lantern light. Pure enhancement — no layout
// role, hidden for reduced motion, inert on touch (hover-gated in CSS).

export function MapLantern({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--lx", `${clientX - rect.left}px`);
      el.style.setProperty("--ly", `${clientY - rect.top}px`);
    });
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} className={`lantern-surface ${className ?? ""}`}>
      {children}
      <div className="lantern-glow" aria-hidden="true" />
    </div>
  );
}

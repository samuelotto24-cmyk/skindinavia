"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type MagneticOptions = {
  radius?: number;
  strength?: number;
};

export function useMagneticHover<T extends HTMLElement>(options: MagneticOptions = {}) {
  const ref = useRef<T>(null);
  const { radius = 50, strength = 0.3 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    function handleMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      if (dist < radius) {
        xTo(distX * strength);
        yTo(distY * strength);
      }
    }

    function handleMouseLeave() {
      xTo(0);
      yTo(0);
    }

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [radius, strength]);

  return ref;
}

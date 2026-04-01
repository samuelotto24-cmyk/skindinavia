"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type TiltOptions = {
  maxRotation?: number;
  perspective?: number;
  scale?: number;
};

export function use3DTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const { maxRotation = 8, perspective = 800, scale = 1.02 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rotateXTo = gsap.quickTo(el, "rotateX", { duration: 0.4, ease: "power2.out" });
    const rotateYTo = gsap.quickTo(el, "rotateY", { duration: 0.4, ease: "power2.out" });
    gsap.set(el, { transformPerspective: perspective });

    function handleMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rotateYTo((x - 0.5) * maxRotation * 2);
      rotateXTo((0.5 - y) * maxRotation * 2);
    }

    function handleMouseEnter() {
      gsap.to(el, { scale, duration: 0.3, ease: "power2.out" });
    }

    function handleMouseLeave() {
      rotateXTo(0);
      rotateYTo(0);
      gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out" });
    }

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxRotation, perspective, scale]);

  return ref;
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // negative = slower than scroll, positive = faster
  className?: string;
}

export function ParallaxImage({ src, alt, speed = -30, className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain drop-shadow-lg"
        />
      </motion.div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ProductLineup() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Link href="/shop" className="block group overflow-hidden">
        <Image
          src="/product-lineup.png"
          alt="The complete Skindinavia collection"
          width={1920}
          height={480}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="100vw"
        />
      </Link>
    </motion.div>
  );
}

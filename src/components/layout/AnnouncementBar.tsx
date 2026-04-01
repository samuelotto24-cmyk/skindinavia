"use client";

import { useState, useEffect } from "react";
import { promoMessages } from "@/lib/mock-data";

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % promoMessages.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white text-center py-2 px-4">
      <p
        className={`text-xs tracking-wide transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {promoMessages[index]}
      </p>
    </div>
  );
}

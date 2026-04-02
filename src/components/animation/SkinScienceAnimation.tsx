"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

const STAGE_DURATION = 4;

export function SkinScienceAnimation({ activeStage }: { activeStage: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Kill previous timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const svg = svgRef.current;
    const tl = gsap.timeline({ repeat: -1 });
    timelineRef.current = tl;

    // Reset all elements
    gsap.set(svg.querySelectorAll(".droplet"), { opacity: 0, y: 0 });
    gsap.set(svg.querySelectorAll(".sphere"), { opacity: 0, scale: 0 });
    gsap.set(svg.querySelectorAll(".shield-bar"), { scaleX: 0, opacity: 0 });
    gsap.set(svg.querySelectorAll(".temp-indicator"), { opacity: 0 });
    gsap.set(svg.querySelectorAll(".cool-wave"), { opacity: 0, scaleX: 0 });
    gsap.set(svg.querySelector(".spray-cone"), { opacity: 0, scaleY: 0 });
    gsap.set(svg.querySelector(".glow-ring"), { opacity: 0, scale: 0.5 });

    if (activeStage === 0) {
      // MIST — spray cone appears, droplets fall and spread
      tl.to(svg.querySelector(".spray-cone"), {
        opacity: 0.6, scaleY: 1, duration: 0.5, transformOrigin: "top center", ease: "power2.out"
      })
      .to(svg.querySelectorAll(".droplet"), {
        opacity: 1, stagger: { each: 0.12, from: "random" }, duration: 0.3
      }, 0.2)
      .to(svg.querySelectorAll(".droplet"), {
        y: "+=30", stagger: { each: 0.12, from: "random" }, duration: 1.5, ease: "power1.in"
      }, 0.3)
      .to(svg.querySelectorAll(".droplet"), {
        opacity: 0, stagger: { each: 0.08, from: "random" }, duration: 0.6
      }, 2.0)
      .to(svg.querySelector(".spray-cone"), {
        opacity: 0, duration: 0.5
      }, 2.5)
      .to({}, { duration: 0.5 }); // pause before loop

    } else if (activeStage === 1) {
      // COOL — spheres appear on skin surface, cool waves pulse, temp drops
      tl.to(svg.querySelectorAll(".sphere"), {
        opacity: 1, scale: 1, stagger: 0.15, duration: 0.6,
        transformOrigin: "center center", ease: "back.out(1.7)"
      })
      .to(svg.querySelectorAll(".temp-indicator"), {
        opacity: 1, duration: 0.4
      }, 0.3)
      .to(svg.querySelectorAll(".cool-wave"), {
        opacity: 0.5, scaleX: 1, stagger: 0.3, duration: 0.8,
        transformOrigin: "center center", ease: "power2.out"
      }, 0.5)
      .to(svg.querySelectorAll(".sphere"), {
        y: "-=3", repeat: 3, yoyo: true, duration: 0.5, ease: "sine.inOut"
      }, 1.0)
      .to(svg.querySelectorAll(".cool-wave"), {
        opacity: 0, scaleX: 1.3, duration: 0.8, stagger: 0.2
      }, 2.5)
      .to(svg.querySelectorAll(".sphere"), { opacity: 0, duration: 0.5 }, 3.0)
      .to(svg.querySelectorAll(".temp-indicator"), { opacity: 0, duration: 0.3 }, 3.0)
      .to({}, { duration: 0.3 });

    } else {
      // LOCK — shield forms over skin, glow ring pulses
      tl.to(svg.querySelectorAll(".shield-bar"), {
        scaleX: 1, opacity: 1, stagger: 0.1, duration: 0.6,
        transformOrigin: "center center", ease: "power3.out"
      })
      .to(svg.querySelector(".glow-ring"), {
        opacity: 0.4, scale: 1, duration: 0.8,
        transformOrigin: "center center", ease: "power2.out"
      }, 0.3)
      .to(svg.querySelector(".glow-ring"), {
        scale: 1.05, opacity: 0.6, repeat: 2, yoyo: true, duration: 1, ease: "sine.inOut"
      }, 1.2)
      .to(svg.querySelectorAll(".shield-bar"), {
        opacity: 0.8, repeat: 1, yoyo: true, duration: 0.6
      }, 1.5)
      .to(svg.querySelector(".glow-ring"), { opacity: 0, scale: 0.9, duration: 0.6 }, 3.0)
      .to(svg.querySelectorAll(".shield-bar"), { opacity: 0, duration: 0.5 }, 3.2)
      .to({}, { duration: 0.3 });
    }

    return () => {
      tl.kill();
    };
  }, [activeStage]);

  const stageColors = [
    { primary: "#38bdf8", secondary: "#7dd3fc", glow: "#0ea5e9" },  // sky
    { primary: "#818cf8", secondary: "#a5b4fc", glow: "#6366f1" },  // indigo
    { primary: "#a78bfa", secondary: "#c4b5fd", glow: "#8b5cf6" },  // violet
  ];

  const c = stageColors[activeStage];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Soft glow */}
        <filter id="softglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Radial gradient for spray cone */}
        <radialGradient id="sprayGrad" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.4" />
          <stop offset="100%" stopColor={c.primary} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0" />
          <stop offset="50%" stopColor={c.primary} stopOpacity="0.6" />
          <stop offset="100%" stopColor={c.primary} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ═══ SKIN LAYERS ═══ */}
      {/* Epidermis (top skin layer) */}
      <path
        d="M 40 260 Q 100 250, 200 255 Q 300 260, 360 255"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2"
        fill="none"
      />
      {/* Dermis (deeper layer) */}
      <path
        d="M 40 285 Q 100 278, 200 282 Q 300 286, 360 280"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Skin texture lines */}
      {[80, 130, 180, 230, 280, 330].map((x, i) => (
        <line
          key={`skin-${i}`}
          x1={x} y1={252 + Math.sin(i) * 4}
          x2={x} y2={288 + Math.sin(i) * 3}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {/* Skin label */}
      <text x="370" y="270" fill="rgba(255,255,255,0.15)" fontSize="8" fontFamily="sans-serif">skin</text>

      {/* ═══ MAKEUP LAYER ═══ */}
      <path
        d="M 60 248 Q 130 242, 200 245 Q 270 248, 340 244"
        stroke="rgba(255,200,180,0.25)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <text x="350" y="248" fill="rgba(255,200,180,0.2)" fontSize="7" fontFamily="sans-serif">makeup</text>

      {/* ═══ NOZZLE ═══ */}
      <rect x="190" y="80" width="20" height="35" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="195" y="75" width="10" height="10" rx="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="200" cy="118" r="2" fill={c.primary} opacity="0.6" />

      {/* ═══ SPRAY CONE ═══ */}
      <path
        className="spray-cone"
        d="M 195 120 L 140 230 Q 200 240, 260 230 L 205 120 Z"
        fill="url(#sprayGrad)"
        opacity="0"
      />

      {/* ═══ DROPLETS (Mist stage) ═══ */}
      {[
        { cx: 150, cy: 160 }, { cx: 175, cy: 145 }, { cx: 200, cy: 140 },
        { cx: 225, cy: 148 }, { cx: 250, cy: 158 }, { cx: 165, cy: 180 },
        { cx: 200, cy: 175 }, { cx: 235, cy: 182 }, { cx: 185, cy: 200 },
        { cx: 215, cy: 195 }, { cx: 155, cy: 210 }, { cx: 245, cy: 205 },
      ].map((pos, i) => (
        <ellipse
          key={`drop-${i}`}
          className="droplet"
          cx={pos.cx}
          cy={pos.cy}
          rx="2.5"
          ry="3.5"
          fill={c.secondary}
          opacity="0"
          filter="url(#glow)"
        />
      ))}

      {/* ═══ COOLING SPHERES (Cool stage) ═══ */}
      {[
        { cx: 100, cy: 248 }, { cx: 150, cy: 244 }, { cx: 200, cy: 246 },
        { cx: 250, cy: 244 }, { cx: 300, cy: 248 },
      ].map((pos, i) => (
        <g key={`sphere-${i}`} className="sphere" opacity="0">
          <circle cx={pos.cx} cy={pos.cy} r="8" fill={c.glow} opacity="0.15" filter="url(#softglow)" />
          <circle cx={pos.cx} cy={pos.cy} r="5" fill="none" stroke={c.primary} strokeWidth="1.5" />
          <circle cx={pos.cx} cy={pos.cy} r="2" fill={c.secondary} />
        </g>
      ))}

      {/* ═══ COOL WAVES ═══ */}
      {[240, 235, 230].map((y, i) => (
        <ellipse
          key={`wave-${i}`}
          className="cool-wave"
          cx="200"
          cy={y}
          rx={120 + i * 15}
          ry={4 + i * 2}
          fill="none"
          stroke={c.primary}
          strokeWidth="1"
          opacity="0"
        />
      ))}

      {/* ═══ TEMPERATURE INDICATOR ═══ */}
      <g className="temp-indicator" opacity="0">
        <text x="55" y="240" fill={c.secondary} fontSize="9" fontFamily="sans-serif" fontWeight="300">
          cooling...
        </text>
        {/* Mini thermometer */}
        <rect x="42" y="232" width="3" height="12" rx="1.5" fill="rgba(255,255,255,0.1)" />
        <rect x="42" y="238" width="3" height="6" rx="1.5" fill={c.primary} opacity="0.6" />
      </g>

      {/* ═══ SHIELD BARS (Lock stage) ═══ */}
      {[0, 1, 2].map((i) => (
        <rect
          key={`shield-${i}`}
          className="shield-bar"
          x="70"
          y={236 + i * 5}
          width="260"
          height="2"
          rx="1"
          fill="url(#shieldGrad)"
          opacity="0"
        />
      ))}

      {/* ═══ GLOW RING (Lock stage) ═══ */}
      <ellipse
        className="glow-ring"
        cx="200"
        cy="245"
        rx="150"
        ry="20"
        fill="none"
        stroke={c.primary}
        strokeWidth="2"
        opacity="0"
        filter="url(#softglow)"
      />

      {/* ═══ TIME INDICATOR ═══ */}
      <text x="200" y="340" textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize="48" fontFamily="serif">
        {activeStage === 0 ? "MIST" : activeStage === 1 ? "COOL" : "LOCK"}
      </text>
    </svg>
  );
}

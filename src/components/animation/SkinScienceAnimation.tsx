"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export function SkinScienceAnimation({ activeStage }: { activeStage: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    if (tlRef.current) tlRef.current.kill();

    const svg = svgRef.current;
    const tl = gsap.timeline({ repeat: -1 });
    tlRef.current = tl;

    // Reset everything
    gsap.set(svg.querySelectorAll(".mist-drop"), { opacity: 0, y: 0, scale: 0 });
    gsap.set(svg.querySelector(".spray-cone"), { opacity: 0, scaleY: 0 });
    gsap.set(svg.querySelectorAll(".spray-line"), { opacity: 0, scaleY: 0 });
    gsap.set(svg.querySelectorAll(".sphere-group"), { opacity: 0, scale: 0 });
    gsap.set(svg.querySelectorAll(".cool-ring"), { opacity: 0, scale: 0 });
    gsap.set(svg.querySelectorAll(".cool-particle"), { opacity: 0 });
    gsap.set(svg.querySelector(".temp-bar-fill"), { scaleY: 1 });
    gsap.set(svg.querySelector(".temp-group"), { opacity: 0 });
    gsap.set(svg.querySelectorAll(".shield-segment"), { opacity: 0, scaleX: 0 });
    gsap.set(svg.querySelector(".shield-glow"), { opacity: 0 });
    gsap.set(svg.querySelectorAll(".lock-particle"), { opacity: 0, scale: 0 });
    gsap.set(svg.querySelector(".nozzle-glow"), { opacity: 0 });

    if (activeStage === 0) {
      // ═══ MIST ═══
      // Nozzle activates
      tl.to(svg.querySelector(".nozzle-glow"), {
        opacity: 0.8, duration: 0.3, ease: "power2.out"
      })
      // Spray cone appears
      .to(svg.querySelector(".spray-cone"), {
        opacity: 0.5, scaleY: 1, duration: 0.6, transformOrigin: "top center", ease: "power2.out"
      }, 0.1)
      // Spray lines fan out
      .to(svg.querySelectorAll(".spray-line"), {
        opacity: 0.3, scaleY: 1, stagger: 0.05, duration: 0.4, transformOrigin: "top center"
      }, 0.2)
      // Droplets appear and fall in waves
      .to(svg.querySelectorAll(".mist-drop-wave1"), {
        opacity: 1, scale: 1, stagger: { each: 0.06, from: "center" }, duration: 0.3
      }, 0.4)
      .to(svg.querySelectorAll(".mist-drop-wave1"), {
        y: "+=45", stagger: { each: 0.06, from: "center" }, duration: 1.8, ease: "power1.in"
      }, 0.5)
      .to(svg.querySelectorAll(".mist-drop-wave2"), {
        opacity: 1, scale: 1, stagger: { each: 0.05, from: "edges" }, duration: 0.3
      }, 0.8)
      .to(svg.querySelectorAll(".mist-drop-wave2"), {
        y: "+=50", stagger: { each: 0.05, from: "edges" }, duration: 1.6, ease: "power1.in"
      }, 0.9)
      .to(svg.querySelectorAll(".mist-drop-wave3"), {
        opacity: 0.7, scale: 0.8, stagger: 0.04, duration: 0.3
      }, 1.2)
      .to(svg.querySelectorAll(".mist-drop-wave3"), {
        y: "+=40", stagger: 0.04, duration: 1.4, ease: "power1.in"
      }, 1.3)
      // Fade out
      .to(svg.querySelectorAll(".mist-drop"), { opacity: 0, duration: 0.5 }, 2.8)
      .to(svg.querySelector(".spray-cone"), { opacity: 0, duration: 0.4 }, 2.8)
      .to(svg.querySelectorAll(".spray-line"), { opacity: 0, duration: 0.3 }, 2.8)
      .to(svg.querySelector(".nozzle-glow"), { opacity: 0, duration: 0.3 }, 3.0)
      .to({}, { duration: 0.5 });

    } else if (activeStage === 1) {
      // ═══ COOL ═══
      // Spheres land on skin with bounce
      tl.to(svg.querySelectorAll(".sphere-group"), {
        opacity: 1, scale: 1, stagger: 0.12, duration: 0.5,
        transformOrigin: "center center", ease: "back.out(2)"
      })
      // Cooling rings radiate outward from each sphere
      .to(svg.querySelectorAll(".cool-ring"), {
        opacity: 0.4, scale: 1, stagger: 0.08, duration: 0.6,
        transformOrigin: "center center", ease: "power2.out"
      }, 0.4)
      .to(svg.querySelectorAll(".cool-ring"), {
        scale: 1.8, opacity: 0, stagger: 0.08, duration: 1.2, ease: "power1.out"
      }, 0.8)
      // Sphere inner cores pulse
      .to(svg.querySelectorAll(".sphere-core"), {
        scale: 1.3, repeat: 3, yoyo: true, duration: 0.4, ease: "sine.inOut",
        transformOrigin: "center center"
      }, 0.6)
      // Temperature drops
      .to(svg.querySelector(".temp-group"), { opacity: 1, duration: 0.3 }, 0.3)
      .to(svg.querySelector(".temp-bar-fill"), {
        scaleY: 0.3, duration: 2, transformOrigin: "bottom center", ease: "power2.inOut"
      }, 0.5)
      // Cool particles drift upward
      .to(svg.querySelectorAll(".cool-particle"), {
        opacity: 0.6, stagger: 0.15, duration: 0.3
      }, 1.0)
      .to(svg.querySelectorAll(".cool-particle"), {
        y: "-=20", opacity: 0, stagger: 0.15, duration: 1.5, ease: "power1.out"
      }, 1.2)
      // Fade out
      .to(svg.querySelectorAll(".sphere-group"), { opacity: 0, duration: 0.4 }, 3.0)
      .to(svg.querySelector(".temp-group"), { opacity: 0, duration: 0.3 }, 3.0)
      .to({}, { duration: 0.4 });

    } else {
      // ═══ LOCK ═══
      // Shield segments build across skin
      tl.to(svg.querySelectorAll(".shield-segment"), {
        opacity: 1, scaleX: 1, stagger: 0.08, duration: 0.5,
        transformOrigin: "center center", ease: "power3.out"
      })
      // Shield glow intensifies
      .to(svg.querySelector(".shield-glow"), {
        opacity: 0.6, duration: 0.8, ease: "power2.out"
      }, 0.3)
      // Lock particles burst outward
      .to(svg.querySelectorAll(".lock-particle"), {
        opacity: 1, scale: 1, stagger: 0.05, duration: 0.3,
        transformOrigin: "center center"
      }, 0.6)
      .to(svg.querySelectorAll(".lock-particle"), {
        y: "-=15", x: (i: number) => (i % 2 === 0 ? "+=10" : "-=10"),
        opacity: 0, stagger: 0.05, duration: 1.2, ease: "power1.out"
      }, 0.8)
      // Shield pulses
      .to(svg.querySelectorAll(".shield-segment"), {
        opacity: 0.6, repeat: 2, yoyo: true, duration: 0.5, stagger: 0.05
      }, 1.5)
      .to(svg.querySelector(".shield-glow"), {
        opacity: 0.3, repeat: 2, yoyo: true, duration: 0.6
      }, 1.5)
      // Fade out
      .to(svg.querySelectorAll(".shield-segment"), { opacity: 0, duration: 0.5 }, 3.0)
      .to(svg.querySelector(".shield-glow"), { opacity: 0, duration: 0.5 }, 3.0)
      .to({}, { duration: 0.4 });
    }

    return () => { tl.kill(); };
  }, [activeStage]);

  const colors = [
    { pri: "#38bdf8", sec: "#7dd3fc", glow: "#0ea5e9", bg: "#0c4a6e" },
    { pri: "#818cf8", sec: "#a5b4fc", glow: "#6366f1", bg: "#312e81" },
    { pri: "#a78bfa", sec: "#c4b5fd", glow: "#8b5cf6", bg: "#4c1d95" },
  ];
  const c = colors[activeStage];

  return (
    <svg ref={svgRef} viewBox="0 0 500 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow-sm"><feGaussianBlur stdDeviation="3" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="glow-md"><feGaussianBlur stdDeviation="6" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="glow-lg"><feGaussianBlur stdDeviation="12" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <radialGradient id="sprayG" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor={c.pri} stopOpacity="0.35" />
          <stop offset="100%" stopColor={c.pri} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shieldG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c.pri} stopOpacity="0" />
          <stop offset="30%" stopColor={c.pri} stopOpacity="0.5" />
          <stop offset="70%" stopColor={c.pri} stopOpacity="0.5" />
          <stop offset="100%" stopColor={c.pri} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fcd9b6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c48a5a" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* ═══ BACKGROUND ELEMENTS ═══ */}
      {/* Ambient glow */}
      <circle cx="250" cy="300" r="180" fill={c.pri} opacity="0.03" filter="url(#glow-lg)" />

      {/* ═══ SKIN CROSS-SECTION ═══ */}
      {/* Subcutaneous layer */}
      <path d="M 30 370 Q 130 365, 250 368 Q 370 371, 470 366" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="30" />
      {/* Dermis */}
      <path d="M 30 340 Q 130 332, 250 336 Q 370 340, 470 334" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
      {/* Epidermis (main skin surface) */}
      <path d="M 30 315 Q 100 308, 170 311 Q 250 314, 330 310 Q 400 307, 470 312" fill="none" stroke="rgba(255,220,200,0.2)" strokeWidth="4" />
      {/* Skin texture — pores */}
      {[90, 140, 200, 260, 320, 380, 430].map((x, i) => (
        <g key={`pore-${i}`}>
          <circle cx={x} cy={310 + Math.sin(i * 1.2) * 3} r="1.5" fill="rgba(255,220,200,0.08)" />
          <line x1={x} y1={313 + Math.sin(i * 1.2) * 3} x2={x} y2={340 + Math.sin(i) * 4} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </g>
      ))}
      {/* Skin fill */}
      <path d="M 30 315 Q 100 308, 170 311 Q 250 314, 330 310 Q 400 307, 470 312 L 470 380 L 30 380 Z" fill="url(#skinGrad)" />

      {/* ═══ MAKEUP LAYER ═══ */}
      <path d="M 60 305 Q 130 298, 200 301 Q 280 304, 350 300 Q 420 297, 440 302" stroke="rgba(255,180,160,0.35)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Makeup texture dots */}
      {[80, 120, 160, 200, 240, 280, 320, 360, 400].map((x, i) => (
        <circle key={`mu-${i}`} cx={x} cy={301 + Math.sin(i * 0.8) * 3} r="1" fill="rgba(255,180,160,0.2)" />
      ))}

      {/* Labels */}
      <text x="475" y="305" fill="rgba(255,200,180,0.15)" fontSize="8" fontFamily="sans-serif" fontStyle="italic">makeup</text>
      <text x="475" y="318" fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="sans-serif" fontStyle="italic">epidermis</text>
      <text x="475" y="345" fill="rgba(255,255,255,0.06)" fontSize="7" fontFamily="sans-serif" fontStyle="italic">dermis</text>

      {/* ═══ NOZZLE (detailed) ═══ */}
      {/* Bottle body hint */}
      <rect x="225" y="40" width="50" height="60" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Nozzle neck */}
      <rect x="238" y="95" width="24" height="20" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Nozzle tip */}
      <rect x="244" y="112" width="12" height="8" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      {/* Nozzle opening */}
      <circle cx="250" cy="122" r="3" fill={c.pri} opacity="0.3" />
      {/* Nozzle glow */}
      <circle className="nozzle-glow" cx="250" cy="122" r="8" fill={c.pri} opacity="0" filter="url(#glow-md)" />
      {/* Bottle label line */}
      <line x1="235" y1="65" x2="265" y2="65" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="240" y1="72" x2="260" y2="72" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

      {/* ═══ SPRAY CONE ═══ */}
      <path className="spray-cone" d="M 244 125 L 160 285 Q 250 295, 340 285 L 256 125 Z" fill="url(#sprayG)" opacity="0" />
      {/* Spray directional lines */}
      {[-40, -25, -10, 10, 25, 40].map((offset, i) => (
        <line key={`sl-${i}`} className="spray-line" x1="250" y1="125" x2={250 + offset * 2.2} y2="290" stroke={c.pri} strokeWidth="0.5" opacity="0" strokeDasharray="4 6" />
      ))}

      {/* ═══ MIST DROPLETS (3 waves) ═══ */}
      {/* Wave 1 — center cluster */}
      {[
        {cx:220, cy:160}, {cx:250, cy:150}, {cx:280, cy:158}, {cx:235, cy:175}, {cx:265, cy:170},
      ].map((p, i) => (
        <ellipse key={`w1-${i}`} className="mist-drop mist-drop-wave1" cx={p.cx} cy={p.cy} rx="3" ry="4.5" fill={c.sec} opacity="0" filter="url(#glow-sm)" />
      ))}
      {/* Wave 2 — wider spread */}
      {[
        {cx:180, cy:190}, {cx:210, cy:200}, {cx:250, cy:195}, {cx:290, cy:198}, {cx:320, cy:188},
        {cx:195, cy:215}, {cx:250, cy:210}, {cx:305, cy:212},
      ].map((p, i) => (
        <ellipse key={`w2-${i}`} className="mist-drop mist-drop-wave2" cx={p.cx} cy={p.cy} rx="2.5" ry="4" fill={c.sec} opacity="0" filter="url(#glow-sm)" />
      ))}
      {/* Wave 3 — finest mist */}
      {[
        {cx:170, cy:235}, {cx:200, cy:240}, {cx:230, cy:238}, {cx:260, cy:242},
        {cx:290, cy:237}, {cx:320, cy:240}, {cx:340, cy:232},
      ].map((p, i) => (
        <circle key={`w3-${i}`} className="mist-drop mist-drop-wave3" cx={p.cx} cy={p.cy} r="1.5" fill={c.sec} opacity="0" />
      ))}

      {/* ═══ COOLING SPHERES (detailed) ═══ */}
      {[
        {cx:120, cy:305}, {cx:190, cy:301}, {cx:250, cy:303},
        {cx:310, cy:300}, {cx:380, cy:304},
      ].map((p, i) => (
        <g key={`sp-${i}`} className="sphere-group" opacity="0">
          {/* Outer glow */}
          <circle cx={p.cx} cy={p.cy} r="18" fill={c.glow} opacity="0.1" filter="url(#glow-md)" />
          {/* Membrane ring */}
          <circle cx={p.cx} cy={p.cy} r="11" fill="none" stroke={c.pri} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />
          {/* Inner shell */}
          <circle cx={p.cx} cy={p.cy} r="7" fill="none" stroke={c.sec} strokeWidth="1" opacity="0.6" />
          {/* Active core */}
          <circle className="sphere-core" cx={p.cx} cy={p.cy} r="3.5" fill={c.pri} opacity="0.8" />
          {/* Highlight */}
          <circle cx={p.cx - 2} cy={p.cy - 2} r="1.5" fill="white" opacity="0.3" />
          {/* Cooling ring (radiates outward) */}
          <circle className="cool-ring" cx={p.cx} cy={p.cy} r="14" fill="none" stroke={c.sec} strokeWidth="1" opacity="0" />
        </g>
      ))}

      {/* Cool particles (rising from skin) */}
      {[150, 210, 270, 330, 390].map((x, i) => (
        <g key={`cp-${i}`} className="cool-particle" opacity="0">
          <circle cx={x} cy={295} r="1" fill={c.sec} />
          <line x1={x} y1={292} x2={x} y2={288} stroke={c.sec} strokeWidth="0.5" opacity="0.5" />
        </g>
      ))}

      {/* Temperature indicator */}
      <g className="temp-group" opacity="0">
        {/* Thermometer body */}
        <rect x="52" y="270" width="8" height="40" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        {/* Mercury/fill */}
        <rect className="temp-bar-fill" x="54" y="272" width="4" height="36" rx="2" fill={c.pri} opacity="0.7" />
        {/* Bulb */}
        <circle cx="56" cy="314" r="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <circle cx="56" cy="314" r="3" fill={c.pri} opacity="0.5" />
        {/* Label */}
        <text x="42" y="265" fill={c.sec} fontSize="8" fontFamily="sans-serif" textAnchor="middle" opacity="0.7">
          cooling
        </text>
        {/* Tick marks */}
        <line x1="62" y1="278" x2="66" y2="278" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line x1="62" y1="290" x2="66" y2="290" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line x1="62" y1="302" x2="66" y2="302" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      </g>

      {/* ═══ SHIELD (Lock stage) ═══ */}
      {/* Shield segments */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`sh-${i}`} className="shield-segment" x="70" y={292 + i * 4} width="360" height="2.5" rx="1.25" fill="url(#shieldG)" opacity="0" />
      ))}
      {/* Shield glow */}
      <ellipse className="shield-glow" cx="250" cy="302" rx="190" ry="25" fill={c.glow} opacity="0" filter="url(#glow-lg)" />
      {/* Lock particles */}
      {[120, 170, 220, 270, 320, 370].map((x, i) => (
        <circle key={`lp-${i}`} className="lock-particle" cx={x} cy={300} r="2" fill={c.sec} opacity="0" filter="url(#glow-sm)" />
      ))}

      {/* ═══ STAGE WATERMARK ═══ */}
      <text x="250" y="440" textAnchor="middle" fill="rgba(255,255,255,0.04)" fontSize="60" fontFamily="serif" fontWeight="300" letterSpacing="15">
        {activeStage === 0 ? "MIST" : activeStage === 1 ? "COOL" : "LOCK"}
      </text>
    </svg>
  );
}

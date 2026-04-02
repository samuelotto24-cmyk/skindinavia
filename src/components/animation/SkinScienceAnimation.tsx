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

    // ── RESET ALL ──
    const resetSelectors = [
      ".mist-particle", ".spray-cloud", ".spray-stream",
      ".sphere-unit", ".cool-ripple", ".energy-line", ".temp-gauge",
      ".hex-cell", ".seal-wave", ".lock-flash", ".shield-membrane",
    ];
    resetSelectors.forEach((sel) => {
      const els = svg.querySelectorAll(sel);
      if (els.length) gsap.set(els, { opacity: 0, scale: 0, y: 0, x: 0 });
    });
    gsap.set(svg.querySelectorAll(".nozzle-pulse"), { opacity: 0, scale: 0.5 });
    gsap.set(svg.querySelectorAll(".temp-fill"), { scaleY: 1 });
    gsap.set(svg.querySelectorAll(".cool-gradient-overlay"), { opacity: 0 });

    if (activeStage === 0) {
      // ════════════════ MIST ════════════════
      // Nozzle activates with expanding pulse
      tl.to(svg.querySelectorAll(".nozzle-pulse"), {
        opacity: 0.7, scale: 1, duration: 0.4, stagger: 0.1,
        transformOrigin: "center center", ease: "power2.out"
      })
      .to(svg.querySelectorAll(".nozzle-pulse"), {
        scale: 1.5, opacity: 0, duration: 0.6, stagger: 0.1,
        transformOrigin: "center center"
      }, 0.3)
      // Spray streams fan out
      .to(svg.querySelectorAll(".spray-stream"), {
        opacity: 1, scaleY: 1, stagger: 0.03, duration: 0.5,
        transformOrigin: "top center", ease: "power2.out"
      }, 0.2)
      // Cloud builds
      .to(svg.querySelectorAll(".spray-cloud"), {
        opacity: 1, scale: 1, stagger: 0.08, duration: 0.6,
        transformOrigin: "center center", ease: "power1.out"
      }, 0.4)
      // Particles stream downward — large ones first
      .to(svg.querySelectorAll(".mist-lg"), {
        opacity: 1, scale: 1, stagger: { each: 0.04, from: "random" }, duration: 0.3
      }, 0.5)
      .to(svg.querySelectorAll(".mist-lg"), {
        y: "+=55", stagger: { each: 0.04, from: "random" }, duration: 2, ease: "power1.in"
      }, 0.6)
      // Medium particles
      .to(svg.querySelectorAll(".mist-md"), {
        opacity: 0.8, scale: 1, stagger: { each: 0.03, from: "random" }, duration: 0.25
      }, 0.8)
      .to(svg.querySelectorAll(".mist-md"), {
        y: "+=45", x: (i: number) => `+=${Math.sin(i * 1.5) * 12}`,
        stagger: { each: 0.03, from: "random" }, duration: 1.8, ease: "power1.in"
      }, 0.9)
      // Tiny particles — finest mist, most drift
      .to(svg.querySelectorAll(".mist-sm"), {
        opacity: 0.5, scale: 1, stagger: 0.02, duration: 0.2
      }, 1.1)
      .to(svg.querySelectorAll(".mist-sm"), {
        y: "+=35", x: (i: number) => `+=${Math.cos(i * 2) * 18}`,
        stagger: 0.02, duration: 1.5, ease: "none"
      }, 1.2)
      // Everything settles and fades
      .to(svg.querySelectorAll(".mist-particle"), {
        opacity: 0, duration: 0.6, stagger: { each: 0.02, from: "random" }
      }, 2.8)
      .to(svg.querySelectorAll(".spray-cloud"), { opacity: 0, scale: 0.8, duration: 0.5 }, 2.8)
      .to(svg.querySelectorAll(".spray-stream"), { opacity: 0, duration: 0.4 }, 3.0)
      .to({}, { duration: 0.3 });

    } else if (activeStage === 1) {
      // ════════════════ COOL ════════════════
      // Spheres materialize on skin surface with bounce
      tl.to(svg.querySelectorAll(".sphere-unit"), {
        opacity: 1, scale: 1, stagger: 0.1, duration: 0.6,
        transformOrigin: "center center", ease: "back.out(2.5)"
      })
      // Ripples emanate from each sphere
      .to(svg.querySelectorAll(".cool-ripple"), {
        opacity: 0.5, scale: 1, stagger: 0.06, duration: 0.5,
        transformOrigin: "center center", ease: "power2.out"
      }, 0.4)
      .to(svg.querySelectorAll(".cool-ripple"), {
        scale: 2.2, opacity: 0, stagger: 0.06, duration: 1.5,
        transformOrigin: "center center", ease: "power1.out"
      }, 0.7)
      // Energy lines connect spheres
      .to(svg.querySelectorAll(".energy-line"), {
        opacity: 0.4, scaleX: 1, stagger: 0.1, duration: 0.5,
        transformOrigin: "left center", ease: "power2.out"
      }, 0.8)
      .to(svg.querySelectorAll(".energy-line"), {
        opacity: 0.15, repeat: 2, yoyo: true, duration: 0.6
      }, 1.5)
      // Temperature gauge appears and drops
      .to(svg.querySelector(".temp-gauge"), { opacity: 1, scale: 1, duration: 0.4, transformOrigin: "center center" }, 0.3)
      .to(svg.querySelector(".temp-fill"), {
        scaleY: 0.2, duration: 2.2, transformOrigin: "bottom center", ease: "power2.inOut"
      }, 0.5)
      // Cool gradient washes over skin
      .to(svg.querySelector(".cool-gradient-overlay"), {
        opacity: 0.25, duration: 1.5, ease: "power2.inOut"
      }, 1.0)
      // Sphere cores pulse
      .to(svg.querySelectorAll(".sphere-core-inner"), {
        scale: 1.4, repeat: 4, yoyo: true, duration: 0.35, ease: "sine.inOut",
        transformOrigin: "center center", stagger: 0.08
      }, 0.8)
      // Fade out
      .to(svg.querySelectorAll(".sphere-unit"), { opacity: 0, duration: 0.5 }, 3.2)
      .to(svg.querySelectorAll(".energy-line"), { opacity: 0, duration: 0.4 }, 3.2)
      .to(svg.querySelector(".temp-gauge"), { opacity: 0, duration: 0.3 }, 3.2)
      .to(svg.querySelector(".cool-gradient-overlay"), { opacity: 0, duration: 0.4 }, 3.2)
      .to({}, { duration: 0.3 });

    } else {
      // ════════════════ LOCK ════════════════
      // Hexagonal shield cells build across surface
      tl.to(svg.querySelectorAll(".hex-cell"), {
        opacity: 1, scale: 1, stagger: { each: 0.04, from: "center" }, duration: 0.4,
        transformOrigin: "center center", ease: "back.out(1.5)"
      })
      // Shield membrane solidifies
      .to(svg.querySelector(".shield-membrane"), {
        opacity: 0.5, scaleX: 1, duration: 0.8,
        transformOrigin: "center center", ease: "power3.out"
      }, 0.3)
      // Seal wave sweeps across
      .to(svg.querySelectorAll(".seal-wave"), {
        opacity: 0.6, x: "+=400", duration: 1.2, stagger: 0.15,
        ease: "power2.inOut"
      }, 0.5)
      .to(svg.querySelectorAll(".seal-wave"), {
        opacity: 0, duration: 0.4
      }, 1.8)
      // Lock flash
      .to(svg.querySelectorAll(".lock-flash"), {
        opacity: 1, scale: 1.2, stagger: 0.03, duration: 0.15,
        transformOrigin: "center center"
      }, 1.0)
      .to(svg.querySelectorAll(".lock-flash"), {
        opacity: 0, scale: 0.8, stagger: 0.03, duration: 0.8
      }, 1.3)
      // Hex cells pulse in unison
      .to(svg.querySelectorAll(".hex-cell"), {
        opacity: 0.7, repeat: 2, yoyo: true, duration: 0.5,
        stagger: { each: 0.02, from: "center" }
      }, 1.8)
      // Shield membrane breathes
      .to(svg.querySelector(".shield-membrane"), {
        opacity: 0.3, repeat: 1, yoyo: true, duration: 0.7
      }, 2.0)
      // Fade out
      .to(svg.querySelectorAll(".hex-cell"), { opacity: 0, scale: 0.9, duration: 0.5, stagger: { each: 0.02, from: "edges" } }, 3.2)
      .to(svg.querySelector(".shield-membrane"), { opacity: 0, duration: 0.4 }, 3.3)
      .to({}, { duration: 0.3 });
    }

    return () => { tl.kill(); };
  }, [activeStage]);

  const palettes = [
    { pri: "#38bdf8", sec: "#7dd3fc", glow: "#0ea5e9", dim: "#0c4a6e" },
    { pri: "#818cf8", sec: "#a5b4fc", glow: "#6366f1", dim: "#312e81" },
    { pri: "#a78bfa", sec: "#c4b5fd", glow: "#8b5cf6", dim: "#4c1d95" },
  ];
  const c = palettes[activeStage];

  // Generate hex grid positions for lock stage
  const hexPositions: { x: number; y: number }[] = [];
  const hexR = 16;
  for (let row = 0; row < 3; row++) {
    const count = row === 1 ? 11 : 10;
    const startX = row === 1 ? 55 : 65;
    for (let col = 0; col < count; col++) {
      hexPositions.push({
        x: startX + col * (hexR * 2 * 0.88),
        y: 290 + row * (hexR * 1.6),
      });
    }
  }

  return (
    <svg ref={svgRef} viewBox="0 0 500 480" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="g1"><feGaussianBlur stdDeviation="2" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="g2"><feGaussianBlur stdDeviation="5" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="g3"><feGaussianBlur stdDeviation="10" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="g4"><feGaussianBlur stdDeviation="15" /></filter>
        <radialGradient id="sprayG" cx="50%" cy="0%" r="90%">
          <stop offset="0%" stopColor={c.pri} stopOpacity="0.3" />
          <stop offset="60%" stopColor={c.pri} stopOpacity="0.08" />
          <stop offset="100%" stopColor={c.pri} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shieldLG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c.pri} stopOpacity="0" />
          <stop offset="20%" stopColor={c.pri} stopOpacity="0.3" />
          <stop offset="80%" stopColor={c.pri} stopOpacity="0.3" />
          <stop offset="100%" stopColor={c.pri} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="skinG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5cba7" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#d4a574" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#8b6f47" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="coolOverG" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.pri} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c.pri} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ═══════════ AMBIENT BACKGROUND ═══════════ */}
      <circle cx="250" cy="310" r="200" fill={c.pri} opacity="0.02" filter="url(#g4)" />

      {/* ═══════════ SKIN CROSS-SECTION ═══════════ */}
      {/* Deep subcutaneous */}
      <path d="M 0 395 Q 125 388, 250 392 Q 375 396, 500 390" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="40" />
      {/* Dermis with collagen fiber hints */}
      <path d="M 0 360 Q 125 350, 250 354 Q 375 358, 500 352" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="25" />
      {/* Collagen fibers in dermis */}
      {[60, 120, 180, 250, 320, 390, 440].map((x, i) => (
        <path key={`col-${i}`} d={`M ${x} ${348 + Math.sin(i) * 3} Q ${x + 15} ${355 + Math.cos(i) * 4}, ${x + 30} ${350 + Math.sin(i * 1.3) * 3}`} fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1.5" />
      ))}
      {/* Epidermis — main skin surface */}
      <path d="M 0 325 Q 60 318, 125 321 Q 190 324, 250 320 Q 310 316, 375 319 Q 440 322, 500 318" fill="none" stroke="rgba(255,220,195,0.25)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Skin cell texture */}
      {Array.from({ length: 16 }).map((_, i) => {
        const x = 30 + i * 28;
        const yBase = 320 + Math.sin(i * 0.7) * 3;
        return (
          <g key={`cell-${i}`} opacity={0.04 + (i % 3) * 0.01}>
            <ellipse cx={x} cy={yBase + 12} rx="10" ry="8" fill="none" stroke="rgba(255,220,195,0.15)" strokeWidth="0.5" />
          </g>
        );
      })}
      {/* Pores */}
      {[70, 150, 230, 310, 400].map((x, i) => (
        <g key={`pore-${i}`}>
          <circle cx={x} cy={318 + Math.sin(i * 1.4) * 3} r="2" fill="rgba(255,220,195,0.06)" />
          <line x1={x} y1={321 + Math.sin(i * 1.4) * 3} x2={x} y2={345 + Math.sin(i) * 3} stroke="rgba(255,255,255,0.02)" strokeWidth="0.8" />
        </g>
      ))}
      {/* Skin body fill */}
      <path d="M 0 325 Q 60 318, 125 321 Q 190 324, 250 320 Q 310 316, 375 319 Q 440 322, 500 318 L 500 420 L 0 420 Z" fill="url(#skinG)" />
      {/* Cool stage overlay on skin */}
      <path className="cool-gradient-overlay" d="M 0 310 Q 250 300, 500 310 L 500 350 L 0 350 Z" fill="url(#coolOverG)" opacity="0" />

      {/* ═══════════ MAKEUP LAYER ═══════════ */}
      <path d="M 40 312 Q 100 306, 170 309 Q 250 312, 330 308 Q 400 305, 460 310" stroke="rgba(255,170,150,0.35)" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Makeup pigment dots */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 55 + i * 30;
        return <circle key={`pig-${i}`} cx={x} cy={309 + Math.sin(i * 0.9) * 3} r={0.8 + (i % 3) * 0.3} fill="rgba(255,170,150,0.25)" />;
      })}

      {/* Labels */}
      <text x="480" y="312" fill="rgba(255,190,170,0.12)" fontSize="7" fontFamily="sans-serif" fontStyle="italic" textAnchor="end">makeup</text>
      <text x="480" y="326" fill="rgba(255,255,255,0.08)" fontSize="7" fontFamily="sans-serif" fontStyle="italic" textAnchor="end">epidermis</text>
      <text x="480" y="358" fill="rgba(255,255,255,0.05)" fontSize="6.5" fontFamily="sans-serif" fontStyle="italic" textAnchor="end">dermis</text>

      {/* ═══════════ SPRAY BOTTLE (realistic silhouette) ═══════════ */}
      {/* Bottle body — tapered cylinder shape */}
      <path
        d="M 228 95 L 225 50 Q 225 35, 235 32 L 265 32 Q 275 35, 275 50 L 272 95 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      {/* Bottle base — wider bottom */}
      <path
        d="M 225 90 Q 225 98, 230 100 L 270 100 Q 275 98, 275 90"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.8"
      />
      {/* Label band */}
      <rect x="231" y="52" width="38" height="28" rx="2" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
      <line x1="237" y1="61" x2="263" y2="61" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      <line x1="240" y1="67" x2="260" y2="67" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <line x1="243" y1="73" x2="257" y2="73" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4" />
      {/* Cap/overcap — the part you press */}
      <path
        d="M 240 32 L 240 18 Q 240 12, 245 12 L 255 12 Q 260 12, 260 18 L 260 32"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="0.8"
      />
      {/* Finger grip ridges on cap */}
      <line x1="242" y1="16" x2="258" y2="16" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      <line x1="242" y1="19" x2="258" y2="19" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      <line x1="242" y1="22" x2="258" y2="22" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
      {/* Neck ring where cap meets bottle */}
      <rect x="238" y="30" width="24" height="5" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
      {/* Spray nozzle — extends from the side of the cap */}
      <path
        d="M 260 20 L 275 20 Q 280 20, 280 24 L 280 28 Q 280 30, 276 30 L 265 30"
        fill="rgba(255,255,255,0.1)"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="0.8"
      />
      {/* Nozzle tip opening */}
      <circle cx="278" cy="25" r="2" fill={c.pri} opacity="0.3" />
      {/* Spray tube inside bottle (dashed, barely visible) */}
      <line x1="250" y1="35" x2="250" y2="92" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 4" />
      {/* Bottle highlight/reflection */}
      <line x1="233" y1="40" x2="233" y2="88" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nozzle activation pulses */}
      <circle className="nozzle-pulse" cx="278" cy="25" r="6" fill={c.pri} opacity="0" filter="url(#g2)" />
      <circle className="nozzle-pulse" cx="278" cy="25" r="12" fill={c.pri} opacity="0" filter="url(#g2)" />

      {/* ═══════════ SPRAY STREAMS ═══════════ */}
      {[-30, -18, -8, 0, 8, 18, 30].map((offset, i) => (
        <line
          key={`str-${i}`}
          className="spray-stream"
          x1="278" y1="30"
          x2={250 + offset * 2} y2="295"
          stroke={c.pri}
          strokeWidth={i === 3 ? "0.8" : "0.4"}
          opacity="0"
          strokeDasharray={i % 2 === 0 ? "3 8" : "5 6"}
        />
      ))}

      {/* ═══════════ SPRAY CLOUDS ═══════════ */}
      {[
        { cx: 220, cy: 140, r: 28 }, { cx: 260, cy: 130, r: 32 }, { cx: 300, cy: 145, r: 26 },
        { cx: 230, cy: 180, r: 35 }, { cx: 275, cy: 175, r: 30 },
      ].map((cl, i) => (
        <ellipse key={`cloud-${i}`} className="spray-cloud" cx={cl.cx} cy={cl.cy} rx={cl.r} ry={cl.r * 0.6} fill={c.pri} opacity="0" filter="url(#g3)" />
      ))}

      {/* ═══════════ MIST PARTICLES ═══════════ */}
      {/* Large droplets */}
      {[
        {cx:210,cy:155},{cx:235,cy:148},{cx:250,cy:142},{cx:265,cy:150},{cx:290,cy:156},
        {cx:220,cy:172},{cx:250,cy:168},{cx:280,cy:174},
      ].map((p, i) => (
        <ellipse key={`lg-${i}`} className="mist-particle mist-lg" cx={p.cx} cy={p.cy} rx="3.5" ry="5" fill={c.sec} opacity="0" filter="url(#g1)" />
      ))}
      {/* Medium particles */}
      {[
        {cx:175,cy:188},{cx:200,cy:195},{cx:225,cy:190},{cx:250,cy:192},
        {cx:275,cy:188},{cx:300,cy:194},{cx:325,cy:190},
        {cx:190,cy:215},{cx:220,cy:210},{cx:255,cy:212},{cx:285,cy:208},{cx:310,cy:215},
      ].map((p, i) => (
        <ellipse key={`md-${i}`} className="mist-particle mist-md" cx={p.cx} cy={p.cy} rx="2.5" ry="3.5" fill={c.sec} opacity="0" filter="url(#g1)" />
      ))}
      {/* Tiny particles */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI;
        const spread = 60 + i * 5;
        return (
          <circle
            key={`sm-${i}`}
            className="mist-particle mist-sm"
            cx={250 + Math.cos(angle) * spread * 0.7 - 20 + Math.random() * 40}
            cy={230 + Math.sin(angle) * 20 + i * 2.5}
            r={1 + (i % 3) * 0.4}
            fill={c.sec}
            opacity="0"
          />
        );
      })}

      {/* ═══════════ COOLING SPHERES ═══════════ */}
      {[
        { cx: 100, cy: 314 }, { cx: 170, cy: 310 }, { cx: 250, cy: 312 },
        { cx: 330, cy: 309 }, { cx: 400, cy: 313 },
      ].map((p, i) => (
        <g key={`su-${i}`} className="sphere-unit" opacity="0">
          {/* Ambient glow */}
          <circle cx={p.cx} cy={p.cy} r="24" fill={c.glow} opacity="0.08" filter="url(#g3)" />
          {/* Outer membrane — dashed rotating feel */}
          <circle cx={p.cx} cy={p.cy} r="14" fill="none" stroke={c.pri} strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
          {/* Inner shell */}
          <circle cx={p.cx} cy={p.cy} r="9" fill="none" stroke={c.sec} strokeWidth="0.8" opacity="0.5" />
          {/* Active core */}
          <circle className="sphere-core-inner" cx={p.cx} cy={p.cy} r="5" fill={c.glow} opacity="0.6" filter="url(#g1)" />
          {/* Bright center */}
          <circle cx={p.cx} cy={p.cy} r="2.5" fill={c.pri} opacity="0.9" />
          {/* Highlight */}
          <circle cx={p.cx - 3} cy={p.cy - 3} r="1.5" fill="white" opacity="0.4" />
          {/* Ripple ring */}
          <circle className="cool-ripple" cx={p.cx} cy={p.cy} r="16" fill="none" stroke={c.sec} strokeWidth="1.5" opacity="0" />
        </g>
      ))}

      {/* Energy connection lines between spheres */}
      {[
        { x1: 114, y1: 314, x2: 156, y2: 310 },
        { x1: 184, y1: 310, x2: 236, y2: 312 },
        { x1: 264, y1: 312, x2: 316, y2: 309 },
        { x1: 344, y1: 309, x2: 386, y2: 313 },
      ].map((l, i) => (
        <line key={`el-${i}`} className="energy-line" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={c.pri} strokeWidth="1" strokeDasharray="2 4" opacity="0" />
      ))}

      {/* Temperature gauge */}
      <g className="temp-gauge" opacity="0">
        <rect x="38" y="275" width="10" height="50" rx="5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        <rect className="temp-fill" x="40" y="277" width="6" height="46" rx="3" fill={c.pri} opacity="0.6" />
        <circle cx="43" cy="330" r="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <circle cx="43" cy="330" r="4" fill={c.pri} opacity="0.4" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`tick-${i}`} x1="50" y1={280 + i * 10} x2="54" y2={280 + i * 10} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        ))}
        <text x="43" y="268" fill={c.sec} fontSize="7.5" fontFamily="sans-serif" textAnchor="middle" opacity="0.6">
          cooling
        </text>
      </g>

      {/* ═══════════ HEXAGONAL SHIELD ═══════════ */}
      {hexPositions.map((pos, i) => (
        <polygon
          key={`hex-${i}`}
          className="hex-cell"
          points={hexPoints(pos.x, pos.y, hexR * 0.85)}
          fill="none"
          stroke={c.pri}
          strokeWidth="0.8"
          opacity="0"
        />
      ))}

      {/* Shield membrane */}
      <rect className="shield-membrane" x="40" y="298" width="420" height="30" rx="4" fill="url(#shieldLG)" opacity="0" />

      {/* Seal waves (sweep left to right) */}
      {[0, 1, 2].map((i) => (
        <rect key={`sw-${i}`} className="seal-wave" x={-30} y={300 + i * 8} width="30" height="3" rx="1.5" fill={c.sec} opacity="0" filter="url(#g1)" />
      ))}

      {/* Lock flash particles */}
      {hexPositions.filter((_, i) => i % 3 === 0).map((pos, i) => (
        <circle key={`lf-${i}`} className="lock-flash" cx={pos.x} cy={pos.y} r="3" fill={c.sec} opacity="0" filter="url(#g2)" />
      ))}

      {/* ═══════════ STAGE LABEL ═══════════ */}
      <text x="250" y="460" textAnchor="middle" fill={c.pri} opacity="0.12" fontSize="72" fontFamily="serif" fontWeight="600" letterSpacing="24">
        {activeStage === 0 ? "MIST" : activeStage === 1 ? "COOL" : "LOCK"}
      </text>
      {/* Glow behind text */}
      <text x="250" y="460" textAnchor="middle" fill={c.pri} opacity="0.06" fontSize="72" fontFamily="serif" fontWeight="600" letterSpacing="24" filter="url(#g3)">
        {activeStage === 0 ? "MIST" : activeStage === 1 ? "COOL" : "LOCK"}
      </text>
    </svg>
  );
}

/** Generate hexagon polygon points string */
function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
}

// ── Product Types ──────────────────────────────────────────────
export type ProductSize = {
  label: string;
  oz: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: "finishing-sprays" | "primer-sprays" | "kits" | "individual" | "bulk-kits";
  categoryLabel: string;
  description: string;
  longDescription: string;
  howToUse: string;
  ingredients: string;
  sizes: ProductSize[];
  defaultPrice: number;
  badge?: string;
  accentColor: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  features: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
};

export type Artist = {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  specialty: string;
  socialLinks: { platform: string; url: string }[];
  accentColor: string;
  image: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
};

// ── Products ───────────────────────────────────────────────────
export const products: Product[] = [
  {
    id: "1",
    slug: "the-makeup-finishing-spray",
    name: "The Makeup Finishing Spray",
    shortName: "Original Setting Spray",
    category: "finishing-sprays",
    categoryLabel: "Finishing Sprays",
    description:
      "The original formula that started it all. Locks in your makeup for 16+ hours with our patented Temperature Control Technology.",
    longDescription:
      "Skindinavia's original Makeup Finishing Spray uses our patented cooling technology to lower the temperature of makeup, fusing it to skin for up to 16 hours. Developed for professional makeup artists working on set, this formula has been trusted since 2005 by Broadway performers, Hollywood artists, and everyday beauty lovers who demand all-day wear.\n\nOil-free, paraben-free, cruelty-free, and vegan. Dermatologist tested. Won't clog pores or cause breakouts.",
    howToUse:
      "Hold bottle 10-12 inches from your face. Close your eyes and mist in an X and T motion. Allow 30-60 seconds to dry. Your makeup is now locked in for up to 16 hours.",
    ingredients:
      "Water, Isododecane, Cyclopentasiloxane, Alcohol Denat., Dimethicone, Polysilicone-11, VP/VA Copolymer, Caprylyl Glycol",
    sizes: [
      { label: "Travel", oz: "1 oz", price: 15 },
      { label: "Regular", oz: "4 oz", price: 29 },
      { label: "Pro", oz: "8 oz", price: 45 },
    ],
    defaultPrice: 29,
    accentColor: "#3B82F6",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/MFS-4oz__93457.1681396511.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/MFS-4oz__93457.1681396511.570.570.png"],
    rating: 4.8,
    reviewCount: 1247,
    features: [
      "16+ hour wear",
      "Patented cooling technology",
      "Oil-free formula",
      "Cruelty-free & vegan",
    ],
  },
  {
    id: "2",
    slug: "the-makeup-finishing-spray-bridal",
    name: "The Makeup Finishing Spray — Bridal",
    shortName: "Bridal Setting Spray",
    category: "finishing-sprays",
    categoryLabel: "Finishing Sprays",
    description:
      "Our #1 bestseller. Engineered for the most important day of your life — cry-proof, sweat-proof, photo-proof.",
    longDescription:
      "The Bridal Makeup Finishing Spray was specifically developed for the demands of wedding day wear. From the ceremony to the last dance, this formula ensures your makeup stays flawless through tears of joy, summer heat, camera flashes, and endless hugs.\n\nTrusted by professional bridal makeup artists worldwide and featured in Brides, Martha Stewart Weddings, and The Knot.",
    howToUse:
      "Apply after completing your makeup look. Hold bottle 10-12 inches away and mist in an X and T motion. For maximum wear on your wedding day, apply 2-3 light coats, allowing 60 seconds of dry time between each coat.",
    ingredients:
      "Water, Isododecane, Cyclopentasiloxane, Alcohol Denat., Dimethicone, Polysilicone-11, VP/VA Copolymer, Caprylyl Glycol, Tocopheryl Acetate",
    sizes: [
      { label: "Travel", oz: "1 oz", price: 15 },
      { label: "Regular", oz: "4 oz", price: 29 },
      { label: "Pro", oz: "8 oz", price: 45 },
    ],
    defaultPrice: 29,
    badge: "Bestseller",
    accentColor: "#EC4899",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/11/MFSBridal-4oz__49822.1681396994.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/11/MFSBridal-4oz__49822.1681396994.570.570.png"],
    rating: 4.9,
    reviewCount: 2156,
    features: [
      "Cry-proof & sweat-proof",
      "Photo-ready finish",
      "24+ hour bridal wear",
      "Cruelty-free & vegan",
    ],
  },
  {
    id: "3",
    slug: "the-makeup-finishing-spray-oil-control",
    name: "The Makeup Finishing Spray — Oil Control",
    shortName: "Oil Control Setting Spray",
    category: "finishing-sprays",
    categoryLabel: "Finishing Sprays",
    description:
      "Matte finish that controls shine and oil all day. Perfect for oily and combination skin types.",
    longDescription:
      "Our Oil Control Makeup Finishing Spray combines the power of our patented setting technology with advanced oil-absorbing ingredients. This formula keeps shine at bay while locking in your makeup for up to 16 hours.\n\nIdeal for oily and combination skin types who struggle with midday shine and makeup breakdown.",
    howToUse:
      "Hold bottle 10-12 inches from your face. Close your eyes and mist in an X and T motion. Allow 30-60 seconds to dry. Reapply midday for extra oil control if needed.",
    ingredients:
      "Water, Isododecane, Cyclopentasiloxane, Alcohol Denat., Dimethicone, Silica, Polysilicone-11, VP/VA Copolymer, Caprylyl Glycol",
    sizes: [
      { label: "Travel", oz: "1 oz", price: 15 },
      { label: "Regular", oz: "4 oz", price: 29 },
      { label: "Pro", oz: "8 oz", price: 45 },
    ],
    defaultPrice: 29,
    accentColor: "#10B981",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/MFSOil-4oz__12722.1681400833.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/MFSOil-4oz__12722.1681400833.570.570.png"],
    rating: 4.7,
    reviewCount: 892,
    features: [
      "Controls oil & shine",
      "Matte finish",
      "16+ hour wear",
      "Won't clog pores",
    ],
  },
  {
    id: "4",
    slug: "the-makeup-primer-spray",
    name: "The Makeup Primer Spray",
    shortName: "Primer Spray",
    category: "primer-sprays",
    categoryLabel: "Primer Sprays",
    description:
      "Prep your skin in seconds. This weightless primer spray creates the perfect canvas for smooth, even makeup application.",
    longDescription:
      "Skip the heavy creams. The Makeup Primer Spray delivers a weightless, invisible base that helps your makeup apply more smoothly and last longer. Simply mist and go — no rubbing, no waiting.\n\nPerfect as a standalone primer or paired with our Finishing Sprays for the ultimate prep-and-set routine.",
    howToUse:
      "After skincare, hold bottle 10-12 inches from face and mist evenly. Allow 60 seconds to dry, then apply makeup as usual. For best results, follow with a Skindinavia Finishing Spray.",
    ingredients:
      "Water, Cyclopentasiloxane, Dimethicone, Isododecane, Polysilicone-11, Caprylyl Glycol, Tocopheryl Acetate",
    sizes: [
      { label: "Regular", oz: "4 oz", price: 35 },
      { label: "Pro", oz: "8 oz", price: 55 },
    ],
    defaultPrice: 35,
    accentColor: "#8B5CF6",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/Primer-4oz__94106.1681398713.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/Primer-4oz__94106.1681398713.570.570.png"],
    rating: 4.6,
    reviewCount: 534,
    features: [
      "Weightless formula",
      "No rubbing required",
      "Smooths skin texture",
      "Extends makeup wear",
    ],
  },
  {
    id: "5",
    slug: "the-makeup-primer-spray-oil-control",
    name: "The Makeup Primer Spray — Oil Control",
    shortName: "Oil Control Primer Spray",
    category: "primer-sprays",
    categoryLabel: "Primer Sprays",
    description:
      "Oil-absorbing primer that mattifies and preps in one step. Ideal for oily and combination skin.",
    longDescription:
      "Combining the ease of our spray primer with advanced oil-control technology, this primer preps skin while keeping excess oil at bay from the start. Lightweight and invisible, it creates a matte canvas that helps your makeup go on smoother and last all day without shine.\n\nPair with our Oil Control Finishing Spray for the ultimate matte routine.",
    howToUse:
      "After skincare, hold bottle 10-12 inches from face and mist evenly. Allow 60 seconds to dry, then apply makeup as usual.",
    ingredients:
      "Water, Cyclopentasiloxane, Dimethicone, Silica, Isododecane, Polysilicone-11, Caprylyl Glycol",
    sizes: [
      { label: "Regular", oz: "4 oz", price: 35 },
      { label: "Pro", oz: "8 oz", price: 55 },
    ],
    defaultPrice: 35,
    accentColor: "#14B8A6",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/PrepSetKitOil-4oz__71375.1681400000.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/PrepSetKitOil-4oz__71375.1681400000.570.570.png"],
    rating: 4.6,
    reviewCount: 318,
    features: [
      "Mattifying formula",
      "Absorbs excess oil",
      "Spray-on convenience",
      "Extends matte wear",
    ],
  },
  {
    id: "6",
    slug: "prep-and-set-kit",
    name: "Prep and Set Kit",
    shortName: "Prep & Set Kit",
    category: "kits",
    categoryLabel: "Kits",
    description:
      "The complete routine — our Primer Spray + Finishing Spray bundled together at a value price.",
    longDescription:
      "Get the complete Skindinavia experience. This kit pairs our bestselling Makeup Primer Spray with the original Makeup Finishing Spray for the ultimate prep-and-set routine. Save when you buy the bundle.\n\nIncludes:\n- The Makeup Primer Spray (4 oz)\n- The Makeup Finishing Spray (4 oz)",
    howToUse:
      "Step 1: Mist the Primer Spray on clean, moisturized skin. Allow 60 seconds to dry. Step 2: Apply makeup. Step 3: Lock it all in with the Finishing Spray in an X and T motion.",
    ingredients: "See individual products for full ingredient lists.",
    sizes: [{ label: "Standard Kit", oz: "2 × 4 oz", price: 50 }],
    defaultPrice: 50,
    badge: "Best Value",
    accentColor: "#F59E0B",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/Prep_Set_4oz_front__45711.1623870869.570.570.jpg",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/Prep_Set_4oz_front__45711.1623870869.570.570.jpg"],
    rating: 4.8,
    reviewCount: 673,
    features: [
      "Primer + Setting Spray",
      "Save vs. buying separately",
      "Complete routine",
      "Gift-ready packaging",
    ],
  },
  {
    id: "7",
    slug: "prep-and-set-kit-oil-control",
    name: "Prep and Set Kit — Oil Control",
    shortName: "Oil Control Kit",
    category: "kits",
    categoryLabel: "Kits",
    description:
      "The oil-free duo — Oil Control Primer + Oil Control Finishing Spray for all-day matte perfection.",
    longDescription:
      "Everything you need for a shine-free day in one kit. Pairs our Oil Control Primer Spray with the Oil Control Finishing Spray for maximum matte performance.\n\nIncludes:\n- The Makeup Primer Spray — Oil Control (4 oz)\n- The Makeup Finishing Spray — Oil Control (4 oz)",
    howToUse:
      "Step 1: Mist the Oil Control Primer Spray on clean skin. Wait 60 seconds. Step 2: Apply makeup. Step 3: Finish with the Oil Control Finishing Spray.",
    ingredients: "See individual products for full ingredient lists.",
    sizes: [{ label: "Standard Kit", oz: "2 × 4 oz", price: 50 }],
    defaultPrice: 50,
    accentColor: "#22C55E",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/PrepSetKitOil-4oz__71375.1681400000.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/PrepSetKitOil-4oz__71375.1681400000.570.570.png"],
    rating: 4.7,
    reviewCount: 412,
    features: [
      "Oil Control duo",
      "All-day matte finish",
      "Bundle savings",
      "For oily/combo skin",
    ],
  },
  {
    id: "8",
    slug: "prep-set-and-remove",
    name: "Prep, Set and Remove",
    shortName: "Full Routine Kit",
    category: "kits",
    categoryLabel: "Kits",
    description:
      "The full three-step system — Primer, Finishing Spray, and Makeup Remover Spray all in one box.",
    longDescription:
      "The ultimate Skindinavia experience. This kit includes everything you need for a complete makeup routine — from prep to set to clean removal at the end of the day.\n\nIncludes:\n- The Makeup Primer Spray (4 oz)\n- The Makeup Finishing Spray (4 oz)\n- The Makeup Remover Spray (4 oz)",
    howToUse:
      "Step 1: Prep with Primer Spray. Step 2: Apply makeup. Step 3: Set with Finishing Spray. Step 4: At the end of the day, remove with Remover Spray.",
    ingredients: "See individual products for full ingredient lists.",
    sizes: [{ label: "Full Kit", oz: "3 × 4 oz", price: 65 }],
    defaultPrice: 65,
    accentColor: "#EF4444",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2017/01/kit__66659.1706023513.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2017/01/kit__66659.1706023513.570.570.png"],
    rating: 4.9,
    reviewCount: 289,
    features: [
      "3-step system",
      "Primer + Set + Remove",
      "Best overall value",
      "Gift-ready packaging",
    ],
  },
  {
    id: "9",
    slug: "the-makeup-remover-spray",
    name: "The Makeup Remover Spray",
    shortName: "Remover Spray",
    category: "individual",
    categoryLabel: "Individual",
    description:
      "Effortless, eco-friendly makeup removal. Just spray, wipe, done — no cotton pads needed.",
    longDescription:
      "Say goodbye to wasteful cotton pads and harsh wipes. The Makeup Remover Spray dissolves makeup on contact with a gentle, eco-friendly mist. Simply spray onto a reusable cloth and wipe clean.\n\nGently removes all makeup including waterproof mascara and long-wear lipstick without tugging or irritation.",
    howToUse:
      "Spray directly onto face or onto a reusable cloth. Gently wipe to remove makeup. Follow with your regular cleanser. No rinsing required.",
    ingredients:
      "Water, Poloxamer 184, Isododecane, Cyclopentasiloxane, Glycerin, Caprylyl Glycol, Tocopheryl Acetate",
    sizes: [
      { label: "Regular", oz: "4 oz", price: 29 },
      { label: "Pro", oz: "8 oz", price: 45 },
    ],
    defaultPrice: 29,
    accentColor: "#06B6D4",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2019/09/Remover_4oz_front__97154.1613750224.570.570.jpg",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2019/09/Remover_4oz_front__97154.1613750224.570.570.jpg"],
    rating: 4.5,
    reviewCount: 267,
    features: [
      "Eco-friendly removal",
      "No cotton pads needed",
      "Removes waterproof makeup",
      "Gentle on skin",
    ],
  },
  {
    id: "10",
    slug: "skindinavia-bulk-kit",
    name: "Skindinavia Bulk Kit",
    shortName: "Bulk Kit",
    category: "bulk-kits",
    categoryLabel: "Bulk Kits",
    description:
      "Buy in bulk and save big. Perfect for makeup artists, studios, and bridal teams.",
    longDescription:
      "Designed for professionals who go through product fast. Our bulk kits offer significant savings on our most popular formulas. Ideal for makeup artist kits, studios, salons, and bridal teams.\n\nContact us for custom bulk orders and wholesale pricing.",
    howToUse: "See individual products for usage instructions.",
    ingredients: "See individual products for full ingredient lists.",
    sizes: [
      { label: "5-Pack", oz: "5 × 4 oz", price: 120 },
      { label: "10-Pack", oz: "10 × 4 oz", price: 220 },
    ],
    defaultPrice: 120,
    badge: "Pro Savings",
    accentColor: "#6366F1",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2025/07/bottles-image.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2025/07/bottles-image.png"],
    rating: 4.9,
    reviewCount: 156,
    features: [
      "Bulk discount pricing",
      "For professionals",
      "Mix & match formulas",
      "Free shipping on bulk",
    ],
  },
];

// ── Reviews ────────────────────────────────────────────────────
export const reviews: Review[] = [
  {
    id: "r1",
    author: "Sarah M.",
    rating: 5,
    title: "My wedding photos look FLAWLESS",
    body: "I used the Bridal formula on my wedding day in August — outdoor ceremony in 95° heat. My makeup looked exactly the same in our sunset photos as it did when I left the salon that morning. Worth every penny.",
    date: "2025-09-14",
    verified: true,
  },
  {
    id: "r2",
    author: "Jessica L.",
    rating: 5,
    title: "A must-have for any makeup artist",
    body: "I'm a professional MUA and I've been using Skindinavia on all my clients for 8 years. Nothing else comes close. My Broadway performers trust it under hot stage lights every night.",
    date: "2025-11-02",
    verified: true,
  },
  {
    id: "r3",
    author: "Amanda K.",
    rating: 5,
    title: "16 hour wear is NOT an exaggeration",
    body: "I work 12-hour shifts as a nurse and my makeup still looks great at the end of my shift. I've tried every setting spray on the market and nothing compares to Skindinavia.",
    date: "2025-08-20",
    verified: true,
  },
  {
    id: "r4",
    author: "Priya R.",
    rating: 4,
    title: "Finally found my oil-control hero",
    body: "The oil control formula changed my life. My T-zone used to be a slip-and-slide by noon but now my makeup stays matte all day. Only reason for 4 stars is I wish it came in a smaller travel size.",
    date: "2025-10-05",
    verified: true,
  },
  {
    id: "r5",
    author: "Danielle W.",
    rating: 5,
    title: "Cry-proof is accurate",
    body: "I'm a happy crier — weddings, movies, commercials — you name it. This stuff does NOT budge. I sobbed through my sister's vows and my makeup was still perfect.",
    date: "2025-12-18",
    verified: true,
  },
  {
    id: "r6",
    author: "Megan T.",
    rating: 5,
    title: "The remover spray is underrated",
    body: "Everyone talks about the setting sprays but the remover is incredible. No more wasteful cotton pads! Just spray, wipe with a cloth, done. My skin feels so clean after.",
    date: "2026-01-09",
    verified: true,
  },
  {
    id: "r7",
    author: "Carlos R.",
    rating: 5,
    title: "Perfect for film sets",
    body: "I do SFX makeup for indie films. Skindinavia keeps prosthetics and makeup locked in for 14+ hour shoot days. The actors love that it feels cooling on application.",
    date: "2025-07-22",
    verified: true,
  },
  {
    id: "r8",
    author: "Olivia N.",
    rating: 5,
    title: "Prep and Set Kit is the move",
    body: "Bought the kit on a whim and now I can't do my makeup without both steps. The primer smooths everything out and the setting spray locks it in. Game changer combo.",
    date: "2026-02-14",
    verified: true,
  },
];

// ── Artists ─────────────────────────────────────────────────────
export const artists: Artist[] = [
  {
    id: "a1",
    slug: "kim-weber",
    name: "Kim Weber",
    title: "Celebrity & Bridal Makeup Artist",
    bio: "With over 15 years in the industry, Kim has done makeup for A-list red carpet events, destination weddings across 30+ countries, and editorial shoots for Vogue and Harper's Bazaar. She's been a Skindinavia ambassador since 2012.",
    specialty: "Bridal & Red Carpet",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
    accentColor: "#EC4899",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/11/0acef074e933-Laura_and_Vanessa_Marano__Vince_Trupsin_Photoshoot_2015__03.jpg",
  },
  {
    id: "a2",
    slug: "marcus-allen",
    name: "Marcus Allen",
    title: "Broadway & Theatre MUA",
    bio: "Marcus has been the lead makeup artist for 12 Broadway productions including Hamilton, Wicked, and The Lion King. His work demands products that can withstand intense stage lighting and 8-show weeks.",
    specialty: "Theatre & Stage",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "TikTok", url: "#" },
    ],
    accentColor: "#8B5CF6",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/07/Joe-Dulude-II-Headshot.jpg",
  },
  {
    id: "a3",
    slug: "yuki-tanaka",
    name: "Yuki Tanaka",
    title: "SFX & Film Makeup Artist",
    bio: "Yuki specializes in special effects and prosthetic makeup for film and television. Her credits include work on major horror franchises and sci-fi series. She relies on Skindinavia to keep complex makeup intact during long shoot days.",
    specialty: "SFX & Film",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "Website", url: "#" },
    ],
    accentColor: "#EF4444",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/stephanieflor_219981810_245110693873959_8014344367409139541_n.jpg",
  },
  {
    id: "a4",
    slug: "tanya-brooks",
    name: "Tanya Brooks",
    title: "Editorial & Fashion MUA",
    bio: "Tanya's work has been featured in Elle, Cosmopolitan, and W Magazine. She brings a bold, creative approach to beauty editorial and fashion week backstage. Known for pushing boundaries while keeping looks camera-ready.",
    specialty: "Editorial & Fashion",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "Pinterest", url: "#" },
    ],
    accentColor: "#F59E0B",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/07/desireefalconmakeup_93029885_122693182710121_7053791904777010338_n.jpg",
  },
];

// ── Case Studies ───────────────────────────────────────────────
export const caseStudies: CaseStudy[] = [
  {
    id: "cs1",
    slug: "makeup-under-masks",
    title: "Makeup Under Masks",
    excerpt:
      "How healthcare workers and performers kept their makeup intact under face masks and PPE using Skindinavia's long-wear technology.",
    category: "Professional",
  },
  {
    id: "cs2",
    slug: "broadway-under-lights",
    title: "Broadway Under the Lights",
    excerpt:
      "A deep dive into how Broadway's top MUAs use Skindinavia to keep performers looking flawless through 8-show weeks under intense stage lighting.",
    category: "Theatre",
  },
  {
    id: "cs3",
    slug: "destination-wedding-heat",
    title: "Destination Wedding in the Heat",
    excerpt:
      "Real results from bridal makeup artists using the Bridal formula for tropical destination weddings in 100°F+ temperatures.",
    category: "Bridal",
  },
  {
    id: "cs4",
    slug: "sfx-makeup-longevity",
    title: "SFX Makeup Longevity on Set",
    excerpt:
      "How film makeup departments use Skindinavia to maintain prosthetics and special effects makeup during 14+ hour shoot days.",
    category: "Film & SFX",
  },
];

// ── Blog Posts ──────────────────────────────────────────────────
export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "how-setting-spray-actually-works",
    title: "How Setting Spray Actually Works: The Science Behind 16-Hour Wear",
    excerpt:
      "Ever wonder why some setting sprays work and others don't? We break down the patented cooling technology that makes Skindinavia different.",
    date: "2026-03-15",
    author: "Skindinavia Team",
    category: "Science",
  },
  {
    id: "b2",
    slug: "bridal-makeup-timeline",
    title: "The Ultimate Bridal Makeup Timeline: From Prep to 'I Do'",
    excerpt:
      "A step-by-step guide for brides and MUAs on when to start makeup, which products to layer, and how to ensure all-day wear.",
    date: "2026-03-01",
    author: "Kim Weber",
    category: "Bridal",
  },
  {
    id: "b3",
    slug: "oily-skin-summer-guide",
    title: "The Oily Skin Summer Survival Guide",
    excerpt:
      "Don't let summer heat and humidity melt your makeup. Our top tips for keeping oily skin matte and makeup-locked from pool party to dinner date.",
    date: "2026-02-18",
    author: "Skindinavia Team",
    category: "Tips",
  },
  {
    id: "b4",
    slug: "setting-spray-mistakes",
    title: "5 Setting Spray Mistakes You're Probably Making",
    excerpt:
      "Holding the bottle too close? Applying too much? Here are the most common setting spray mistakes and how to fix them for better results.",
    date: "2026-02-05",
    author: "Tanya Brooks",
    category: "Tips",
  },
];

// ── Press ───────────────────────────────────────────────────────
export const pressLogos = [
  "Vogue",
  "Allure",
  "Glamour",
  "Byrdie",
  "PopSugar",
  "Marie Claire",
  "People",
  "Teen Vogue",
  "Shape",
  "Essence",
  "Nylon",
  "Brides",
  "HuffPost",
  "Refinery29",
  "Elite Daily",
  "US Weekly",
  "Self",
  "Martha Stewart",
  "In Touch",
  "New Beauty",
];

// ── Promo Messages ──────────────────────────────────────────────
export const promoMessages = [
  "FREE SHIPPING on all orders over $40",
  "NEW: The Prep, Set & Remove Kit — Save 20%",
  "Trusted by 5,000+ five-star reviewers since 2005",
  "SPRING SALE: 15% off all Finishing Sprays — Use code SPRING15",
];

// ── FAQ ─────────────────────────────────────────────────────────
export const faqs = [
  {
    question: "How long does Skindinavia setting spray last?",
    answer:
      "Our setting sprays are formulated to keep your makeup locked in for 16+ hours. The Bridal formula can provide up to 24 hours of wear for your wedding day.",
  },
  {
    question: "Is Skindinavia cruelty-free?",
    answer:
      "Yes! All Skindinavia products are 100% cruelty-free, vegan, paraben-free, and oil-free. We never test on animals.",
  },
  {
    question: "What's the difference between the Original and Bridal formula?",
    answer:
      "The Bridal formula is our most long-wearing option, specifically engineered for extreme conditions — tears, sweat, humidity. The Original is our everyday formula for reliable 16+ hour wear.",
  },
  {
    question: "How do I apply setting spray correctly?",
    answer:
      "Hold the bottle 10-12 inches from your face, close your eyes, and mist in an X and T motion. Allow 30-60 seconds to dry. That's it!",
  },
  {
    question: "Can I use setting spray with any makeup?",
    answer:
      "Yes, Skindinavia works with all types of makeup — powder, liquid, cream, and even airbrush foundations. It also works over sunscreen.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally to over 100 countries. International shipping rates are calculated at checkout based on your location.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, contact our support team for a full refund or exchange.",
  },
  {
    question: "Is the Primer Spray necessary if I use a regular primer?",
    answer:
      "Our Primer Spray can replace your traditional primer or be used in addition to it. It's lighter and faster to apply than cream primers, creating a smooth, even base in seconds.",
  },
];

// ── Helpers ─────────────────────────────────────────────────────
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "finishing-sprays": "Makeup Finishing Sprays",
    "primer-sprays": "Makeup Primer Sprays",
    kits: "Makeup Artist Kits",
    individual: "Individual Products",
    "bulk-kits": "Bulk Kits",
  };
  return labels[category] || category;
}

// ── Press Logo Images ────────────────────────────────────────────
export const pressLogoImages: Record<string, string> = {
  Vogue: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/vogue-logo-300x89.png",
  Allure: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/allure-magazine-logo-300x87.png",
  Glamour: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/glamour-logo.png",
  Byrdie: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/12/BYRDIE-300x59.png",
  PopSugar: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/04/popsugar-logo-300x53.jpg",
  "Marie Claire": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/marie-glaire-logo.png",
  People: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/people-magazine-logo.png",
  "Teen Vogue": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/teen-vogue-logo.png",
  Shape: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/shape-magazine-logo.png",
  Essence: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/essence-logo.png",
  Nylon: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/nylon-logo-300x51.png",
  Brides: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/brides-mag-logo.png",
  HuffPost: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/huff-post-logo-300x116.png",
  Refinery29: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/refinery29-logo-png-1-300x211-1.png",
  "Elite Daily": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/02/Elite-Daily-Feature-Skindinavia.png",
  "US Weekly": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/us-weekly-logo.png",
  Self: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/self-magazine-logo.png",
  "Martha Stewart": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/martha-stewart-living-logo.jpg",
  "In Touch": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/intouche-magazine-logo.png",
  "New Beauty": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/new-beauty-magazine.png",
};

// ── Hero & Lifestyle Images ──────────────────────────────────────
export const heroImages = {
  bottlesGroup: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2025/07/bottles-image-home.png",
  bridalLifestyle: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2025/04/brides2.png",
  fashionista: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2024/12/fashionista-hero-scaled-1-scaled.jpg",
};

export const instagramImages = [
  "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_301654740_843255973747273_6612108819761506876_n.jpg",
  "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_306708562_625611635878669_1448671653329314283_n.jpg",
  "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_298772197_180775021098109_8376872377899932744_n.jpg",
  "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_291508262_170947788739315_3938528357252074175_n.jpg",
];

export const brandLogo = "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/06/SKIN_LG_BK_R.png";

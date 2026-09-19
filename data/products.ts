export interface SectionCopy {
  eyebrow: string;
  title: string;
  description: string;
  stat?: {
    value: string;
    label: string;
  };
  badge?: string;
}

export interface ProductDetailItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface ProductData {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  flavor: string;
  description: string;
  price: string;
  packSize: string;
  sequencePath: string;
  totalFrames: number;
  startFrameNumber: number;
  accentColor: string;
  secondaryColor: string;
  glowColor: string;
  ambientBg: string;
  gradient: string;
  sections: [SectionCopy, SectionCopy, SectionCopy, SectionCopy];
  specs: ProductDetailItem[];
  tastingNotes: string[];
  ritual: string;
}

export const PRODUCTS: ProductData[] = [
  {
    id: "mango",
    name: "Frequency Mango",
    shortName: "Mango",
    tagline: "Solar Botanical Nectar",
    flavor: "Alphonso Mango & Solar Botanicals",
    description:
      "Sun-drenched Alphonso mango essence harvested at twilight, infused with organic Lion's Mane, L-Theanine, and pristine volcanic electrolytes for hyper-focused cerebral clarity.",
    price: "$42.00",
    packSize: "Case of 12 (355ml / 12 fl oz)",
    sequencePath: "/images/mango/",
    totalFrames: 120,
    startFrameNumber: 1,
    accentColor: "#FF9E00",
    secondaryColor: "#FF3B3B",
    glowColor: "rgba(255, 158, 0, 0.28)",
    ambientBg: "radial-gradient(ellipse at 50% 45%, rgba(255, 158, 0, 0.14) 0%, rgba(10, 10, 10, 0.95) 70%, #0A0A0A 100%)",
    gradient: "linear-gradient(135deg, #FF9E00 0%, #FF3B3B 100%)",
    sections: [
      {
        eyebrow: "RESONANCE IN MOTION",
        title: "PURE VIBRATIONAL ENERGY",
        description:
          "Formulated with cold-pressed Alphonso pulp and bioactive adaptogens calibrated to elevate alpha brainwave frequency.",
        badge: "BATCH NO. 04 — SOLAR TIER",
      },
      {
        eyebrow: "SINGLE-ORIGIN SOURCE",
        title: "100% ORGANIC ALPHONSO MANGO",
        description:
          "Sun-ripened in the microclimates of Ratnagiri. Non-pasteurized aroma preservation keeps every organic terpene intact.",
        stat: {
          value: "0g",
          label: "Added Sugars",
        },
      },
      {
        eyebrow: "NEURO-HARMONIC MATRIX",
        title: "ADAPTOGENIC BIO-HARMONY",
        description:
          "500mg dual-extracted Lion's Mane mushroom paired with 200mg pure fermented L-Theanine for calm, laser-sharp focus without jitters.",
        stat: {
          value: "700mg",
          label: "Active Nootropics",
        },
      },
      {
        eyebrow: "THE SIGNATURE EXPERIENCE",
        title: "RESONATE AT YOUR HIGHEST FREQUENCY",
        description:
          "A crisp, effervescent botanical finish that leaves your palate refreshed and your mind locked into effortless creative flow.",
        badge: "CERTIFIED ZERO CRASH",
      },
    ],
    specs: [
      { label: "Volume", value: "355 ml / 12 FL OZ", subtext: "Infinitely recyclable sleek can" },
      { label: "Active Nootropics", value: "500mg Lion's Mane + 200mg L-Theanine", subtext: "Lab-verified dual extract" },
      { label: "Caffeine Profile", value: "0mg Clean Caffeine", subtext: "Completely stimulant-free clarity" },
      { label: "Electrolyte Balance", value: "350mg Marine Minerals", subtext: "Deep sea ionic magnesium & potassium" },
      { label: "Caloric Value", value: "15 Calories / 0g Cane Sugar", subtext: "Sweetened naturally with organic monkfruit" },
    ],
    tastingNotes: ["Golden Alphonso Flesh", "Meyer Lemon Zest", "Crushed Cardamom Pod", "Subtle Effervescence"],
    ritual: "Chill to 38°F (3°C). Invert gently once before opening to awaken active botanical suspensions. Consume during deep work or creative ideation.",
  },
  {
    id: "chocolate",
    name: "Frequency Chocolate",
    shortName: "Chocolate",
    tagline: "Velvet Cacao & Sacred Chaga",
    flavor: "Dark Raw Cacao & Chaga Reserve",
    description:
      "Cold-extracted single-origin Arriba Nacional raw cacao steeped with wild Siberian Chaga mushroom, Himalayan shilajit, and organic Ceylon cinnamon for restorative grounding.",
    price: "$44.00",
    packSize: "Case of 12 (355ml / 12 fl oz)",
    sequencePath: "/images/chocolate/",
    totalFrames: 120,
    startFrameNumber: 2,
    accentColor: "#D4A373",
    secondaryColor: "#8B4513",
    glowColor: "rgba(212, 163, 115, 0.25)",
    ambientBg: "radial-gradient(ellipse at 50% 45%, rgba(139, 69, 19, 0.18) 0%, rgba(10, 10, 10, 0.95) 70%, #0A0A0A 100%)",
    gradient: "linear-gradient(135deg, #D4A373 0%, #8B4513 100%)",
    sections: [
      {
        eyebrow: "EARTH RESONANCE",
        title: "VELVET FREQUENCY",
        description:
          "Rich, silky heirloom cacao butter micro-emulsified with adaptogenic roots to center your parasympathetic nervous system.",
        badge: "BATCH NO. 02 — SHADOW TIER",
      },
      {
        eyebrow: "HEIRLOOM EXTRACT",
        title: "SINGLE-ORIGIN ECUADORIAN CACAO",
        description:
          "Sourced exclusively from regenerative agroforestry parcels along the Guayas river basin for complex dark floral resonance.",
        stat: {
          value: "85%",
          label: "Dark Cacao Solids",
        },
      },
      {
        eyebrow: "IMMUNE RECOVERY",
        title: "NEURO-RESTORATIVE CHAGA MUSHROOM",
        description:
          "750mg wild birch-harvested Chaga potentized with 300mg KSM-66 Ashwagandha to balance cortisol levels under demanding deadlines.",
        stat: {
          value: "1050mg",
          label: "Myco-Adaptogens",
        },
      },
      {
        eyebrow: "DEEP RESTORATION",
        title: "UNCOMPROMISING DEPTH & CALM",
        description:
          "Satisfies the deepest craving with ceremonial-grade integrity, leaving you grounded, serene, and revitalized.",
        badge: "NO SUGAR SPIKE",
      },
    ],
    specs: [
      { label: "Volume", value: "355 ml / 12 FL OZ", subtext: "Infinitely recyclable matte can" },
      { label: "Active Nootropics", value: "750mg Wild Chaga + 300mg Ashwagandha", subtext: "Wildcrafted dual extract" },
      { label: "Stimulant Profile", value: "15mg Gentle Theobromine", subtext: "Natural heart-opening cacao alkaloid" },
      { label: "Mineral Fortification", value: "400mg Magnesium Glycinate", subtext: "Cellular relaxation and muscle recovery" },
      { label: "Caloric Value", value: "25 Calories / Raw Unsweetened", subtext: "No dairy, no emulsifiers, no gums" },
    ],
    tastingNotes: ["Arriba Nacional Dark Cacao", "Smoked Bourbon Vanilla", "Forest Moss & Bark", "Silky Creaminess"],
    ritual: "Best enjoyed slightly cool or room temperature. Sip slowly as an afternoon grounding ritual or evening decompression unwind.",
  },
  {
    id: "pomegranate",
    name: "Frequency Pomegranate",
    shortName: "Pomegranate",
    tagline: "Crimson Oxygenation Matrix",
    flavor: "Crimson Pomegranate & Ruby Cordyceps",
    description:
      "Cold-pressed Persian ruby pomegranate nectar harmonized with wild fermented hibiscus petals, organic Cordyceps militaris, and marine fulvic trace minerals for high-output physical stamina.",
    price: "$42.00",
    packSize: "Case of 12 (355ml / 12 fl oz)",
    sequencePath: "/images/pomegranate/",
    totalFrames: 120,
    startFrameNumber: 1,
    accentColor: "#FF3B3B",
    secondaryColor: "#8B0000",
    glowColor: "rgba(255, 59, 59, 0.32)",
    ambientBg: "radial-gradient(ellipse at 50% 45%, rgba(255, 59, 59, 0.16) 0%, rgba(10, 10, 10, 0.95) 70%, #0A0A0A 100%)",
    gradient: "linear-gradient(135deg, #FF3B3B 0%, #8B0000 100%)",
    sections: [
      {
        eyebrow: "PULSE OF VITALITY",
        title: "CRIMSON RESONANCE",
        description:
          "Vibrant ruby anthocyanins and organic nitric oxide precursors engineered to optimize oxygen transport and cellular stamina.",
        badge: "BATCH NO. 07 — PULSE TIER",
      },
      {
        eyebrow: "TERROIR SELECTION",
        title: "PERSIAN RUBY POMEGRANATE",
        description:
          "Selected from high-altitude orchards for high punicalagin density. Crisp, electric tartness balanced by subtle botanical sweetness.",
        stat: {
          value: "3.5x",
          label: "Green Tea Polyphenols",
        },
      },
      {
        eyebrow: "MITOCHONDRIAL ENERGY",
        title: "CELLULAR OXYGENATION VIA CORDYCEPS",
        description:
          "1000mg bio-fermented Cordyceps sinensis mycelial biomass supporting ATP synthesis and VO2 max efficiency without cardiovascular stress.",
        stat: {
          value: "1000mg",
          label: "Active Cordyceps",
        },
      },
      {
        eyebrow: "TRANSCEND THE LIMIT",
        title: "FEEL THE FREQUENCY",
        description:
          "An invigorating, palate-awakening surge that tunes your body to peak endurance and effortless flow states.",
        badge: "ZERO SYNTHETICS",
      },
    ],
    specs: [
      { label: "Volume", value: "355 ml / 12 FL OZ", subtext: "Infinitely recyclable gloss-matte can" },
      { label: "Active Nootropics", value: "1000mg Cordyceps + Rhodiola Rosea", subtext: "Dual-standardized 10:1 ratio" },
      { label: "Caffeine Profile", value: "0mg Sustained Energy", subtext: "Nitric oxide driven stamina" },
      { label: "Antioxidant Density", value: "1850 ORAC Units", subtext: "Punicalagin & Ellagic acid complex" },
      { label: "Caloric Value", value: "20 Calories / Pure Botanical", subtext: "Naturally tart, 100% plant-derived" },
    ],
    tastingNotes: ["Crushed Ruby Arils", "Tart Fermented Hibiscus", "Wild Cranberry Essence", "Crisp Sparkling Water"],
    ritual: "Serve iced in crystal glassware with a twist of blood orange. Perfect 30 minutes pre-workout or during demanding performance milestones.",
  },
];

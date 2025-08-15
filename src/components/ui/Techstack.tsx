import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Globe } from "lucide-react";

// Example logos — swap these with your own assets/brand list
const logosRow1 = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png?20230715030042", alt: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", alt: "Express" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", alt: "GraphQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", alt: "Prisma" },
];

const logosRow2 = [
  { src: "https://tse1.mm.bing.net/th/id/OIP.ASkbzV1btB5QPvuK4B4F0gHaF4?rs=1&pid=ImgDetMain&o=7&rm=3", alt: "AWS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", alt: "Kubernetes" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", alt: "Vercel" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", alt: "Firebase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", alt: "Supabase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", alt: "Redis" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg", alt: "Jest" },
];

// Seamless marquee row (duplicates content and scrolls infinitely)
function MarqueeRow({
  items,
  direction = "left", // "left" or "right"
  speed = 80,          // px per second
  className = "",
}: {
  items: { src: string; alt: string }[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure content width for seamless loop
  useEffect(() => {
    const measure = () => {
      if (!contentRef.current) return;
      const w = contentRef.current.getBoundingClientRect().width;
      setContentWidth(w);
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Set starting position based on direction
  useEffect(() => {
    if (!contentWidth) return;
    if (direction === "right") x.set(-contentWidth);
    else x.set(0);
  }, [contentWidth, direction, x]);

  // rAF loop for smooth, linear movement
  useEffect(() => {
    if (!contentWidth) return;
    let raf = 0;
    let prev = performance.now();

    const loop = (time: number) => {
      const delta = time - prev;
      prev = time;

      const dist = (speed * delta) / 1000; // px to move this frame
      let current = x.get();

      if (direction === "left") {
        current -= dist;
        if (current <= -contentWidth) current = 0;
      } else {
        current += dist;
        if (current >= 0) current = -contentWidth;
      }
      x.set(current);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [contentWidth, direction, speed, x]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex w-max">
        {/* content 1 */}
        <div ref={contentRef} className="flex items-center gap-3 pr-3">
          {items.map((item, i) => (
            <motion.div
              key={`a-${i}`}
              whileHover={{ scale: 1.04 }}
              className="flex items-center justify-center px-5 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm hover:shadow-sm transition will-change-transform min-w-[120px] h-[64px]"
            >
              <img
                src={item.src}
                alt={item.alt}
                title={item.alt}
                loading="lazy"
                className="h-8 w-auto md:h-9 grayscale hover:grayscale-0 transition"
              />
            </motion.div>
          ))}
        </div>

        {/* content 2 (duplicate) */}
        <div aria-hidden className="flex items-center gap-3 pr-3">
          {items.map((item, i) => (
            <motion.div
              key={`b-${i}`}
              whileHover={{ scale: 1.04 }}
              className="flex items-center justify-center px-5 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm hover:shadow-sm transition will-change-transform min-w-[120px] h-[64px]"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-8 w-auto md:h-9 grayscale hover:grayscale-0 transition"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Edge gradients for a clean fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

export default function TechStack({ controls, containerVariants, itemVariants }: any) {
  return (
    <motion.div className="mb-16 md:mb-24" variants={containerVariants} initial="hidden" animate={controls}>
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
          <Globe className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-semibold text-purple-700">TOOLS & STACK</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Modern, proven, and scalable</h2>
      </motion.div>

      {/* Two marquee rows: top goes left, bottom goes right */}
      <div className="space-y-4">
        <MarqueeRow items={logosRow1} direction="left" speed={80} />
        <MarqueeRow items={logosRow2} direction="right" speed={80} />
      </div>
    </motion.div>
  );
}
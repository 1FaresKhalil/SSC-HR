'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const logos = [
  'https://cdn.simpleicons.org/apple/0C74B8',
  'https://cdn.simpleicons.org/google/0C74B8',
  'https://cdn.simpleicons.org/amazon/0C74B8',
  'https://cdn.simpleicons.org/meta/0C74B8',
  'https://cdn.simpleicons.org/intel/0C74B8',
  'https://cdn.simpleicons.org/amd/0C74B8',
  'https://cdn.simpleicons.org/bmw/0C74B8',
  'https://cdn.simpleicons.org/tesla/0C74B8',
];

const MovingLogos = () => {
  const baseVelocity = -1;
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${v}%`);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((t, delta) => {
    const moveBy = baseVelocity * (delta / 1000) * (isHovered ? 0.5 : 1);

    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const maxMove = (logos.length * 150) / (containerWidth / 100);

      if (baseX.get() < -maxMove) {
        baseX.set(0);
      }
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="inline-flex items-center" style={{ x }}>
        {logos.concat(logos).map((logo, index) => (
          <motion.div
            key={index}
            className="inline-block mx-2 md:mx-6 w-[120px] md:w-[200px] h-[60px] md:h-[100px] flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Image
              src={logo}
              alt={`Logo ${index + 1}`}
              width={100}
              height={50}
              className="object-contain w-[80px] md:w-[160px] h-[40px] md:h-[80px] transition-all duration-300"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export function CertifiedBanner() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="relative py-8 md:py-12 bg-[#EDF4F9] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#EDF4F9]" />
      <div className="relative container mx-auto px-2 md:px-4">
        <MovingLogos />
      </div>
    </motion.div>
  );
}

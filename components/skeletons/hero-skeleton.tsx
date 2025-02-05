'use client';

import { motion } from 'framer-motion';

export function HeroSkeleton() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-900 to-blue-800 flex items-center">
      <div className="container px-4 pt-32 md:pt-48 lg:pt-0">
        <div className="max-w-[80vw] mx-auto space-y-6">
          <motion.div
            className="h-16 md:h-24 bg-blue-800/50 rounded-lg"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="h-10 md:h-16 bg-blue-800/50 rounded-lg w-3/4"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <motion.div
              className="h-14 bg-blue-800/50 rounded-lg w-40"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
            <motion.div
              className="h-14 bg-blue-800/50 rounded-lg w-40"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

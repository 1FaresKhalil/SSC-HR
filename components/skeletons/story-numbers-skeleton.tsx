'use client';

import { motion } from 'framer-motion';

export function StoryNumbersSkeleton() {
  return (
    <section className="bg-[#0C74B8] py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div className="space-y-6">
            <motion.div
              className="h-16 bg-white/10 rounded-lg w-3/4"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="h-32 bg-white/10 rounded-lg w-full"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </motion.div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 p-6 rounded-lg backdrop-blur-sm"
              >
                <motion.div
                  className="h-12 bg-white/10 rounded-lg w-1/2 mb-4"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
                <motion.div
                  className="h-6 bg-white/10 rounded-lg w-full"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1 + 0.2,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

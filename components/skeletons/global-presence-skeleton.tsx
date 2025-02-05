'use client';

import { motion } from 'framer-motion';

export function GlobalPresenceSkeleton() {
  return (
    <section className="relative min-h-screen bg-[#0966B5] overflow-hidden">
      <div className="container relative mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            className="relative rounded-3xl overflow-hidden bg-blue-400/20 aspect-video"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Text Content */}
          <div className="space-y-6">
            <motion.div
              className="h-12 bg-white/10 rounded-lg w-3/4"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="h-24 bg-white/10 rounded-lg w-full"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-8 bg-white/10 rounded-lg w-full"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.3 + i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/20 to-blue-700/20"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </section>
  );
}

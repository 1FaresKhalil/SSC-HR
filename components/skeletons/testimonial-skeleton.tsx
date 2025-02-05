'use client';

import { motion } from 'framer-motion';

export function TestimonialSkeleton() {
  return (
    <section className="relative py-20 bg-[#0C74B8] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="h-32 bg-blue-400/30 rounded-3xl mb-8"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="space-y-4 text-center">
            <motion.div
              className="h-8 bg-blue-400/30 rounded-lg w-48 mx-auto"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="h-6 bg-blue-400/30 rounded-lg w-32 mx-auto"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

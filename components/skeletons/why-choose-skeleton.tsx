'use client';

import { motion } from 'framer-motion';

export function WhyChooseSkeleton() {
  return (
    <section className="bg-[#F0F7FF] py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="h-12 bg-blue-200 rounded-lg w-64 mx-auto mb-16"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4"
            >
              <motion.div
                className="w-64 h-64 rounded-full bg-blue-200"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
              <motion.div
                className="h-8 bg-blue-200 rounded-lg w-48"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2 + 0.2,
                }}
              />
              <motion.div
                className="h-20 bg-blue-200 rounded-lg w-full"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2 + 0.4,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

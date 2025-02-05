'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="relative">
        {/* Main loading text */}
        <motion.div
          className="text-4xl font-bold text-[#0C74B8]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Loading
          <span className="inline-flex ml-2">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: [-2, 2, -2] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              >
                .
              </motion.span>
            ))}
          </span>
        </motion.div>

        {/* Animated circles */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full border-2 border-[#0C74B8]"
              style={{
                width: `${(i + 1) * 50}px`,
                height: `${(i + 1) * 50}px`,
                marginLeft: `-${((i + 1) * 50) / 2}px`,
                marginTop: `-${((i + 1) * 50) / 2}px`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Pulsing center dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 bg-[#0C74B8] rounded-full -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Background blur effect */}
        <motion.div
          className="absolute -z-20 size-80 rounded-full bg-[#5CEACE]/10 blur-3xl"
          style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
}

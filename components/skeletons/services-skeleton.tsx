'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export function ServicesSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="h-12 bg-gray-200 rounded-lg w-64 mx-auto mb-16"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-[#0C74B8] py-6 lg:py-9 border-0">
              <CardContent className="p-6">
                <motion.div
                  className="w-12 h-12 bg-blue-400 rounded-lg mb-4"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
                <motion.div
                  className="h-8 bg-blue-400 rounded-lg w-3/4 mb-4"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1 + 0.2,
                  }}
                />
                <motion.div
                  className="h-20 bg-blue-400 rounded-lg w-full"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1 + 0.4,
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

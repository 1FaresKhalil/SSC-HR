'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Animated 404 Text */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-[150px] md:text-[200px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0C74B8] to-[#5CEACE]"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, -1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            404
          </motion.h1>

          {/* Animated circles in background */}
          <motion.div
            className="absolute -z-10 size-60 md:size-80 rounded-full bg-blue-100/50 blur-3xl"
            style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            asChild
            variant="default"
            className="bg-[#0C74B8] hover:bg-[#0C74B8]/90"
          >
            <Link href="/">
              <Home className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-[#0C74B8] text-[#0C74B8] hover:bg-[#0C74B8]/5"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 size-4" />
              Go Back
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

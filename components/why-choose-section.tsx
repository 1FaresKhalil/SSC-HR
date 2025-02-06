'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface WhyChooseData {
  section_title: string;
  features: {
    title: string;
    image: string;
    description: string;
  }[];
}

export function WhyChooseSection() {
  const [whyChooseData, setWhyChooseData] = useState<WhyChooseData | null>(
    null
  );
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchWhyChooseData = async () => {
      try {
        const response = await axios.get('/api/why-choose-ssc');
        setWhyChooseData(response.data);
      } catch (error) {
        console.error('Failed to fetch why choose data:', error);
      }
    };

    fetchWhyChooseData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className="bg-[#F0F7FF] py-20 relative overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#E1EFFF,transparent_70%)]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
              },
            },
          }}
          className="text-4xl font-bold text-[#3B82F6] text-center mb-16"
        >
          {whyChooseData?.section_title || 'Why Choose SSC'}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {(whyChooseData?.features || []).map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                className="relative w-64 h-64 mb-6 overflow-hidden rounded-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src={`why/${index + 1}.jpg`}
                  alt={feature.title}
                  fill
                  className="rounded-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>

              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.2,
                      duration: 0.5,
                    },
                  },
                }}
                className="text-2xl font-semibold text-gray-800 mb-4"
              >
                {feature.title}
              </motion.h3>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.3,
                      duration: 0.5,
                    },
                  },
                }}
                className="text-gray-500 leading-relaxed max-w-sm"
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

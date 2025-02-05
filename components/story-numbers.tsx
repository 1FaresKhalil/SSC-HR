'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface StoryData {
  section_title: string;
  description: string;
  statistics: {
    value: string;
    description: string;
  }[];
}

interface StatCardProps {
  number: string;
  text: string;
  delay: number;
}

function StatCard({ number, text, delay }: StatCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
    >
      <motion.h3
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-[#0C74B8] text-4xl md:text-5xl font-extrabold mb-4"
      >
        {number}
      </motion.h3>
      <p className="text-gray-500 text-sm md:text-base leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}

export function StoryNumbers() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [storyData, setStoryData] = useState<StoryData | null>(null);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await axios.get('/api/our-story');
        setStoryData(response.data);
      } catch (error) {
        console.error('Failed to fetch story data:', error);
      }
    };

    fetchStoryData();
  }, []);

  return (
    <section className="bg-[#0C74B8] py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {storyData?.section_title || 'OUR STORY IN NUMBER'}
            </h2>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl">
              {storyData?.description ||
                "Our comprehensive HR services provide employee management from hiring to firing and everything in between. We've helped every one of our clients scale their business by understanding their wants and needs and delivering an unparalleled service that is second to none."}
            </p>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(storyData?.statistics || []).map((stat, index) => (
              <StatCard
                key={index}
                number={stat.value}
                text={stat.description}
                delay={0.2 * index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

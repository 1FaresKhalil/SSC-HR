'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import axios from 'axios';

interface HeroData {
  hero_section: {
    title: string;
    subtitle: string;
    background_image: string;
    buttons: {
      text: string;
      link: string;
      style: string;
    }[];
  };
}

export function HeroSection() {
  const [offset, setOffset] = useState(0);
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get('/api/nav-hero');
        setHeroData(response.data);
      } catch (error) {
        console.error('Failed to fetch hero data:', error);
      }
    };

    fetchHeroData();
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="hero-section relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[5]"
        style={{
          backgroundImage: `url('./hero-bg.png')`,
          transform: `translateY(${offset * 0.5}px)`,
        }}
      />
      <video
        className="absolute inset-0 object-cover size-full z-10"
        loop
        autoPlay
        muted
        playsInline
        controls={false}
        webkit-playsinline="true"
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="overlay block absolute inset-0 bg-cover bg-center w-full h-[80%] opacity-90 z-[15] bg-gradient-to-b from-white to-white/0" />
      {/* Overlay with lighter gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-black/20 z-20" />

      {/* Updated Content section */}
      <div className="absolute container px-4 pt-32 md:pt-48 lg:pt-0 z-30 flex flex-col size-full left-0 right-0 justify-center text-center">
        <motion.div
          className="max-w-[90vw] sm:max-w-[80vw] hero-text mx-auto h-max inline-flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
          >
            {heroData?.hero_section.title || 'Full Comprehensive HR Solutions'}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-5xl text-[#5CEACE] font-semibold mb-6 md:mb-8 leading-snug"
          >
            {heroData?.hero_section.subtitle ||
              'Tailored to your business needs'}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto sm:min-w-[400px]"
          >
            {heroData?.hero_section.buttons.map((button, index) =>
              button.style === 'primary' ? (
                <motion.div
                  key={index}
                  className="flex-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full bg-[#0C74B8] text-white hover:bg-blue-600 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-sm rounded-bl-2xl rounded-tr-2xl">
                    {button.text}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={index}
                  className="flex-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="p-[2px] bg-gradient-to-r from-[#0C74B8] to-[#25E2CC] rounded-sm rounded-bl-2xl rounded-tr-2xl">
                    <Button
                      variant="outline"
                      className="w-full bg-white text-[#0C74B8] hover:text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg hover:bg-gradient-to-r hover:from-[#0C74B8] hover:to-[#25E2CC] rounded-sm rounded-bl-2xl rounded-tr-2xl"
                    >
                      {button.text}
                    </Button>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

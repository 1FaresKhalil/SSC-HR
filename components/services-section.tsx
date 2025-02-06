'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users,
  FileText,
  UserSearch,
  ClipboardList,
  Receipt,
  Building2,
  Award,
  Users2,
  UsersIcon as Users3,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ServiceData {
  section_title: string;
  services: {
    title: string;
    description: string | string[];
    icon: string;
  }[];
}

export function ServicesSection() {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServiceData(response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  // Split services into main and additional services
  const mainServices = serviceData?.services.slice(0, 6) || [];
  const additionalServices = serviceData?.services.slice(6) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.5,
      },
    },
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -45
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-[#222222] py-20"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          variants={titleVariants}
          className="text-3xl sm:text-4xl font-bold text-white mb-12 md:mb-16 text-center"
        >
          {serviceData?.section_title || 'Our Services'}
        </motion.h2>

        {/* Main Services Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="h-full"
            >
              <Card className="bg-[#0C74B8] text-white py-6 lg:py-9 border-0 h-full transform transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <motion.div
                    variants={iconVariants}
                    className="mb-6"
                  >
                    <Image
                      src={`services/${index + 1}.svg`}
                      className="w-12 h-12"
                      alt={service.title}
                      width={200}
                      height={200}
                    />
                  </motion.div>
                  <motion.h3
                    variants={textVariants}
                    className="text-xl font-bold mb-4"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.div
                    variants={textVariants}
                    className="text-blue-100"
                  >
                    {typeof service.description === 'string' ? (
                      <p>{service.description}</p>
                    ) : (
                      <ul className="list-disc list-inside space-y-2">
                        {service.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index + 6}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="h-full"
            >
              <Card className="bg-[#0C74B8] text-white py-6 lg:py-9 border-0 h-full transform transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <motion.div
                    variants={iconVariants}
                    className="mb-6"
                  >
                    <Image
                      src={`services/${index + 7}.svg`}
                      className="w-12 h-12"
                      alt={service.title}
                      width={200}
                      height={200}
                    />
                  </motion.div>
                  <motion.h3
                    variants={textVariants}
                    className="text-xl font-bold mb-4"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.div
                    variants={textVariants}
                    className="text-blue-100"
                  >
                    {typeof service.description === 'string' ? (
                      <p>{service.description}</p>
                    ) : (
                      <ul className="list-disc list-inside space-y-2">
                        {service.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

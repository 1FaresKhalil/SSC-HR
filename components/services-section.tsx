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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
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
          className="text-4xl font-bold text-white mb-16 text-center"
        >
          {serviceData?.section_title || 'Our Services'}
        </motion.h2>

        {/* Main Services Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
        >
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="bg-[#0C74B8] text-white py-6 lg:py-9 border-0 h-full transform transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Image
                      src={`services/${index + 1}.svg`}
                      className="w-12 h-12 mb-4"
                      alt={service.title}
                      width={200}
                      height={200}
                    />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="text-xl font-bold mb-4"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-blue-100"
                  >
                    {typeof service.description === 'string'
                      ? service.description
                      : service.description.join(', ')}
                  </motion.p>
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
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="bg-[#0C74B8] text-white py-6 lg:py-9 border-0 h-full transform transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: (index + 6) * 0.1 }}
                  >
                    <Image
                      src={`services/${index + 7}.svg`}
                      className="w-12 h-12 mb-4"
                      alt={service.title}
                      width={200}
                      height={200}
                    />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 6) * 0.1 + 0.2 }}
                    className="text-xl font-bold mb-4"
                  >
                    {service.title}
                  </motion.h3>
                  {Array.isArray(service.description) ? (
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (index + 6) * 0.1 + 0.4 }}
                      className="list-disc list-inside text-blue-100 space-y-2"
                    >
                      {service.description.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + 6) * 0.1 + 0.4 + i * 0.1 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (index + 6) * 0.1 + 0.4 }}
                      className="text-blue-100"
                    >
                      {service.description}
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

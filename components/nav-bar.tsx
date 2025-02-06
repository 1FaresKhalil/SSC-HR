'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import { AlignJustify, X } from 'lucide-react';
import axios from 'axios';

// Types for the nav-hero data
interface NavHeroData {
  company: {
    name: string;
    logo: string;
  };
  navigation: {
    links: {
      text: string;
      link: string;
      style?: string;
    }[];
  };
}

const menuVariants = {
  closed: {
    opacity: 0,
    scale: 0.95,
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    y: 20,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navData, setNavData] = useState<NavHeroData | null>(null);
  const { scrollY } = useScroll();

  // Transform values for scroll-based animations
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    isOpen
      ? ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)'] // Always transparent when menu is open
      : ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.9)']
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    isOpen
      ? ['0px 0px 0px rgba(0,0,0,0)', '0px 0px 0px rgba(0,0,0,0)'] // No shadow when menu is open
      : ['0px 0px 0px rgba(0,0,0,0)', '0px 4px 20px rgba(0,0,0,0.1)']
  );

  const textColor = useTransform(
    scrollY,
    [0, 100],
    isOpen
      ? ['rgb(255, 255, 255)', 'rgb(255, 255, 255)'] // Always white when menu is open
      : ['rgb(53, 127, 176)', 'rgb(12, 116, 184)']
  );

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const response = await axios.get('/api/nav-hero');
        setNavData(response.data);
      } catch (error) {
        console.error('Failed to fetch navigation data:', error);
      }
    };

    fetchNavData();
  }, []);

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Get all links except the last one (contact us)
  const menuItems = navData?.navigation.links.slice(0, -1) || [];
  const contactLink =
    navData?.navigation.links[navData.navigation.links.length - 1];

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
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
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        style={{
          backgroundColor: headerBackground,
          boxShadow: headerShadow,
          backdropFilter: isOpen ? 'none' : 'blur(8px)',
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="relative z-50 flex items-center space-x-2"
            >
              <Image
                src="./logo.png"
                alt={navData?.company.name || 'SSC HR Solutions'}
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.link}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.link} className="relative group">
                  <motion.span style={{ color: textColor }}>
                    {item.text}
                  </motion.span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0C74B8] transition-all group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            {contactLink && (
              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: menuItems.length * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={contactLink.link}
                  className="bg-[#0C74B8] text-white px-6 py-2 rounded-sm rounded-bl-2xl rounded-tr-2xl hover:bg-blue-700 transition-all duration-300 font-medium"
                >
                  {contactLink.text}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={toggleMenu}
              className="relative z-50 p-3 focus:outline-none"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                initial={false}
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <AlignJustify
                  size={38}
                  className={`transition-colors ${
                    isOpen ? 'text-white' : 'text-[#0C74B8]'
                  }`}
                  strokeWidth={1.5}
                />
              </motion.div>
              <motion.div
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <X
                  size={38}
                  className="text-white transition-colors"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay with simplified background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-blue-600/95 backdrop-blur-sm md:hidden overflow-hidden"
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="h-full flex flex-col pt-20"
            >
              {/* Menu Items */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                {menuItems.map((item) => (
                  <motion.div key={item.link} variants={menuItemVariants}>
                    <Link
                      href={item.link}
                      onClick={toggleMenu}
                      className="text-3xl font-bold text-white hover:text-blue-100 transition-colors"
                    >
                      {item.text}
                    </Link>
                  </motion.div>
                ))}
                {contactLink && (
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href={contactLink.link}
                      onClick={toggleMenu}
                      className="text-3xl font-bold bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      {contactLink.text}
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Simple gradient background */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500 to-blue-700" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

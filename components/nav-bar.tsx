'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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

  const toggleMenu = () => setIsOpen(!isOpen);

  // Get all links except the last one (contact us)
  const menuItems = navData?.navigation.links.slice(0, -1) || [];
  const contactLink =
    navData?.navigation.links[navData.navigation.links.length - 1];

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="relative z-50 flex items-center space-x-2">
            <Image
              src="./logo.png"
              alt={navData?.company.name || 'SSC HR Solutions'}
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.link}
                href={item.link}
                className="text-[#357FB0] hover:text-blue-800 transition-colors"
              >
                {item.text}
              </Link>
            ))}
            {contactLink && (
              <Link
                href={contactLink.link}
                className="bg-white text-[#0C74B8] px-6 py-2 rounded-sm rounded-bl-2xl rounded-tr-2xl hover:bg-blue-50 transition-all duration-300 font-medium"
              >
                {contactLink.text}
              </Link>
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
              className="relative z-50 p-2"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                initial={false}
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-white"
              >
                <Menu size={24} />
              </motion.div>
              <motion.div
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-white"
              >
                <X size={24} />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-blue-600 md:hidden"
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

              {/* Background Animation */}
              <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0.5],
                  transition: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                  },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

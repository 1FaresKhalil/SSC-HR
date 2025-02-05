'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import axios from 'axios';

interface RegionalData {
  section_title: string;
  subtitle: string;
  image: string;
}

export function GlobalPresence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [regionalData, setRegionalData] = useState<RegionalData | null>(null);

  useEffect(() => {
    const fetchRegionalData = async () => {
      try {
        const response = await axios.get('/api/regional-allocation');
        setRegionalData(response.data);
      } catch (error) {
        console.error('Failed to fetch regional data:', error);
      }
    };

    fetchRegionalData();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle system
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 50;
    const connectionDistance = 150;
    const particleSpeed = 0.5;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
      });
    }

    // Animation
    function animate() {
      const canvas = canvasRef.current;
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              0.2 * (1 - distance / connectionDistance)
            })`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <section className="relative max-h-[80vw] bg-[#0966B5] overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(to bottom right, #0966B5, #0966B5)',
        }}
      />

      <div className="container relative mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <Image
              src="./jew-video.png"
              alt="Global Distribution Visualization"
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <video
              className="absolute inset-0 object-cover size-full z-10"
              loop
              autoPlay
              muted
            >
              <source src="/jew-video.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {regionalData?.section_title ||
                'Regional Allocation, Global Distribution.'}
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90"
            >
              {regionalData?.subtitle ||
                'With Operating Locations Across Egypt, UAE, KSA, & Bahrain.'}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

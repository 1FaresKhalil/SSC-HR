'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <section className="bg-[#F0F7FF] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#3B82F6] text-center mb-16">
          {whyChooseData?.section_title || 'Why Choose SSC'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {(whyChooseData?.features || []).map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-64 h-64 mb-6">
                <Image
                  src={`why/${index + 1}.jpg`}
                  alt={feature.title}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed max-w-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

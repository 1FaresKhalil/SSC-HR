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

  return (
    <section className="bg-[#222222] py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-16">
          {serviceData?.section_title || 'Our Services'}
        </h2>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {mainServices.map((service, index) => (
            <Card
              key={index}
              className="bg-[#0C74B8] text-white py-6 lg:py-9 border-0"
            >
              <CardContent className="p-6">
                <Image
                  src={`services/${index + 1}.svg`}
                  className="w-12 h-12 mb-4"
                  alt={service.title}
                  width={200}
                  height={200}
                />
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-blue-100">
                  {typeof service.description === 'string'
                    ? service.description
                    : service.description.join(', ')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <Card
              key={index}
              className="bg-[#0C74B8] text-white py-6 lg:py-9 border-0"
            >
              <CardContent className="p-6">
                <Image
                  src={`services/${index + 7}.svg`}
                  className="w-12 h-12 mb-4"
                  alt={service.title}
                  width={200}
                  height={200}
                />
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                {Array.isArray(service.description) ? (
                  <ul className="list-disc list-inside text-blue-100 space-y-2">
                    {service.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-blue-100">{service.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

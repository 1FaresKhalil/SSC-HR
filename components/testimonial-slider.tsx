'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import quoteIcon from '@/public/quote.svg';
import Image from 'next/image';
import axios from 'axios';

interface TestimonialData {
  section_title: string;
  testimonials: {
    name: string;
    position: string;
    quote: string;
    avatar: string;
  }[];
}

export function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonialData, setTestimonialData] =
    useState<TestimonialData | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        setTestimonialData(response.data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const testimonials = testimonialData?.testimonials || [];

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#222222] py-20 overflow-hidden w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          {testimonialData?.section_title || 'Hear From Our Partners'}
        </h2>

        <div className="relative max-w-[90vw] lg:max-w-4xl mx-auto justify-center items-center flex flex-col">
          <div className="absolute w-[80%] lg:w-full mx-auto h-amx justify-center flex z-50">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="relative w-[90%] h-[500px] lg:h-[350px] flex flex-col justify-center items-center">
            {testimonials.map((item, index) => {
              // Determine z-index and position offsets
              const isActive = index === activeIndex;
              const isPrev =
                index ===
                (activeIndex - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (activeIndex + 1) % testimonials.length;

              return (
                <div
                  key={index}
                  className={`absolute flex items-center w-[100%] lg:w-[80%] h-[500px] lg:h-[350px] p-6 lg:p-14 text-start justify-center bg-white shadow-xl rounded-2xl transition-all duration-500 ease-in-out ${
                    isActive
                      ? 'z-30 scale-100 h-full opacity-100'
                      : 'z-10 scale-90 lg:scale-60 lg:scale-90 h-[90%] opacity-60 lg:opacity-80'
                  } ${isPrev ? '-translate-x-[100px] z-20' : ''} ${
                    isNext ? 'translate-x-[120px] z-20' : ''
                  }`}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 left-6 size-14 text-blue-600 font-serif">
                    <Image src={quoteIcon} alt="quote" className="w-full" />
                  </div>
                  <div className="content w-full">
                    <p className="text-gray-700 text-lg my-6">{item.quote}</p>
                    <div className="text-start">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-gray-500">{item.position}</p>
                    </div>
                  </div>
                  {/* Bottom Quote Icon */}
                  <div className="absolute bottom-6 right-6 size-14 text-blue-600 font-serif rotate-180">
                    <Image src={quoteIcon} alt="quote" className="w-full" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-[#5CEACE]' : 'bg-white'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

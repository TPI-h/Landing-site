import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  guest_name: string;
  guest_location?: string;
  review_text: string;
  rating?: number;
  image_url?: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  testimonialsLoading: boolean;
}

const TestimonialsSection = ({ testimonials, testimonialsLoading }: TestimonialsSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3; // Show 3 testimonials at a time

  // Calculate total pages for carousel
  const totalPages = Math.ceil((testimonials?.length || 0) / itemsPerPage);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (!testimonials || testimonials.length <= itemsPerPage) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials, totalPages, itemsPerPage]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Get current testimonials to display
  const getCurrentTestimonials = () => {
    if (!testimonials) return [];
    const startIndex = currentSlide * itemsPerPage;
    return testimonials.slice(startIndex, startIndex + itemsPerPage);
  };

  // Helper function to convert Google Drive URLs to direct image URLs
  const getDirectImageUrl = (url: string): string | null => {
    console.log('🔍 Processing image URL:', url);

    if (!url || url.trim() === '') {
      console.log('❌ Empty or null URL provided');
      return null;
    }

    // Handle Google Drive URLs
    if (url.includes('drive.google.com/file/d/')) {
      console.log('📁 Detected Google Drive URL');
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        console.log('✅ Converted Google Drive URL:', directUrl);
        return directUrl;
      } else {
        console.log('❌ Failed to extract file ID from Google Drive URL');
      }
    }

    // Handle Google redirect URLs - extract the actual URL
    if (url.includes('google.com/url?') && url.includes('&url=')) {
      console.log('🔗 Detected Google redirect URL');
      try {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const actualUrl = urlParams.get('url');
        if (actualUrl) {
          const decodedUrl = decodeURIComponent(actualUrl);
          console.log('✅ Extracted URL from redirect:', decodedUrl);
          return decodedUrl;
        }
      } catch (e) {
        console.error('❌ Failed to parse Google redirect URL:', e);
      }
    }

    // For direct image URLs, return as-is
    if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i) || url.includes('unsplash.com') || url.includes('images.')) {
      console.log('🖼️ Direct image URL detected, using as-is');
      return url;
    }

    // If it's not a recognized format, log a warning
    console.warn('⚠️ URL may not be a direct image URL, but trying anyway:', url);
    return url; // Still try to load it
  };

  // Debug: log testimonials data
  console.log('=== TESTIMONIALS DEBUG (Home Page) ===');
  console.log('Testimonials data:', testimonials);
  console.log('Testimonials loading:', testimonialsLoading);
  console.log('Number of testimonials:', testimonials?.length);
  console.log('Testimonials with images:', testimonials?.filter(t => t.image_url));

  // Show ALL available fields in the testimonial object
  if (testimonials && testimonials.length > 0) {
    console.log('🔍 ALL FIELDS in first testimonial:', Object.keys(testimonials[0]));
    console.log('🔍 Full first testimonial object:', testimonials[0]);
  }

  // Detailed debug for each testimonial
  testimonials?.forEach((testimonial, index) => {
    console.log(`Testimonial ${index}:`, {
      id: testimonial.id,
      guest_name: testimonial.guest_name,
      image_url: testimonial.image_url,
      has_image: !!testimonial.image_url,
      image_url_length: testimonial.image_url?.length || 0,
      all_fields: Object.keys(testimonial)
    });

    if (testimonial.image_url) {
      const processedUrl = getDirectImageUrl(testimonial.image_url);
      console.log(`Testimonial ${index} image processing:`, {
        original: testimonial.image_url,
        processed: processedUrl,
        processing_successful: !!processedUrl
      });
    }
  });

  return (
    <section className="py-12 sm:py-16 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 sm:mb-6 px-4">Guest Reviews</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            What our guests say about their experience
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-transform duration-500 ease-in-out">
              {testimonialsLoading ? (
                <div className="col-span-3 text-center py-8">Loading testimonials...</div>
              ) : (
                getCurrentTestimonials().map((testimonial) => (
                  <Card key={testimonial.id} className="p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 relative bg-gradient-to-br from-white via-cream/10 to-white transform hover:-translate-y-1 hover:scale-[1.02]">
                    {/* Image positioned in middle-right */}
                    {(() => {
                      const imageUrl = getDirectImageUrl(testimonial.image_url || '');
                      console.log(`Rendering testimonial ${testimonial.id}:`, {
                        guest_name: testimonial.guest_name,
                        original_url: testimonial.image_url,
                        processed_url: imageUrl,
                        will_render_image: !!imageUrl
                      });

                      if (!imageUrl) {
                        console.log(`No image will be rendered for ${testimonial.guest_name} - URL processing failed or empty`);
                        return null;
                      }

                      return (
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-20 h-20 rounded-full overflow-hidden border-3 border-gold/30 shadow-lg">
                          <img
                            src={imageUrl}
                            alt={testimonial.guest_name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error(`❌ Failed to load testimonial image for ${testimonial.guest_name}:`, {
                                original_url: testimonial.image_url,
                                processed_url: imageUrl,
                                error: e
                              });
                              // Hide image if it fails to load
                              (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                            }}
                            onLoad={() => {
                              console.log(`✅ Successfully loaded testimonial image for ${testimonial.guest_name}:`, imageUrl);
                            }}
                          />
                        </div>
                      );
                    })()}

                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gold fill-current" />
                      ))}
                    </div>
                    <Quote className="text-gold mb-4" size={32} />
                    <p className="text-muted-foreground mb-4 italic pr-24">"{testimonial.review_text}"</p>
                    <div>
                      <p className="font-bold text-navy">{testimonial.guest_name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.guest_location}</p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Navigation Controls - Only show if there are more testimonials than items per page */}
          {testimonials && testimonials.length > itemsPerPage && (
            <>
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-navy p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-navy p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                aria-label="Next testimonials"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                        ? 'bg-gold scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to testimonials page ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
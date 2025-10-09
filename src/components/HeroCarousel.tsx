import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHotelData } from "@/hooks/useHotelData";
import { supabase } from "@/integrations/supabase/client";

// Placeholder images
const placeholderImages = {
  hotelExterior: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center",
  deluxeRoom: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop&crop=center",
  hotelLobby: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&crop=center"
};

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: hotel } = useHotelData();
  const navigate = useNavigate();

  // Helper function to get proper image URL
  const getImageUrl = (imagePath: string) => {
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // If it's a filename or local asset path, convert to Supabase storage URL
    let fileName = imagePath;
    if (imagePath.startsWith('/src/assets/')) {
      fileName = imagePath.split('/').pop() || imagePath;
    }

    // Get the public URL from Supabase storage
    const { data } = supabase.storage
      .from('hotel-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // Create slides from hotel images array or fallback to default
  const hotelImages = hotel?.images || [];

  const slides = hotelImages.length > 0
    ? hotelImages.slice(0, 3).map((imageUrl, index) => ({
      image: getImageUrl(imageUrl) || placeholderImages.hotelExterior,
      title: index === 0 ? "Welcome to Thendral Park Inn" :
        index === 1 ? "Elegant Accommodations" :
          "Exceptional Service",
      subtitle: index === 0 ? "Luxury and Comfort in the Heart of Villupuram" :
        index === 1 ? "Experience Premium Comfort in Our Luxurious Rooms" :
          "Creating Memorable Experiences"
    }))
    : [
      {
        image: placeholderImages.hotelExterior,
        title: "Welcome to Thendral Park Inn",
        subtitle: "Luxury and Comfort in the Heart of Villupuram",
      },
      {
        image: placeholderImages.deluxeRoom,
        title: "Elegant Accommodations",
        subtitle: "Experience Premium Comfort in Our Luxurious Rooms",
      },
      {
        image: placeholderImages.hotelLobby,
        title: "Exceptional Service",
        subtitle: "Creating Memorable Experiences",
      },
    ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 sm:bg-gradient-overlay" />
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
              <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 sm:space-y-6 lg:space-y-8">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold opacity-0 animate-fade-in-up leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-0 animate-fade-in-up animation-delay-300 leading-relaxed max-w-3xl drop-shadow-md">
                  {slide.subtitle}
                </p>
                <div className="opacity-0 animate-fade-in-up animation-delay-600 pt-2 sm:pt-4">
                  <Button
                    size="lg"
                    className="relative z-50 bg-gradient-to-r from-gold via-amber-500 to-gold hover:from-amber-600 hover:via-gold hover:to-amber-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg font-bold min-w-[140px] sm:min-w-[160px] pointer-events-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Book Now button clicked - navigating to /book-now');
                      try {
                        navigate('/book-now');
                      } catch (error) {
                        console.error('Navigate failed, using window.location:', error);
                        window.location.href = '/book-now';
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gold transition-colors z-40 pointer-events-auto"
      >
        <ChevronLeft size={32} className="sm:w-12 sm:h-12" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gold transition-colors z-40 pointer-events-auto"
      >
        <ChevronRight size={32} className="sm:w-12 sm:h-12" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40 pointer-events-auto">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-gold" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
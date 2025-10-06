import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import { useHotelData, useRooms, useAmenities, useAttractions, useTestimonials } from "@/hooks/useHotelData";
import AboutSection from "@/components/sections/AboutSection";
import RoomsSection from "@/components/sections/RoomsSection";
import AttractionsSection from "@/components/sections/AttractionsSection";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LocationSection from "@/components/sections/LocationSection";

const Index = () => {
  const { data: hotel } = useHotelData();
  const { data: rooms, isLoading: roomsLoading } = useRooms();
  const { data: amenities, isLoading: amenitiesLoading } = useAmenities();
  const { data: attractions, isLoading: attractionsLoading } = useAttractions();
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream/50 mobile-viewport-fix">
      <Navbar />

      {/* Hero Section with Enhanced Mobile Styling */}
      <section className="relative overflow-hidden mobile-safe-area">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 pointer-events-none z-10"></div>
        <HeroCarousel />
      </section>

      {/* Content Sections with Improved Spacing and Backgrounds */}
      <div className="relative z-20">

        {/* About Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-white via-cream/30 to-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy/5 via-transparent to-transparent"></div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <AboutSection hotel={hotel} />
          </div>
        </section>

        {/* Rooms Section */}
        <section id="rooms" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-l from-cream/50 via-white to-cream/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent"></div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <RoomsSection rooms={rooms} roomsLoading={roomsLoading} />
          </div>
        </section>

        {/* Attractions Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-cream/50 via-white to-gold/5">
          <div className="absolute inset-0 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-transparent via-navy/5 to-transparent"></div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <AttractionsSection attractions={attractions} attractionsLoading={attractionsLoading} />
          </div>
        </section>

        {/* Amenities Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-white via-navy/5 to-white">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-navy/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <AmenitiesSection amenities={amenities} amenitiesLoading={amenitiesLoading} />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-navy/5 via-white to-navy/5">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          </div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <TestimonialsSection testimonials={testimonials} testimonialsLoading={testimonialsLoading} />
          </div>
        </section>

        {/* Location Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-t from-navy/10 via-cream/30 to-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-navy/5"></div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <LocationSection hotel={hotel} />
          </div>
        </section>
      </div>

      <Footer hotel={hotel} />
    </div>
  );
};

export default Index;
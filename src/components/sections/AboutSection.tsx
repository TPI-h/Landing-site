"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, viewportOptions } from "@/utils/animations";

interface AboutSectionProps {
  hotel?: {
    name?: string;
    description?: string;
  };
}



const AboutSection = ({ hotel }: AboutSectionProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      // Get list of files from the bucket
      const { data, error } = await supabase.storage.from("hotel-images").list();

      if (error) {
        console.error("Error fetching images:", error);
        return;
      }

      if (data && data.length > 0) {
        // Get the first image’s public URL
        const { data: publicUrl } = supabase.storage
          .from("hotel-images")
          .getPublicUrl(data[0].name);

        setImageUrl(publicUrl.publicUrl);
      }
    };

    fetchImage();
  }, []);
  return (
    <section className="py-16 bg-gradient-section relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 bg-navy/10 rounded-full blur-2xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 sm:mb-6 px-4">
              About {hotel?.name || "Thendral Park Inn"}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
              {hotel?.description ||
                "A comfortable hotel experience in the heart of Bangalore, Karnataka"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }
              }}
              className="px-4 sm:px-0"
            >
              <motion.h3
                className="text-xl sm:text-2xl font-bold text-navy mb-4 sm:mb-6"
                variants={fadeInUp}
              >
                Our Heritage
              </motion.h3>

              <motion.p
                className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
                variants={fadeInUp}
              >
                For nearly three decades, we have been dedicated to providing
                comfortable accommodations and friendly service to travelers
                from around the world. Our hotel combines traditional hospitality with modern amenities.
              </motion.p>

              <motion.p
                className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
                variants={fadeInUp}
              >
                Located in Bangalore, we serve as your perfect base
                for exploring the vibrant tech city, from business districts to cultural attractions.
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-3 sm:gap-6"
                variants={fadeInUp}
              >
                <motion.div
                  className="text-center p-3 sm:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gold/20"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-gold mb-1">
                    29+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                    Years of Service
                  </div>
                </motion.div>

                <motion.div
                  className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-navy/20"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="text-3xl font-bold text-gold mb-1">
                    50k+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Happy Guests
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={fadeInUp}
              className="relative"
            >
              {imageUrl ? (
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <img
                    src={imageUrl}
                    alt="Hotel"
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Decorative overlay */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <div className="w-8 h-8 bg-gold rounded-full"></div>
                  </div>
                </div>
              ) : (
                <motion.div
                  className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-2xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading image...</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
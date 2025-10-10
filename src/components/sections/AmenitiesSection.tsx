import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Wifi,
  Waves,
  UtensilsCrossed,
  Dumbbell,
  Wind,
  Car,
  Shirt,
  Users,
  Star,
  Building,
  Tv,
  Clock,
  AirVent,
  Snowflake,
  Flower2,
  Bath,
  Bed,
  Shield,
  Zap,
  MapPin
} from "lucide-react";
import { iconMap } from "@/utils/iconMapping";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, floatingCard, waveContainer, waveItem, viewportOptions } from "@/utils/animations";

interface Amenity {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
}

interface AmenitiesSectionProps {
  amenities?: Amenity[];
  amenitiesLoading: boolean;
}

const AmenitiesSection = ({ amenities, amenitiesLoading }: AmenitiesSectionProps) => {
  const getAmenityIcon = (amenity: Amenity) => {
    // Hardcoded mapping based on exact amenity names from the image
    const hardcodedAmenityIcons: Record<string, any> = {
      // Exact matches for amenity names visible in the screenshot
      '24-Hour Front Desk & Room Service': Clock,
      'AC': Snowflake,
      'Air Conditioning': Snowflake,
      'Attached Private Bathrooms': Bath,
      'Central Location': MapPin,
      'Essential amenities': Star,
      'Flat-Screen TV': Tv,
      'Hot Water': Waves, // Using waves for hot water
      'Lift / Elevator Access': Building,
      'Parking': Car,
      'Power Back-up': Zap, // Lightning bolt for power backup
      'Secure & Safe Environment': Shield,
      'Well-Furnished AC Rooms': Bed,
      'Wi-Fi': Wifi,

      // Additional common variations
      'WiFi': Wifi,
      'Free WiFi': Wifi,
      'Free Wi-Fi': Wifi,
      'Swimming Pool': Waves,
      'Restaurant': UtensilsCrossed,
      'Gym': Dumbbell,
      'Fitness': Dumbbell,
      'Room Service': Star,
      'Concierge': Users,
      'Business Center': Building,
      'Conference Hall': Users,
      'Laundry': Shirt,
      'Spa': Flower2,
    };

    // First try exact name match (case-sensitive)
    if (hardcodedAmenityIcons[amenity.name]) {
      return hardcodedAmenityIcons[amenity.name];
    }

    // Try case-insensitive name match
    const exactNameLower = amenity.name.toLowerCase();
    for (const [key, icon] of Object.entries(hardcodedAmenityIcons)) {
      if (key.toLowerCase() === exactNameLower) {
        return icon;
      }
    }

    // Try database icon field if it exists
    if (amenity.icon) {
      const dbIconMapping: Record<string, any> = {
        'Wifi': Wifi,
        'Waves': Waves,
        'UtensilsCrossed': UtensilsCrossed,
        'Dumbbell': Dumbbell,
        'Wind': Snowflake, // Wind for AC
        'Car': Car,
        'Shirt': Shirt,
        'Users': Users,
        'Building': Building,
        'Star': Star,
        'Room': Star,
        'AirVent': AirVent,
        'Snowflake': Snowflake,
        'Tv': Tv,
        'Clock': Clock,
        'Flower2': Flower2,
        'Bath': Bath,
        'Bed': Bed,
        'Shield': Shield,
      };

      if (dbIconMapping[amenity.icon]) {
        return dbIconMapping[amenity.icon];
      }
    }

    // Final fallback
    return CheckCircle;
  };

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Animated background waves */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#wave-gradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(212, 175, 55, 0.1)" />
              <stop offset="50%" stopColor="rgba(17, 24, 39, 0.1)" />
              <stop offset="100%" stopColor="rgba(212, 175, 55, 0.1)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating background elements */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 bg-gold/20 rounded-full blur-xl"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-32 w-16 h-16 bg-navy/20 rounded-full blur-xl"
          animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-24 h-24 bg-amber-400/10 rounded-full blur-xl"
          animate={{ y: [-5, 15, -5], x: [-5, 5, -5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Hotel Amenities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enjoy world-class facilities and services during your stay
          </p>
        </motion.div>

        {amenitiesLoading ? (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold mb-4"></div>
            <p className="text-muted-foreground">Loading amenities...</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            {amenities?.map((amenity, index) => {
              const IconComponent = getAmenityIcon(amenity);
              const isEven = index % 2 === 0;
              const floatDelay = index * 0.5;

              return (
                <motion.div
                  key={amenity.id}
                  variants={floatingCard}
                  whileHover="hover"
                  className="relative"
                >
                  <Card className="p-6 text-center shadow-hover hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border border-gold/20 relative overflow-hidden group">
                    {/* Card glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Floating animation for icons */}
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        duration: 3 + floatDelay,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: floatDelay
                      }}
                      className="relative z-10"
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 p-3 rounded-full ${isEven ? 'bg-gradient-to-br from-gold/20 to-amber-200/20' : 'bg-gradient-to-br from-navy/20 to-blue-200/20'} group-hover:scale-110 transition-all duration-300`}>
                        <IconComponent className={`w-full h-full ${isEven ? 'text-gold' : 'text-navy'} group-hover:scale-110 transition-all duration-300`} />
                      </div>
                    </motion.div>

                    <div className="relative z-10">
                      <h4 className="font-semibold text-navy mb-2 group-hover:text-gold transition-colors duration-300">
                        {amenity.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {amenity.description}
                      </p>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-gold/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-navy/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AmenitiesSection;

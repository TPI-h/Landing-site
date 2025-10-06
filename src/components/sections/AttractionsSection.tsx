import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, cardStack, viewportOptions } from "@/utils/animations";

interface Attraction {
  name: string;
  distance?: string;
  description?: string;
  image_url?: string;
}

interface AttractionsSectionProps {
  attractions?: Attraction[];
  attractionsLoading: boolean;
}

const AttractionsSection = ({ attractions, attractionsLoading }: AttractionsSectionProps) => {
  // Helper function to convert Google Drive URLs to direct image URLs
  const getDirectImageUrl = (url: string): string | null => {
    if (!url || url.trim() === '') return null;

    // Handle Google Drive URLs
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }

    // Handle Google redirect URLs - extract the actual URL
    if (url.includes('google.com/url?') && url.includes('&url=')) {
      try {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const actualUrl = urlParams.get('url');
        if (actualUrl) {
          return decodeURIComponent(actualUrl);
        }
      } catch (e) {
        console.error('Failed to parse Google redirect URL:', e);
      }
    }

    // For direct image URLs, return as-is
    if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i) || url.includes('unsplash.com') || url.includes('images.')) {
      return url;
    }

    // If it's not a recognized format, log a warning
    console.warn('URL may not be a direct image URL:', url);
    return url; // Still try to load it
  };

  // Debug: log attractions data
  console.log('Attractions data:', attractions);
  console.log('Attractions with images:', attractions?.filter(a => a.image_url));

  return (
    <section className="py-16 bg-gradient-section">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Nearby Attractions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the cultural and natural wonders around our location
          </p>
        </motion.div>

        <div className="relative">
          {attractionsLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
              <p className="mt-4 text-muted-foreground">Loading attractions...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {attractions?.map((attraction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -10,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut"
                    }
                  }}
                  className="h-full"
                >
                  <Card className="shadow-card hover:shadow-xl transition-shadow duration-300 h-full bg-white border border-gray-200 hover:border-gold/30 group overflow-hidden">
                    {/* Image Section */}
                    {(() => {
                      const imageUrl = getDirectImageUrl(attraction.image_url || '');
                      return imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={attraction.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              console.error('Failed to load attraction image. Original URL:', attraction.image_url, 'Processed URL:', imageUrl);
                              // Hide image container if it fails to load
                              (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                            }}
                            onLoad={() => {
                              console.log('Successfully loaded attraction image:', imageUrl);
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      );
                    })()}

                    <div className="p-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <div className="p-2 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-colors duration-300">
                          <MapPin className="text-gold" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-navy text-lg mb-1 group-hover:text-gold transition-colors duration-300">
                            {attraction.name}
                          </h3>
                          <p className="text-sm text-gold font-medium bg-gold/10 px-2 py-1 rounded-full inline-block">
                            {attraction.distance} away
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {attraction.description}
                      </p>

                      {/* Simple decorative element */}
                      <div className="mt-4 h-1 w-12 bg-gradient-to-r from-gold to-amber-500 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import poolArea from "@/assets/pool-area.jpg";

interface AboutSectionProps {
  hotel?: {
    name?: string;
    description?: string;
  };
}

const AboutSection = ({ hotel }: AboutSectionProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Placeholder image - high quality hotel exterior
  const placeholderImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center";

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);

      try {
        // Get list of files from the bucket
        const { data, error } = await supabase.storage.from("hotel-images").list();

        if (error) {
          console.error("Error fetching images:", error);
          setImageUrl(placeholderImage);
          setIsLoading(false);
          return;
        }

        if (data && data.length > 0) {
          // Get the first image's public URL
          const { data: publicUrl } = supabase.storage
            .from("hotel-images")
            .getPublicUrl(data[0].name);

          setImageUrl(publicUrl.publicUrl);
        } else {
          // No images in database, use placeholder
          setImageUrl(placeholderImage);
        }
      } catch (error) {
        console.error("Error in fetchImage:", error);
        setImageUrl(placeholderImage);
      }

      setIsLoading(false);
    };

    fetchImage();
  }, [placeholderImage]);
  return (
    <section className="py-16 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">About {hotel?.name || "Thendral Park Inn"}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {hotel?.description || "A luxury hotel experience in the heart of Villupuram, Tamil Nadu"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-4">Our Heritage</h3>
              <p className="text-muted-foreground mb-6">
                For nearly three decades, we have been dedicated to providing exceptional accommodations and
                personalized service to travelers from around the world. Our hotel combines traditional Tamil
                hospitality with modern luxury amenities.
              </p>
              <p className="text-muted-foreground mb-6">
                Located in the heart of Villupuram, we serve as your perfect base for exploring the rich
                cultural heritage of Tamil Nadu, from ancient temples to pristine beaches.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">29+</div>
                  <div className="text-sm text-muted-foreground">Years of Service</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">50k+</div>
                  <div className="text-sm text-muted-foreground">Happy Guests</div>
                </div>
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg shadow-card">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading image...</p>
                  </div>
                </div>
              ) : (
                <img
                  src={imageUrl || placeholderImage}
                  alt="Hotel"
                  className="rounded-lg shadow-card w-full h-96 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = placeholderImage;
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
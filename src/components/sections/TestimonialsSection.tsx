import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

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
    <section className="py-16 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Guest Reviews</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What our guests say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsLoading ? (
            <div className="col-span-3 text-center py-8">Loading testimonials...</div>
          ) : (
            (testimonials ?? []).slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} className="p-6 shadow-card hover:shadow-hover transition-all duration-300 relative">
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
    </section>
  );
};

export default TestimonialsSection;
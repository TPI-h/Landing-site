import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGalleryImages } from "@/hooks/useHotelData";

const Gallery = () => {
  const { data: galleryImages, isLoading } = useGalleryImages();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <section className="bg-gradient-section py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-navy mb-4">
              Hotel Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our beautiful spaces and luxurious accommodations
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                <p className="mt-4 text-muted-foreground">Loading gallery...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryImages?.map((image, index) => (
                  <Card key={image.id} className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group">
                    <div className="relative">
                      {image.image_url ? (
                        <img
                          src={image.image_url}
                          alt={image.title || `Gallery Image ${index + 1}`}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No Image Available</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      {image.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Badge variant="secondary" className="bg-white/90 text-black">
                            {image.title}
                          </Badge>
                          {image.category && (
                            <p className="text-white text-sm mt-1 capitalize">
                              {image.category}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && (!galleryImages || galleryImages.length === 0) && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No images found in the gallery.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gallery;
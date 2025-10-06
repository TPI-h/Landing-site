import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useHotelData, useTestimonials } from "@/hooks/useHotelData";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MapPin, Users, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, scaleIn, viewportOptions } from "@/utils/animations";

// Placeholder images
const placeholderImages = {
    hotelExterior: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center",
    deluxeRoom: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop&crop=center",
    hotelLobby: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&crop=center"
};

const WhyTPI = () => {
    const { data: hotel } = useHotelData();
    const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();
    const [aboutImageUrl, setAboutImageUrl] = useState<string | null>(null);

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

    useEffect(() => {
        const fetchAboutImage = async () => {
            // Get list of files from the bucket
            const { data, error } = await supabase.storage.from("hotel-images").list();

            if (error) {
                console.error("Error fetching images:", error);
                return;
            }

            if (data && data.length > 0) {
                // Try to find a lobby image first, then any image
                const lobbyImage = data.find(file => file.name.toLowerCase().includes('lobby'));
                const selectedImage = lobbyImage || data[0];

                const { data: publicUrl } = supabase.storage
                    .from("hotel-images")
                    .getPublicUrl(selectedImage.name);

                setAboutImageUrl(publicUrl.publicUrl);
            }
        };

        fetchAboutImage();
    }, []);

    // Helper function to convert Google Drive URLs to direct image URLs (same as home page)
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

        // If it's not a recognized format, return as-is and let browser handle it
        return url;
    };

    const reasons = [
        {
            title: "Clean & Comfortable",
            description: "Simple, well-maintained rooms with all essential amenities for a comfortable stay.",
            icon: <Heart className="w-10 h-10 text-gold" />
        },
        {
            title: "Great Location",
            description: "Conveniently located in Bangalore with easy access to key areas and transportation.",
            icon: <MapPin className="w-10 h-10 text-navy" />
        },
        {
            title: "Value for Money",
            description: "Quality accommodation at honest, competitive rates that offer great value.",
            icon: <Star className="w-10 h-10 text-gold" />
        },
        {
            title: "Friendly Service",
            description: "Warm, personalized service that makes you feel at home during your stay.",
            icon: <Users className="w-10 h-10 text-navy" />
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream via-white to-cream/50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-r from-navy/10 via-white to-gold/10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-navy/10"></div>

                {/* Floating background elements */}
                <motion.div
                    className="absolute top-20 left-20 w-20 h-20 bg-gold/20 rounded-full blur-xl"
                    animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-24 h-24 bg-navy/20 rounded-full blur-xl"
                    animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <Badge className="mb-6 bg-gradient-to-r from-gold to-amber-500 text-white px-6 py-2 text-lg font-medium">
                                Why Choose Us
                            </Badge>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-navy via-navy-light to-navy bg-clip-text text-transparent mb-6"
                            variants={fadeInUp}
                        >
                            Why Thendral Park Inn?
                        </motion.h1>

                        <motion.p
                            className="text-xl text-muted-foreground leading-relaxed"
                            variants={fadeInUp}
                        >
                            Discover what makes TPI the preferred choice for modern travelers seeking comfort, convenience, and exceptional value.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* About Our Hotel */}
            <section className="py-20 bg-gradient-to-l from-cream/50 via-white to-cream/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                            About Our Hotel
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            A comfortable place to stay with everything you need for a pleasant visit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-navy">Our Rooms</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We offer clean, comfortable rooms with modern amenities. Each room is well-maintained
                                    with air conditioning, private bathrooms, and all the basics you need for a good night's rest.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-navy">Our Service</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our friendly staff is here to help make your stay comfortable. We provide 24-hour front desk
                                    service, housekeeping, and are always ready to assist with local information and directions.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold text-navy">Our Commitment</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We believe in providing honest value - a clean, safe, and comfortable place to stay at
                                    fair prices. No fancy frills, just good hospitality and genuine care for our guests.
                                </p>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative">
                            <Card className="overflow-hidden shadow-hover hover:shadow-xl transition-all duration-500">
                                <img
                                    src={aboutImageUrl || placeholderImages.hotelLobby}
                                    alt="Hotel About"
                                    className="w-full h-96 object-cover"
                                    onError={(e) => {
                                        // If the database image fails to load, fallback to placeholder
                                        (e.target as HTMLImageElement).src = placeholderImages.hotelLobby;
                                    }}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose TPI Grid */}
            <section className="py-20 bg-gradient-to-r from-navy/5 via-white to-navy/5 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-40 h-40 bg-navy/10 rounded-full blur-2xl"
                        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
                        <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                            Four Compelling Reasons
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Experience the perfect blend of comfort, convenience, and value that sets us apart.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOptions}
                        variants={staggerContainer}
                    >
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                whileHover={{
                                    scale: 1.05,
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <Card className="p-8 shadow-card hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br from-white to-cream/30 relative overflow-hidden border border-gold/20">
                                    {/* Card background effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="text-center space-y-6 relative z-10">
                                        <motion.div
                                            className="mx-auto w-20 h-20 bg-gradient-to-br from-gold/20 to-navy/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {reason.icon}
                                        </motion.div>

                                        <h3 className="text-2xl font-bold text-navy group-hover:text-gold transition-colors duration-300">
                                            {reason.title}
                                        </h3>

                                        <p className="text-muted-foreground leading-relaxed">
                                            {reason.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Simple Features */}
            <section className="py-20 bg-gradient-to-br from-cream/50 via-white to-gold/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                            What We Offer
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Simple amenities for a comfortable stay.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="p-6 text-center shadow-hover hover:shadow-xl transition-all duration-300 bg-white/80">
                            <Heart className="w-8 h-8 text-gold mx-auto mb-4" />
                            <h4 className="font-semibold text-navy mb-2">Clean Rooms</h4>
                            <p className="text-sm text-muted-foreground">Well-maintained and hygienic</p>
                        </Card>

                        <Card className="p-6 text-center shadow-hover hover:shadow-xl transition-all duration-300 bg-white/80">
                            <MapPin className="w-8 h-8 text-navy mx-auto mb-4" />
                            <h4 className="font-semibold text-navy mb-2">Good Location</h4>
                            <p className="text-sm text-muted-foreground">Easy access to main areas</p>
                        </Card>

                        <Card className="p-6 text-center shadow-hover hover:shadow-xl transition-all duration-300 bg-white/80">
                            <Star className="w-8 h-8 text-gold mx-auto mb-4" />
                            <h4 className="font-semibold text-navy mb-2">Fair Pricing</h4>
                            <p className="text-sm text-muted-foreground">Honest rates for quality stay</p>
                        </Card>

                        <Card className="p-6 text-center shadow-hover hover:shadow-xl transition-all duration-300 bg-white/80">
                            <Users className="w-8 h-8 text-navy mx-auto mb-4" />
                            <h4 className="font-semibold text-navy mb-2">Helpful Staff</h4>
                            <p className="text-sm text-muted-foreground">Friendly and responsive service</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* What Our Guests Say */}
            <section className="py-20 bg-gradient-to-br from-navy/5 via-white to-gold/5">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                            What Our Guests Say
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Real experiences from guests who have stayed with us.
                        </p>
                    </div>

                    {testimonialsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-6 animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials?.slice(0, 6).map((testimonial, index) => (
                                <Card key={index} className="p-6 shadow-hover hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm relative">
                                    {/* Image positioned in middle-right */}
                                    {(() => {
                                        const imageUrl = getDirectImageUrl(testimonial.image_url || '');
                                        return imageUrl && (
                                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-20 h-20 rounded-full overflow-hidden border-3 border-gold/30 shadow-lg">
                                                <img
                                                    src={imageUrl}
                                                    alt={testimonial.guest_name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        console.error('Failed to load testimonial image. Original URL:', testimonial.image_url, 'Processed URL:', imageUrl);
                                                        // Hide image if it fails to load
                                                        (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                                                    }}
                                                    onLoad={() => {
                                                        console.log('Successfully loaded testimonial image:', imageUrl);
                                                    }}
                                                />
                                            </div>
                                        );
                                    })()}

                                    <div className="flex items-center mb-4">
                                        <Quote className="w-8 h-8 text-gold mr-2" />
                                    </div>
                                    <p className="text-navy/80 italic mb-4 leading-relaxed pr-20">
                                        "{testimonial.review_text}"
                                    </p>
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-semibold text-navy">{testimonial.guest_name}</p>
                                            <div className="flex text-gold">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-navy via-navy-light to-navy relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Ready to Experience TPI?
                        </h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Join thousands of satisfied guests who have made Thendral Park Inn their home away from home.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/book-now"
                                className="px-8 py-4 bg-gradient-to-r from-gold via-amber-500 to-gold text-white font-semibold rounded-xl hover:from-amber-600 hover:via-gold hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Book Your Stay Now
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-navy transition-all duration-300 hover:scale-105"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer hotel={hotel} />
        </div>
    );
};

export default WhyTPI;
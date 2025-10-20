import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useHotelData, useRooms, useAmenities } from "@/hooks/useHotelData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RoomDetailModal from "@/components/RoomDetailModal";
import {
    Wifi,
    Car,
    Coffee,
    Tv,
    Wind,
    Users,
    Bed,
    Bath,
    Star,
    MapPin
} from "lucide-react";
import { iconMap } from "@/utils/iconMapping";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, scaleIn, viewportOptions } from "@/utils/animations";
import Amenities from "@/components/sections/AmenitiesSection";
import RoomsSection from "@/components/sections/RoomsSection";

interface Room {
    id: string;
    name: string;
    description?: string;
    price?: number;
    max_occupancy?: number;
    room_size?: string;
    image_url?: string;
    images?: string[];
    amenities?: string[];
}

const Rooms = () => {
    const { data: hotel, error: hotelError } = useHotelData();
    const { data: rooms, isLoading: roomsLoading, error: roomsError } = useRooms();
    const { data: amenities, isLoading: amenitiesLoading, error: amenitiesError } = useAmenities();

    // Debug: Log rooms data
    console.log('Rooms data:', rooms);

    // Error state
    if (roomsError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading rooms</h2>
                <p className="text-muted-foreground">{roomsError.message || 'Please try again later.'}</p>
            </div>
        );
    }

    // Empty state
    if (!roomsLoading && (!rooms || rooms.length === 0)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-navy mb-4">No rooms available</h2>
                <p className="text-muted-foreground">Please check back later or contact us for more information.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream via-white to-gold/10">
            <Navbar />

            {/* Hero Section */}
            <section className="py-32 bg-gradient-to-r from-navy/90 via-navy-light/90 to-navy/90 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/src/assets/hotel-exterior.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy-light/80 to-navy/80"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-white">
                            Our <span className="text-gold">Rooms</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                            Clean, comfortable accommodation designed for your needs
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-white/80">
                            <MapPin className="w-5 h-5" />
                            <span>Villupuram, Tamil Nadu</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rooms Grid using RoomsSection */}
            <RoomsSection rooms={rooms && !Array.isArray(rooms) ? [] : rooms} roomsLoading={roomsLoading} />

            {/* Hotel Amenities Section */}
            <Amenities
                amenities={Array.isArray(amenities) ? amenities.filter(a => typeof a === 'object' && a !== null && 'id' in a && 'name' in a) : []}
                amenitiesLoading={amenitiesLoading}
            />

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-navy via-navy-light to-navy relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Ready to Book Your Room?
                        </h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Choose from our comfortable rooms and enjoy a pleasant stay in Villupuram.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="px-8 py-4 bg-gradient-to-r from-gold via-amber-500 to-gold text-white font-semibold rounded-xl hover:from-amber-600 hover:via-gold hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                onClick={() => window.location.href = '/book-now'}
                            >
                                Book Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-300 hover:scale-105"
                                onClick={() => window.location.href = '/contact'}
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer hotel={hotel && typeof hotel === 'object' && !Array.isArray(hotel) ? hotel : undefined} />
        </div>
    );
};

export default Rooms;
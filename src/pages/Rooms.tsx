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
    const { data: hotel } = useHotelData();
    const { data: rooms, isLoading: roomsLoading } = useRooms();
    const { data: amenities, isLoading: amenitiesLoading } = useAmenities();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRoomClick = (room: Room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRoom(null);
    };

    const getAmenityIcon = (amenityName: string) => {
        const normalizedName = amenityName.toLowerCase().trim();
        const IconComponent = iconMap[normalizedName] || Star;
        return <IconComponent className="w-4 h-4" />;
    };

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

            {/* Rooms Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                            Choose Your Stay
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            All our rooms come with essential amenities for a comfortable stay at honest prices.
                        </p>
                    </div>

                    {roomsLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="overflow-hidden animate-pulse">
                                    <div className="h-64 bg-gray-200"></div>
                                    <CardContent className="p-6">
                                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {rooms?.map((room, index) => (
                                <Card
                                    key={room.id}
                                    className="overflow-hidden shadow-hover hover:shadow-xl transition-all duration-500 group cursor-pointer"
                                    onClick={() => handleRoomClick(room)}
                                >
                                    {/* Room Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        {room.image_url ? (
                                            <img
                                                src={room.image_url}
                                                alt={room.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-navy/20 to-gold/20 flex items-center justify-center">
                                                <Bed className="w-16 h-16 text-navy/50" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                                                <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                                                <p className="text-sm">Click to view details</p>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-gold text-white">
                                                ₹{room.price}/night
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Room Details */}
                                    <CardContent className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-navy">{room.name}</h3>
                                            <p className="text-muted-foreground">{room.description}</p>
                                        </div>

                                        {/* Room Specs */}
                                        <div className="flex items-center space-x-4 text-sm text-navy/70">
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4" />
                                                <span>Max {room.max_occupancy} guests</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Bed className="w-4 h-4" />
                                                <span>{room.room_size || "Standard Room"}</span>
                                            </div>
                                        </div>

                                        {/* Amenities */}
                                        {room.amenities && room.amenities.length > 0 && (
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-navy">Amenities:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {room.amenities.slice(0, 4).map((amenity: string, idx: number) => (
                                                        <div key={idx} className="flex items-center space-x-1 text-xs bg-navy/5 px-2 py-1 rounded-full">
                                                            {getAmenityIcon(amenity)}
                                                            <span>{amenity}</span>
                                                        </div>
                                                    ))}
                                                    {room.amenities.length > 4 && (
                                                        <span className="text-xs text-muted-foreground">
                                                            +{room.amenities.length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Pricing and Booking */}
                                        <div className="pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-2xl font-bold text-navy">₹{room.price}</p>
                                                    <p className="text-sm text-muted-foreground">per night</p>
                                                </div>
                                                <Button
                                                    className="bg-gradient-to-r from-gold to-amber-500 hover:from-amber-600 hover:to-gold text-white"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.location.href = '/book-now';
                                                    }}
                                                >
                                                    Book Now
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Hotel Amenities Section */}
            <Amenities amenities={amenities || []} isLoading={amenitiesLoading} />
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

            {/* Room Detail Modal */}
            <RoomDetailModal
                room={selectedRoom}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />

            <Footer hotel={hotel} />
        </div>
    );
};

export default Rooms;
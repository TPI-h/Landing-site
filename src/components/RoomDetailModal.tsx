import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { MapPin, Users, Square, Star, Wifi, Car, Coffee, Bath, Tv, Phone, CheckCircle, X } from "lucide-react";
import { iconMap } from "@/utils/iconMapping";

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

interface RoomDetailModalProps {
    room: Room | null;
    isOpen: boolean;
    onClose: () => void;
}

const RoomDetailModal = ({ room, isOpen, onClose }: RoomDetailModalProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/book-now");
        onClose(); // Close the modal when navigating
    };

    if (!room) return null;

    // Get all images for the room (primary image + additional images)
    const allImages = room.images && room.images.length > 0
        ? room.images
        : room.image_url
            ? [room.image_url]
            : [];

    // Filter out empty amenities
    const validAmenities = (room.amenities ?? [])
        .filter((amenity) => {
            if (!amenity) return false;
            if (typeof amenity !== 'string') return false;
            if (amenity.trim() === "") return false;
            return true;
        });

    const getAmenityIcon = (amenity: string) => {
        // Only use name-based lookup (ignore any database icon field)
        const normalizedAmenity = amenity.toLowerCase().trim();
        const IconComponent = iconMap[normalizedAmenity];
        return IconComponent ? IconComponent : CheckCircle;
    }; return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-navy">{room.name}</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Image Gallery Section */}
                    <div className="space-y-4">
                        {allImages.length > 0 ? (
                            <>
                                {/* Main Image */}
                                <div className="relative">
                                    <img
                                        src={allImages[selectedImageIndex]}
                                        alt={`${room.name} - Image ${selectedImageIndex + 1}`}
                                        className="w-full h-80 object-cover rounded-lg"
                                    />
                                    <Badge className="absolute top-4 right-4 bg-gold text-primary-foreground">
                                        From ₹{room.price}/night
                                    </Badge>
                                </div>

                                {/* Image Thumbnails */}
                                {allImages.length > 1 && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {allImages.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImageIndex(index)}
                                                className={`relative overflow-hidden rounded-md transition-all duration-200 ${selectedImageIndex === index
                                                    ? 'ring-2 ring-gold'
                                                    : 'hover:opacity-80'
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${room.name} thumbnail ${index + 1}`}
                                                    className="w-full h-20 object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg">
                                <span className="text-gray-500">No Images Available</span>
                            </div>
                        )}
                    </div>

                    {/* Room Details Section */}
                    <div className="space-y-6">
                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-navy mb-2">Description</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {room.description || "Experience comfort and luxury in this beautifully appointed room."}
                            </p>
                        </div>

                        {/* Room Features */}
                        <div>
                            <h3 className="text-lg font-semibold text-navy mb-3">Room Features</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {room.max_occupancy && (
                                    <div className="flex items-center space-x-2">
                                        <Users className="text-gold" size={20} />
                                        <span className="text-sm">Up to {room.max_occupancy} guests</span>
                                    </div>
                                )}
                                {room.room_size && room.room_size.trim() !== "" && (
                                    <div className="flex items-center space-x-2">
                                        <Square className="text-gold" size={20} />
                                        <span className="text-sm">{room.room_size}</span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <Star className="text-gold" size={20} />
                                    <span className="text-sm">Premium amenities</span>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        {validAmenities.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-navy mb-3">Amenities</h3>
                                <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                                    {validAmenities.map((amenity, index) => {
                                        const IconComponent = getAmenityIcon(amenity);
                                        return (
                                            <div key={index} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50">
                                                <IconComponent className="text-gold flex-shrink-0" size={16} />
                                                <span className="text-sm capitalize">{amenity.trim()}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Pricing */}
                        <div className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-muted-foreground">Price per night</span>
                                <span className="text-2xl font-bold text-navy">₹{room.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                *Prices may vary based on season and availability
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90"
                                onClick={handleBookNow}
                            >
                                Book This Room
                            </Button>
                            <Button variant="outline" className="w-full" onClick={onClose}>
                                Continue Browsing
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RoomDetailModal;
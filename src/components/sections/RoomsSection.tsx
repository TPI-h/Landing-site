import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Ruler } from "lucide-react";
import InstantBookingModal from "@/components/InstantBookingModal";

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

interface RoomsSectionProps {
  rooms?: Room[];
  roomsLoading: boolean;
}

const RoomsSection = ({ rooms, roomsLoading }: RoomsSectionProps) => {

  // Debug: Log rooms data to see amenities content
  console.log("Rooms with amenities:", rooms?.map(room => ({
    name: room.name,
    amenities: room.amenities,
    amenitiesLength: room.amenities?.length,
    amenitiesDetails: room.amenities?.map((a, i) => ({ index: i, value: a, type: typeof a, length: a?.length }))
  })));

  return (
    <section id="rooms" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 sm:mb-6 px-4">Our Rooms</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            Choose from our selection of elegantly appointed rooms and suites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {roomsLoading ? (
            <div className="col-span-3 text-center py-8">Loading rooms...</div>
          ) : (
            rooms?.map((room, index) => (
              <Card
                key={room.id}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br from-white via-cream/20 to-white transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="relative">
                  {room.image_url ? (
                    <img
                      src={room.image_url}
                      alt={room.name}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Image Available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{room.name}</h3>
                      <InstantBookingModal roomType={room.name}>
                        <Button className="bg-gradient-to-r from-gold to-amber-500 hover:from-amber-600 hover:to-gold text-white shadow-xl">
                          <Zap className="w-4 h-4 mr-2" />
                          Instant Book
                        </Button>
                      </InstantBookingModal>
                    </div>
                  </div>
                  <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-gold to-amber-500 text-white shadow-lg text-xs sm:text-sm">
                    From ₹{room.price}/night
                  </Badge>
                </div>

                {/* Room Details Card */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-navy group-hover:text-gold transition-colors duration-300">{room.name}</h3>
                    <Badge variant="outline" className="text-gold border-gold text-xs sm:text-sm self-start sm:self-auto">
                      ₹{room.price}/night
                    </Badge>
                  </div>

                  {room.description && (
                    <p className="text-muted-foreground mb-3 sm:mb-4 text-sm leading-relaxed line-clamp-2">{room.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm text-muted-foreground">
                    {room.max_occupancy && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Max {room.max_occupancy} guests</span>
                      </div>
                    )}
                    {room.room_size && (
                      <div className="flex items-center gap-1">
                        <Ruler className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{room.room_size}</span>
                      </div>
                    )}
                  </div>

                  <InstantBookingModal roomType={room.name}>
                    <Button className="w-full bg-gradient-to-r from-gold to-amber-500 hover:from-amber-600 hover:to-gold text-white shadow-lg hover:shadow-xl transition-all duration-300 py-2.5 sm:py-3 text-sm sm:text-base font-semibold">
                      <Zap className="w-4 h-4 mr-2" />
                      Book This Room
                    </Button>
                  </InstantBookingModal>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
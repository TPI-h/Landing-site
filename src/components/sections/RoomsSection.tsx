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
    <section id="rooms" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Our Rooms</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of elegantly appointed rooms and suites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roomsLoading ? (
            <div className="col-span-3 text-center py-8">Loading rooms...</div>
          ) : (
            rooms?.map((room, index) => (
              <Card
                key={room.id}
                className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group"
              >
                <div className="relative">
                  {room.image_url ? (
                    <img
                      src={room.image_url}
                      alt={room.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                      <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                      <InstantBookingModal roomType={room.name}>
                        <Button className="bg-gold hover:bg-gold/90 text-white">
                          <Zap className="w-4 h-4 mr-2" />
                          Instant Book
                        </Button>
                      </InstantBookingModal>
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-gold text-primary-foreground">
                    From ₹{room.price}/night
                  </Badge>
                </div>

                {/* Room Details Card */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-navy">{room.name}</h3>
                    <Badge variant="outline" className="text-gold border-gold">
                      ₹{room.price}/night
                    </Badge>
                  </div>

                  {room.description && (
                    <p className="text-muted-foreground mb-4 text-sm">{room.description}</p>
                  )}

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    {room.max_occupancy && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Max {room.max_occupancy} guests</span>
                      </div>
                    )}
                    {room.room_size && (
                      <div className="flex items-center gap-1">
                        <Ruler className="w-4 h-4" />
                        <span>{room.room_size}</span>
                      </div>
                    )}
                  </div>

                  <InstantBookingModal roomType={room.name}>
                    <Button className="w-full bg-gold hover:bg-gold/90 text-white">
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
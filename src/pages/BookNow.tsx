import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Phone, Mail, Zap } from "lucide-react";
import { useHotelData } from "@/hooks/useHotelData";
import InstantBookingModal from "@/components/InstantBookingModal";

const BookNow = () => {
  const { data: hotel, isLoading } = useHotelData();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <section className="bg-gradient-section py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-navy mb-4">
              Book Your Stay
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred booking platform for the best rates and availability
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Enhanced Booking Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              {/* Instant Booking Card */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-gold/10 via-white to-gold/5 border-2 border-gold/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-12 text-center space-y-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Zap className="text-white drop-shadow-md" size={48} />
                    </div>
                    <div className="absolute -inset-2 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-navy to-blue-800 bg-clip-text text-transparent">
                      Instant Booking
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Book directly through our reservation system for <span className="text-gold font-semibold">immediate confirmation</span> and <span className="text-gold font-semibold">best rates</span>
                    </p>
                  </div>

                  <div className="pt-4">
                    <InstantBookingModal>
                      <Button className="bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/90 hover:to-yellow-500/90 text-white w-full py-6 text-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group/btn">
                        <Zap className="mr-3 group-hover/btn:animate-pulse" size={24} />
                        Book Now
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-xl"></div>
                      </Button>
                    </InstantBookingModal>
                  </div>
                </div>
              </Card>

              {/* Group Bookings Card */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-navy/5 via-white to-blue-50 border-2 border-navy/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-br from-navy/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-12 text-center space-y-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-navy to-blue-700 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Users className="text-white drop-shadow-md" size={48} />
                    </div>
                    <div className="absolute -inset-2 bg-navy/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-navy to-blue-800 bg-clip-text text-transparent">
                      Group Bookings
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      <span className="text-navy font-semibold">Special rates</span> for groups, weddings, and corporate events with personalized service
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="border-2 border-navy text-navy hover:bg-navy hover:text-white w-full py-6 text-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group/btn"
                      onClick={() => window.location.href = "/contact"}
                    >
                      <Users className="mr-3 group-hover/btn:animate-pulse" size={24} />
                      Contact for Groups
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Enhanced Contact Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-gold/10 via-transparent to-navy/10 rounded-2xl p-8 border border-gold/20">
                <h4 className="text-2xl font-bold text-navy mb-4">Prefer Direct Contact?</h4>
                <p className="text-muted-foreground text-lg mb-6">
                  Our reservations team is ready to assist you with personalized service
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                      <Phone className="text-white" size={20} />
                    </div>
                    <span className="text-navy font-semibold text-lg">thendralparkinn@gmail.com</span>
                  </div>

                  <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center">
                      <Mail className="text-white" size={20} />
                    </div>
                    <span className="text-navy font-semibold text-lg">+91 8248043002</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookNow;

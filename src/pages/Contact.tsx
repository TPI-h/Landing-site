import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useHotelData } from "@/hooks/useHotelData";
import { sendBookingEmail, BookingFormData } from "@/utils/emailService";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const { data: hotel } = useHotelData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    roomType: "",
    specialRequests: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendBookingEmail(formData as BookingFormData);

      toast({
        title: "Booking Request Submitted Successfully!",
        description: "We've received your booking request and will contact you soon to confirm your reservation.",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: "",
        roomType: "",
        specialRequests: "",
      });
    } catch (error) {
      toast({
        title: "Failed to Submit Booking Request",
        description: "There was an error sending your booking request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <section className="bg-gradient-section py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-navy mb-4">
              Contact & Booking
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with us for reservations and inquiries
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-navy mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="text-gold mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-foreground">Address</h3>
                        <p className="text-muted-foreground">
                          {hotel?.address || "Loading address..."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="text-gold mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-foreground">Phone</h3>
                        <p className="text-muted-foreground">{hotel?.phone || "Loading..."}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="text-gold mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <p className="text-muted-foreground">{hotel?.email || "Loading..."}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="text-gold mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-foreground">Reception Hours</h3>
                        <p className="text-muted-foreground">24/7 Reception & Concierge</p>
                        <p className="text-muted-foreground">Check-in: 1:00 PM</p>
                        <p className="text-muted-foreground">Check-out: 12:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <Card className="p-8 shadow-card">
                <h2 className="text-2xl font-bold text-navy mb-6">Booking Request</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn">Check-in Date *</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => handleChange("checkIn", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out Date *</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => handleChange("checkOut", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Select onValueChange={(value) => handleChange("guests", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                          <SelectItem value="5+">5+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="roomType">Room Type</Label>
                      <Select onValueChange={(value) => handleChange("roomType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Executive</SelectItem>
                          <SelectItem value="deluxe">Mini Suite</SelectItem>
                          <SelectItem value="suite">Suite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requests or requirements..."
                      value={formData.specialRequests}
                      onChange={(e) => handleChange("specialRequests", e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      "Submit Booking Request"
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Our Location</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Conveniently located in Villupuram, Tamil Nadu
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-navy mb-6">Get Directions</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-gold mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-foreground">Address</h4>
                      <p className="text-muted-foreground">
                        {hotel?.address || "Loading address..."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-gold/10">
                    <h4 className="font-semibold text-navy mb-2">Transportation</h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>• Villupuram Railway Station: 2 km</li>
                      <li>• Chennai International Airport: 160 km</li>
                      <li>• Pondicherry: 35 km</li>
                      <li>• Villupuram Bus Stand: 1.5 km</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-gold/10 mt-4">
                    <h4 className="font-semibold text-navy mb-2">Contact Information</h4>
                    <div className="text-muted-foreground space-y-2 text-sm">
                      <p><strong>Phone:</strong> {hotel?.phone || "Loading..."}</p>
                      <p><strong>Email:</strong> {hotel?.email || "Loading..."}</p>
                      <p><strong>Front Desk:</strong> Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6 shadow-card">
                <div className="rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.424356100824!2d79.48622497559515!3d11.945093988283851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53572f0485d38d%3A0xd30a79f940266e08!2sVSB%20SQUARES%3A%20Thendral%20Park%20Inn!5e0!3m2!1sen!2sin!4v1758779740450!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Thendral Park Inn Location"
                  />
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;

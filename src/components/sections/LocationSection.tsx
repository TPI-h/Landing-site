import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface Hotel {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface LocationSectionProps {
  hotel?: Hotel;
}

const LocationSection = ({ hotel }: LocationSectionProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">Our Location</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conveniently located in Bangalore
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

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold text-navy mb-2">Transportation</h4>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Bangalore City Railway Station: 3 km</li>
                  <li>• Kempegowda International Airport: 35 km</li>
                  <li>• Electronic City: 12 km</li>
                  <li>• Majestic Bus Stand: 4 km</li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg mt-4">
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
  );
};

export default LocationSection;
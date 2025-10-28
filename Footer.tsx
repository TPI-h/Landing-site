import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import logo from "@/assert/logo.png";

interface Hotel {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface FooterProps {
  hotel?: Hotel;
}

const Footer = ({ hotel }: FooterProps) => {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Hotel Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold text-gold mb-3 sm:mb-4">{hotel?.name || "Thendral Park Inn"}</h3>
            <p className="mb-3 sm:mb-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              Experience luxury and comfort in the heart of Villupuram. Your perfect getaway awaits.
            </p>
            <div className="flex space-x-4 mb-4 sm:mb-6">
              <Facebook className="w-5 h-5 text-gray-300 hover:text-gold cursor-pointer transition-colors hover:scale-110 transform" />
              <Instagram className="w-5 h-5 text-gray-300 hover:text-gold cursor-pointer transition-colors hover:scale-110 transform" />
              <Twitter className="w-5 h-5 text-gray-300 hover:text-gold cursor-pointer transition-colors hover:scale-110 transform" />
            </div>

            {/* Logo below Thendral Park Inn */}
            <div className="flex justify-start">
              <img
                src={logo}
                alt="Thendral Park Inn"
                className="h-20 sm:h-25 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-gold transition-colors text-sm sm:text-base">Home</Link></li>
              <li><Link to="/rooms" className="text-gray-300 hover:text-gold transition-colors text-sm sm:text-base">Rooms</Link></li>
              <li><Link to="/why-tpi" className="text-gray-300 hover:text-gold transition-colors text-sm sm:text-base">Why TPI</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-gold transition-colors text-sm sm:text-base">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link></li>
              <li><Link to="/book-now" className="text-gray-300 hover:text-gold transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>24/7 Room Service</li>
              <li>Free WiFi</li>
              <li>Business Center</li>
              <li>Event Facilities</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  {hotel?.address || "Loading address..."}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-gray-300">{hotel?.phone || "Loading..."}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-gray-300">{hotel?.email || "Loading..."}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Thendral Park Inn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
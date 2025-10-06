import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assert/logo.png";
import pillayar from "@/assert/pillayar.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Why TPI", path: "/why-tpi" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
      ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50'
      : 'bg-gradient-to-r from-white/80 via-white/90 to-white/80 backdrop-blur-md shadow-lg border-b border-border'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">

          {/* Left Branding - Pillayar at the very left */}
          <div className="flex items-center group">
            <Link
              to="/"
              className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            >
              {/* Pillayar Image at Left End */}
              <div className="relative">
                <img
                  src={pillayar}
                  alt="Pillayar"
                  className="h-8 md:h-10 w-auto filter drop-shadow-sm group-hover:drop-shadow-lg transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Hotel Name with Gradient - Bigger Size */}
              <div className="text-left">
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-navy via-navy to-navy bg-clip-text text-transparent group-hover:from-gold group-hover:via-gold group-hover:to-amber-600 transition-all duration-500 leading-none">
                  Thendral Park Inn
                </h1>
                <div className="h-0.5 w-0 bg-gradient-to-r from-gold to-amber-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 font-medium transition-all duration-300 group ${isActive(item.path)
                  ? 'text-navy'
                  : 'text-gray-700 hover:text-navy'
                  }`}
              >
                <span className="relative z-10">{item.name}</span>

                {/* Animated Background */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${isActive(item.path)
                  ? 'bg-gradient-to-r from-gold/20 to-amber-200/20 scale-100'
                  : 'bg-gradient-to-r from-navy/10 to-navy/5 scale-0 group-hover:scale-100'
                  }`}></div>

                {/* Active Indicator */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${isActive(item.path)
                  ? 'w-full bg-gradient-to-r from-gold to-amber-500'
                  : 'w-0 bg-gradient-to-r from-navy to-navy group-hover:w-full'
                  }`}></div>
              </Link>
            ))}

            {/* Book Now Button */}
            <Link
              to="/book-now"
              className="relative px-6 py-3 font-semibold text-white rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold via-amber-500 to-gold group-hover:from-amber-600 group-hover:via-gold group-hover:to-amber-600 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">Book Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 rounded-lg text-gray-700 hover:text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all duration-300"
            >
              <div className="w-6 h-6 relative">
                <Menu className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out ${isOpen
        ? 'max-h-96 opacity-100'
        : 'max-h-0 opacity-0'
        } overflow-hidden`}>
        <div className="px-4 pt-4 pb-6 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-lg border-t border-gray-200/50">

          {/* Mobile Navigation Items */}
          <div className="space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${isActive(item.path)
                  ? 'bg-gradient-to-r from-gold/20 to-amber-200/20 text-navy border border-gold/30'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-navy/10 hover:to-navy/5 hover:text-navy'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Book Now Button */}
            <Link
              to="/book-now"
              onClick={() => setIsOpen(false)}
              className="block w-full mt-4 px-6 py-4 font-semibold text-white text-center rounded-xl bg-gradient-to-r from-gold via-amber-500 to-gold hover:from-amber-600 hover:via-gold hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createInstagramProfileLink } from '@/config/social';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 smooth-transition hover:scale-105"
          >
            <img 
              src="public/logo.png" 
              alt="Peoni Beauty Logo" 
              className="h-20 w-auto object-contain invert" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`smooth-transition hover:text-primary ${
                isActive('/') ? 'text-primary font-semibold' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`smooth-transition hover:text-primary ${
                isActive('/products') ? 'text-primary font-semibold' : 'text-foreground'
              }`}
            >
              Products
            </Link>
            
            {/* Instagram CTA */}
            <Button 
              variant="default"
              className="gradient-primary glow-effect smooth-transition hover:scale-105"
              onClick={() => window.open(createInstagramProfileLink(), '_blank')}
            >
              <Instagram className="w-4 h-4 mr-2" />
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/10 animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`smooth-transition hover:text-primary px-2 py-1 ${
                  isActive('/') ? 'text-primary font-semibold' : 'text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`smooth-transition hover:text-primary px-2 py-1 ${
                  isActive('/products') ? 'text-primary font-semibold' : 'text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Button 
                variant="default"
                className="gradient-primary glow-effect w-full mt-4"
                onClick={() => {
                  window.open(createInstagramProfileLink(), '_blank');
                  setIsOpen(false);
                }}
              >
                <Instagram className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
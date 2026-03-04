import React from 'react';
import { Instagram, MessageCircle, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateToSection?: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateToSection }) => {
  const handleNavigation = (section: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(section);
    }
  };

  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              {/* Tower Symbol */}
              <div className="w-12 h-12 border border-white/40 flex items-center justify-center mb-4">
                <div className="w-0.5 h-7 bg-white"></div>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">MENÕ</h3>
              <p className="text-sm text-white/60 font-light mt-2">
                Abide. Dwell. Remain.
              </p>
            </div>
            <p className="text-sm text-white/70 leading-relaxed font-light">
              Streetwear rooted in endurance and identity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('collections')}
                  className="text-white/60 hover:text-white transition-colors font-light"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('collections')}
                  className="text-white/60 hover:text-white transition-colors font-light"
                >
                  T-Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('collections')}
                  className="text-white/60 hover:text-white transition-colors font-light"
                >
                  Shorts
                </button>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">About</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('story')}
                  className="text-white/60 hover:text-white transition-colors font-light"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('contact')}
                  className="text-white/60 hover:text-white transition-colors font-light"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Contact</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-white/60 mt-1" />
                <a
                  href="mailto:info@clothingmeno.com"
                  className="text-white/60 hover:text-white transition-colors font-light"
                >
                  info@clothingmeno.com
                </a>
              </div>
              <p className="text-white/60 font-light">clothingmeno.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/60 font-light">
              © {new Date().getFullYear()} MENÕ Clothing. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => handleNavigation('privacy')}
                className="text-white/60 hover:text-white transition-colors font-light"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavigation('terms')}
                className="text-white/60 hover:text-white transition-colors font-light"
              >
                Terms
              </button>
              <button
                onClick={() => handleNavigation('returns')}
                className="text-white/60 hover:text-white transition-colors font-light"
              >
                Returns
              </button>
              <span className="text-white/60 font-light">Impressum</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

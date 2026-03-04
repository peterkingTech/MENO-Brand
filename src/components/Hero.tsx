import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToShop = () => {
    const collectionsSection = document.getElementById('collections-section');
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToStory = () => {
    const storySection = document.getElementById('about-meno-section');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/7319008/7319008-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Minimal Tower Symbol */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-white/40 flex items-center justify-center">
              <div className="w-1 h-10 md:h-12 bg-white"></div>
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 tracking-tighter">
            MENÕ
          </h1>

          {/* Core Message */}
          <p className="text-lg md:text-2xl text-white/90 font-light mb-2 tracking-wide">
            Abide. Dwell. Remain.
          </p>

          {/* Subtext */}
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-12 font-light">
            Streetwear rooted in endurance and identity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToShop}
              className="px-8 py-4 bg-white text-black font-semibold uppercase text-sm tracking-wider hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Shop Collection
            </button>
            <button
              onClick={scrollToStory}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold uppercase text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              Discover the Vision
            </button>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

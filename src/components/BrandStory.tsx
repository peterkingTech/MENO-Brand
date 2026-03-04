import React, { useEffect, useState, useRef } from 'react';

const BrandStory: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about-meno-section"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0D0D0D] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)`,
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            The Meaning Behind MENÕ
          </h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
        </div>

        {/* Story Content */}
        <div
          className={`space-y-8 text-center transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light italic">
            One day while meditating on the quote<br />
            <span className="text-white font-normal">"You need endurance to have faith continually,"</span><br />
            a vision formed.
          </p>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
            I saw myself wearing a white T-shirt — unaware that I was already wearing one at that moment.
          </p>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
            Later, a close friend had a dream.<br />
            She was in darkness, and the only word I repeated was:
          </p>

          <div className="py-8">
            <p className="text-5xl md:text-6xl font-black text-white tracking-tight">
              "MENÕ."
            </p>
          </div>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
            After waking, she discovered its meaning:<br />
            <span className="text-white font-semibold">To abide. To dwell. To remain in Christ.</span>
          </p>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
            That moment confirmed the vision.
          </p>

          {/* Final Message */}
          <div className="pt-12 border-t border-white/10">
            <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
              MENÕ is not just clothing.
            </p>
            <p className="text-xl md:text-2xl text-white/70 mt-4 font-light">
              It is a reminder to endure.<br />
              To remain.<br />
              To dwell.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;

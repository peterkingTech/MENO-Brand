import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const About: React.FC = () => {
  const navigate = useNavigate();
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isVisionVisible, setIsVisionVisible] = useState(false);
  const [isInterviewVisible, setIsInterviewVisible] = useState(false);
  const [filters, setFilters] = useState({
    gender: 'all',
    collection: 'all',
    category: 'all',
    searchQuery: '',
    sortBy: 'newest'
  });

  const visionRef = useRef<HTMLDivElement>(null);
  const interviewRef = useRef<HTMLDivElement>(null);

  const handleNavigateToSection = (section: string) => {
    if (section === 'hero' || section === 'collections' || section === 'brand' || section === 'story') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(section === 'hero' ? 'hero-section' : 'collections-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    setIsHeroVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === visionRef.current && entry.isIntersecting) {
            setIsVisionVisible(true);
          }
          if (entry.target === interviewRef.current && entry.isIntersecting) {
            setIsInterviewVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (visionRef.current) observer.observe(visionRef.current);
    if (interviewRef.current) observer.observe(interviewRef.current);

    return () => {
      if (visionRef.current) observer.unobserve(visionRef.current);
      if (interviewRef.current) observer.unobserve(interviewRef.current);
    };
  }, []);

  return (
    <>
      <Header
        onFilter={setFilters}
        cartItemsCount={0}
        wishlistItemsCount={0}
        onSearch={() => {}}
        onShowCart={() => {}}
        onShowWishlist={() => {}}
        onNavigateToSection={handleNavigateToSection}
      />

      <div className="bg-[#0D0D0D]">
        {/* Hero Video Section */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            console.error('Video failed to load:', e);
            const video = e.target as HTMLVideoElement;
            video.style.display = 'none';
          }}
        >
          <source
            src="https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/Hero%20Videos/Hero%20Video%20-%20Interview.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div
            className={`transition-all duration-1000 ${
              isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-6">
              The Story Behind MENÕ
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto">
              A vision. A word. A calling to remain.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section (from BrandStory component) */}
      <section className="relative py-24 md:py-32 bg-[#0D0D0D] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 3px)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              The Meaning Behind MENÕ
            </h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>

          <div className="space-y-8 text-center">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light italic">
              One day while meditating on the quote
              <br />
              <span className="text-white font-normal">
                "You need endurance to have faith continually,"
              </span>
              <br />a vision formed.
            </p>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              I saw myself wearing a white T-shirt — unaware that I was already wearing one at
              that moment.
            </p>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              Later, a close friend had a dream.
              <br />
              She was in darkness, and the only word I repeated was:
            </p>

            <div className="py-8">
              <p className="text-5xl md:text-6xl font-black text-white tracking-tight">"MENÕ."</p>
            </div>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              After waking, she discovered its meaning:
              <br />
              <span className="text-white font-semibold">
                To abide. To dwell. To remain in Christ.
              </span>
            </p>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              That moment confirmed the vision.
            </p>

            <div className="pt-12 border-t border-white/10">
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                MENÕ is not just clothing.
              </p>
              <p className="text-xl md:text-2xl text-white/70 mt-4 font-light">
                It is a reminder to endure.
                <br />
                To remain.
                <br />
                To dwell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section
        ref={visionRef}
        className="relative py-24 md:py-32 bg-[#111111] overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          onError={(e) => {
            const video = e.target as HTMLVideoElement;
            video.style.display = 'none';
          }}
        >
          <source
            src="https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/Hero%20Videos/Hero%20Video%20-%20Interview.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div
            className={`transition-all duration-1000 ${
              isVisionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                Our Vision
              </h2>
              <div className="w-20 h-1 bg-white mx-auto"></div>
            </div>

            <div className="space-y-8 text-center">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                MENÕ was not created to be just another clothing label.
                <br />
                It was born from a moment of clarity — a reminder that endurance builds faith.
              </p>

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                The vision of MENÕ is to inspire people to remain rooted in Christ
                <br />
                while navigating culture, creativity, and everyday life.
              </p>

              <div className="py-6">
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                  We believe clothing can speak without noise.
                  <br />
                  It can remind.
                  <br />
                  It can anchor.
                  <br />
                  It can lead hearts back to stillness.
                </p>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                  MENÕ represents abiding.
                  <br />
                  Dwelling.
                  <br />
                  Remaining.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Sessions Section */}
      <section
        ref={interviewRef}
        className="relative py-24 md:py-32 bg-[#0D0D0D]"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div
            className={`transition-all duration-1000 ${
              isInterviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                Interview Sessions
              </h2>
              <p className="text-lg md:text-xl text-white/70 font-light">
                Conversations about vision, faith, and identity.
              </p>
            </div>

            {/* Video Card */}
            <div className="bg-[#111111] rounded-lg overflow-hidden shadow-2xl mb-8">
              <video
                controls
                className="w-full"
                poster="https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/Hero%20Videos/Hero%20Video%20-%20Interview.mp4"
              >
                <source
                  src="https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/Hero%20Videos/Hero%20Video%20-%20Interview.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            {/* Description */}
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                In these sessions, we share the deeper meaning behind MENÕ —<br />
                the journey, the struggles, the endurance, and the calling to remain.
              </p>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light mt-6">
                This space is for reflection, honesty, and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer onNavigateToSection={handleNavigateToSection} />
    </>
  );
};

export default About;

import React from 'react';

const Lookbook: React.FC = () => {
  const lookbookImages = [
    {
      src: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Urban Fashion Style 1',
    },
    {
      src: 'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Urban Fashion Style 2',
    },
    {
      src: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Urban Fashion Style 3',
    },
    {
      src: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Urban Fashion Style 4',
    },
    {
      src: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Urban Fashion Style 5',
    },
    {
      src: 'https://images.pexels.com/photos/842567/pexels-photo-842567.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Urban Fashion Style 6',
    },
    {
      src: 'https://images.pexels.com/photos/1661535/pexels-photo-1661535.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Urban Fashion Style 7',
    },
    {
      src: 'https://images.pexels.com/photos/1007066/pexels-photo-1007066.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Urban Fashion Style 8',
    },
  ];

  return (
    <section className="py-16 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">
            Lookbook
          </h2>
          <div className="w-20 h-1 bg-white"></div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {lookbookImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lookbook;

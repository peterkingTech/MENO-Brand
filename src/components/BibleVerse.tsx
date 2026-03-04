import React, { useState, useEffect } from 'react';
import { Book, Share2 } from 'lucide-react';
import bibleVerses from '../data/bible-verses.json';

interface BibleVerseProps {
  language?: string;
}

const BibleVerse: React.FC<BibleVerseProps> = ({ language = 'en' }) => {
  const [verse, setVerse] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    setVerse(randomVerse);

    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const handleShare = () => {
    const text = `${verse.text_en} - ${verse.verse}`;
    if (navigator.share) {
      navigator.share({
        title: 'Bible Verse',
        text: text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert('Verse copied to clipboard!');
    }
  };

  if (!verse) return null;

  const verseText = language === 'de' ? verse.text_de : verse.text_en;

  return (
    <div
      className={`max-w-2xl mx-auto mt-8 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Book className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                Word of Encouragement
              </h3>
            </div>
          </div>

          {/* Verse Text */}
          <blockquote className="mb-6">
            <p className="text-xl md:text-2xl font-bold leading-relaxed text-white italic">
              "{verseText}"
            </p>
          </blockquote>

          {/* Reference */}
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <p className="text-lg font-semibold text-gray-300">
              {verse.verse}
            </p>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 backdrop-blur-sm group"
              aria-label="Share verse"
            >
              <Share2 className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Share
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleVerse;

import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../lib/types';
import { FilterOptions } from './Header';
import ProductModal from './Product/ProductModal';
import { useLocalization } from '../contexts/LocalizationContext';

interface CollectionProps {
  filters: FilterOptions;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

const Collection: React.FC<CollectionProps> = ({
                                                 filters,
                                                 onAddToCart,
                                                 onAddToWishlist,
                                                 wishlistItems
                                               }) => {
  const { formatPrice, t } = useLocalization();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [selectedCollection, setSelectedCollection] = useState<string>('all'); // Collection filter state
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null); // Hover state
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});

  // Complete product catalog with all new images and prices
  const allProducts: Product[] = [
    // THE ORIGIN COLLECTION - WOMEN
    {
      id: 1,
      name: "THE ORIGIN Jacket - Female",
      price: 45.00,
      images: {
        black: [
"https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
            "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
            "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
            "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",

        ],
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160"
        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'jacket',
      gender: 'female',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White'],
      description: "Elegant black jacket from the THE ORIGIN collection, designed for the modern woman of faith",
      verse: "She is clothed with strength and dignity - Proverbs 31:25",
      isComingSoon: false,
      inStock: true,
    },
    {
      id: 2,
      name: "THE ORIGIN Jacket - Male",
      price: 45.00,
      images: {
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160"
        ],
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg"
        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'jacket',
      gender: 'male',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White','Black'],
      description: "Premium jacket from the THE ORIGIN collection, crafted for the modern gentleman.",
      verse: "Be on your guard; stand firm in the faith; be courageous; be strong - 1 Corinthians 16:13"
      ,
      isComingSoon: false,
      inStock: true,
    },
    {
      id: 3,
      name: "THE ORIGIN Jacket - Female",
      price: 49.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg"
        ],
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160"
        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'jacket',
      gender: 'female',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White'],
      description: "Premium jacket from the THE ORIGIN collection, designed for the modern woman of faith.",
      verse: "Peter 3:3-4 — Your beauty should not come from outward adornment rather, it should be that of your inner self, the unfading beauty of a gentle and quiet spirit."
      ,
      isComingSoon: true,
      inStock: false,
    },
    {
      id: 4,
      name: "THE ORIGIN Jacket - Male",
      price: 49.99,
      images: {
        black: [
            "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
            "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
        ],
        white: [
       "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
            "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'jacket',
      gender: 'male',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black'],
      description: "Premium jacket from the THE ORIGIN collection, crafted for the modern gentleman.",
      verse: "As iron sharpens iron, so one man sharpens another - Proverbs 27:17"
      ,
      isComingSoon: true,
      inStock: false,
    },
    {
      id: 5,
      name: "THE ORIGIN T-Shirt - Female",
      price: 34.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg"
        ],
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160"
        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'tshirt',
      gender: 'female',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White','Black'],
      colorStock: {
        white: false,
        black: true
      },
      description: "Comfortable t-shirt from the THE ORIGIN collection, perfect for everyday wear.",
      verse: "Psalm 46:5 God is within her, she will not fall; God will help her at break of day",
      inStock: true,
    },
    {
      id: 6,
      name: "THE ORIGIN T-Shirt - Male",
      price: 34.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
        ],
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160"
        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'tshirt',
      gender: 'male',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black','White'],
      colorStock: {
        black: true,
        white: false
      },
      description: "Premium t-shirt from the THE ORIGIN collection for men.",
      verse:  ""
      ,
      inStock: true,
    },
    // Keep other products but remove duplicates and old t-shirt entries
    {
      id: 7,
      name: "THE ORIGIN Short - Female",
      price: 39.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
        ],
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",

        ]
      },
      collection: 'origin',
      category: 'shorts',
      gender: 'female',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White'],
      description: "Stylish black shorts from the THE ORIGIN collection, designed for comfort and elegance.",
      verse: "Proverbs 31:30 — Charm is deceptive, and beauty is fleeting; but a woman who fears the Lord is to be praised",
      isComingSoon: false,
      inStock: true,
    },
    {
      id: 8,
      name: "THE ORIGIN Short - Male",
      price: 39.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",

        ],
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",

        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'shorts',
      gender: 'male',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black'],
      description: "Stylish shorts from the THE ORIGIN collection for men.",
      verse: "Proverbs 27:17 — As iron sharpens iron, so one man sharpens another.",

      isComingSoon: false,
      inStock: true,
    },
    {
      id: 9,
      name: "THE ORIGIN Full Set - Jacket and Skirt",
      price: 74.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
        ],
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",

        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'set',
      gender: 'female',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White'],
      description: "Complete black jacket and skirt set from the THE ORIGIN collection.",
      verse: "Peter 3:3-4 —Your beauty should not come from outward adornment rather, it should be that of your inner self, the unfading beauty of a gentle and quiet spirit.",

      isComingSoon: false,
      inStock: true,
    },
    {
      id: 10,
      name: "THE ORIGIN Full Set - Jacket and Short",
      price: 79.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",

        ],
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",


        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'set',
      gender: 'female',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black'],
      description: "Stylish black jacket and short set from the THE ORIGIN collection.",
      verse: "Luke 1:45 — Blessed is she who has believed that the Lord would fulfill His promises to her"
      ,

      isComingSoon: false,
      inStock: true,
    },


    {
      id: 17,
      name: "THE ORIGIN Full Set - Jacket and Short",
      price: 79.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
        ],
        white: [
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",
          "https://image.hm.com/assets/hm/34/44/3444b96995613435a32b505f8d57a7ca2fca616e.jpg?imwidth=2160",

        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'set',
      gender: 'male',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black'],
      description: "Premium jacket from the THE ORIGIN collection, crafted for the modern gentleman.",
      verse: "Proverbs 27:17 — As iron sharpens iron, so one man sharpens another.",

      isComingSoon: false,
      inStock: true,
    },

    {
      id: 11,
      name: "THE ORIGIN Sweat Pants",
      price: 49.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",

        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'pants',
      gender: 'unisex',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black'],
      description: "Premium sweat pants from the THE ORIGIN collection, designed for comfort and style.",
      verse: "Colossians 3:23 — Whatever you do, work at it with all your heart, as working for the Lord, not for men",

      isComingSoon: true,
      inStock: false,
    },



    {
      id: 13,
      name: "THE ORIGIN Full Set - Hoodie and Sweat Pants",
      price: 89.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",

        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'set',
      gender: 'female',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black'],
      description: "Complete hoodie and sweat pants set from the THE ORIGIN collection.",
      verse: "Isaiah 61:10 — He has clothed me with garments of salvation and arrayed me in a robe of His righteousness.",


      isComingSoon: true,
      inStock: false,
    },


    {
      id: 14,
      name: "THE ORIGIN Full Set - Hoodie and Sweat Pants",
      price: 89.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg"

        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'set',
      gender: 'male',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black'],
      description: "Complete hoodie and sweat pants set from the THE ORIGIN collection.",
      verse:"1 Timothy 6:11 — But you, man of God, flee from all this, and pursue righteousness, godliness, faith, love, endurance and gentleness",
      isComingSoon: true,
      inStock: false,
    },

    {
      id: 15,
      name: "THE ORIGIN HOODIE",
      price: 44.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",

        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'set',
      gender: 'female',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black'],
      description: "Complete hoodie and sweat pants set from the THE ORIGIN collection.The THE ORIGIN Women's Hoodie blends elegance and comfort with divine inspiration. Soft, stylish, and empowering, it reflects the beauty of a woman clothed in grace and strength. A daily reminder that your worth and confidence come from Christ alone.",
      verse:"He has clothed me with garments of salvation and arrayed me in a robe of His righteousness. - Isaiah 61:10",
      isComingSoon: true,
      inStock: false,
    },

    {
      id: 16,
      name: "THE ORIGIN HOODIE",
      price: 44.99,
      images: {
        black: [
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg",
          "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg"

        ]
      },
      video: "https://htvizmlwzhzsmiexhceo.supabase.co/storage/v1/object/public/T%20Shirt/White%20Tshirt%20-%20Video.mp4",
      collection: 'origin',
      category: 'set',
      gender: 'male',
      sizes: [ 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black'],
      description: "The THE ORIGIN Men's Hoodie is designed for comfort, strength, and quiet confidence. Made from premium cotton blend fabric, it reminds every man that true power comes from faith, not fear. Whether at the gym, in the streets, or during devotion, this hoodie keeps you covered in purpose.",
      verse: "Be on your guard; stand firm in the faith; be courageous; be strong.",
      isComingSoon: true,
      inStock: false,
    },

  ];

  // Filter products based on current filters AND collection selection
  const filteredProducts = allProducts.filter(product => {
    // Apply existing filters
    if (filters.gender !== 'all' && product.gender !== 'unisex' && product.gender !== filters.gender) {
      return false;
    }
    if (filters.collection !== 'all' && product.collection !== filters.collection) {
      return false;
    }
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    // Apply collection filter - check if product belongs to the selected collection
    if (selectedCollection !== 'all') {
      if (product.collection !== selectedCollection) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Image navigation functions
  const nextImage = (productId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (productId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Collection filter handler
  const handleCollectionFilter = (collection: string) => {
    setSelectedCollection(collection);
  };

  // Color selection handler
  const handleColorSelect = (productId: number, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  // Get current images for a product based on selected color
  const getCurrentImages = (product: Product) => {
    const selectedColor = selectedColors[product.id] || product.colors[0].toLowerCase();
    if (typeof product.images === 'object' && product.images[selectedColor]) {
      return product.images[selectedColor];
    }
    // Fallback to first color if selected color not found
    const firstColor = product.colors[0].toLowerCase();
    return typeof product.images === 'object' ? product.images[firstColor] || [] : product.images;
  };

  return (
      <section className="py-16 bg-[#0D0D0D]" id="collections-section">
        <div className="max-w-7xl mx-auto px-4">
          {/* Collection Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">The Origin Collection</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-4"></div>
            <p className="text-white/70 text-lg font-light max-w-2xl mx-auto">
              Our inaugural collection. Timeless pieces rooted in purpose.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => {
              const currentImages = getCurrentImages(product);
              const currentIndex = currentImageIndex[product.id] || 0;
              const isHovered = hoveredProduct === product.id;
              const selectedColor = selectedColors[product.id] || product.colors[0];

              return (
                  <div
                      key={product.id}
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      onClick={() => setSelectedProduct(product)}
                  >
                    {/* Product Image with Hover Effect */}
                    <div className="relative aspect-[3/4] bg-[#111111] mb-3 overflow-hidden">
                      <img
                          src={isHovered && currentImages[1] ? currentImages[1] : currentImages[currentIndex]}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-[center_top] transition-all duration-500 group-hover:scale-110"
                          style={{ objectPosition: 'center 0%' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop';
                          }}
                      />

                      {/* Image Navigation - only show if multiple images and not hovering */}
                      {currentImages.length > 1 && !isHovered && (
                          <>
                            <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevImage(product.id, currentImages.length);
                                }}
                                className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/80 hover:bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  nextImage(product.id, currentImages.length);
                                }}
                                className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/80 hover:bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </>
                      )}

                      {/* Wishlist Button Only - No Add to Cart */}
                      <div className={`absolute top-1 right-1 transition-opacity ${
                          isInWishlist(product.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToWishlist(product);
                            }}
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                                isInWishlist(product.id)
                                    ? 'bg-red-600 text-white'
                                    : 'bg-white/80 hover:bg-white text-black'
                            }`}
                        >
                          <Heart className={`w-3 h-3 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Coming Soon Badge */}
                      {product.isComingSoon && (
                          <div className="absolute top-1 left-1">
                      <span className="bg-black text-white px-2 py-1 text-xs font-light rounded">
                        COMING SOON
                      </span>
                          </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wide line-clamp-2">{product.name}</h3>

                      {/* Color Selection */}
                      {product.colors.length > 1 && (
                          <div className="flex gap-2 mt-2">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleColorSelect(product.id, color);
                                    }}
                                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                                        selectedColor === color
                                            ? 'border-white scale-110'
                                            : 'border-white/30 hover:border-white/60'
                                    }`}
                                    style={{
                                      backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                          color.toLowerCase() === 'black' ? '#000000' : color.toLowerCase()
                                    }}
                                    title={color}
                                />
                            ))}
                          </div>
                      )}

                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-white">{formatPrice(product.price)}</p>
                        {product.originalPrice && (
                            <p className="text-xs text-white/40 line-through">{formatPrice(product.originalPrice)}</p>
                        )}
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>

          {/* No Products Message */}
          {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-sm text-white/50">No products found</p>
              </div>
          )}
        </div>

        {/* Product Modal */}
        {selectedProduct && (
            <ProductModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                isInWishlist={isInWishlist(selectedProduct.id)}
            />
        )}
      </section>
  );
};

export default Collection;
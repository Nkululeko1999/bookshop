import React from 'react';

interface HeroWithImageProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

const HeroWithImage: React.FC<HeroWithImageProps> = ({
  title = "Welcome to Our Bookshop",
  subtitle = "Discover Your Next Great Read",
  description = "Explore our curated collection of books, from bestsellers to hidden gems.",
  imageUrl = "",
  imageAlt = "Books",
  imagePosition = "right",
}) => {
  const contentOrder =
    imagePosition === "right" ? "lg:flex-row" : "lg:flex-row-reverse";

  return (
    <section className="bg-black rounded">
      <div
        className={`container mx-auto px-4 py-2 md:py-3 flex flex-col ${contentOrder} items-center gap-4 lg:gap-6`}
      >
        {/* Content Section */}
        <div className="flex-1 text-center lg:text-left">
          {subtitle && (
            <p className="text-orange-500 font-semibold text-xs md:text-sm uppercase tracking-wide mb-1">
              {subtitle}
            </p>
          )}

          {title && (
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
              {title}
            </h1>
          )}

          {description && (
            <p className="text-gray-300 text-sm md:text-base mb-3 max-w-md mx-auto lg:mx-0">
              {description}
            </p>
          )}
        </div>

        {/* Image Section */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full max-w-xs sm:max-w-sm h-32 sm:h-36 md:h-48 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroWithImage;
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface ImageGalleryProps {
  images: Array<{
    url: string;
    label: string;
    description?: string;
  }>;
  title?: string;
}

export default function ImageGallery({
  images,
  title,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }
    if (touchEnd - touchStart > 50) {
      handlePrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}

      {/* Main Image Container */}
      <div
        className="relative bg-card/50 border border-accent/20 rounded-lg overflow-hidden aspect-video"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={currentImage.url}
          alt={currentImage.label}
          className="w-full h-full object-contain"
        />

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 border border-accent/30 text-accent hover:bg-background hover:border-accent/60 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 border border-accent/30 text-accent hover:bg-background hover:border-accent/60 transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-background/80 border border-accent/30 text-xs font-mono text-accent">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Image Label and Description */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-accent/70">
          {currentImage.label}
        </p>
        {currentImage.description && (
          <p className="text-sm text-foreground/70">
            {currentImage.description}
          </p>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
              idx === currentIndex
                ? "border-accent bg-accent/20"
                : "border-accent/20 hover:border-accent/50 opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Navigation Hints */}
      <p className="text-xs text-muted-foreground text-center">
        Use arrow keys or swipe to navigate • Click thumbnails to jump
      </p>
    </div>
  );
}

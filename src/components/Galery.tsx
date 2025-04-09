"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

interface GalleryProps {
  pictures: string[];
  title: string;
}

export const Gallery = ({ pictures, title }: GalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(true);
  const [api, setApi] = useState<CarouselApi>();

  // Reset state when gallery pictures change
  useEffect(() => {
    setActiveImageIndex(0);
    setIsGridView(true);
  }, [pictures]);

  // Sync carousel with activeImageIndex
  useEffect(() => {
    if (!api) return;
    api.scrollTo(activeImageIndex);
  }, [api, activeImageIndex]);

  // Update activeImageIndex when carousel changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveImageIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
    setIsGridView(false);
  };

  // Get visible images for grid view (limit to 3 for 4 images, 5 for more)
  const getVisibleImages = () => {
    if (pictures.length <= 3) return pictures;
    if (pictures.length === 4) return pictures.slice(0, 3);
    return pictures.slice(0, 5);
  };

  // Calculate if there are hidden images
  const hiddenImagesCount = Math.max(
    0,
    pictures.length - getVisibleImages().length,
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isGridView) {
      if (e.key === "ArrowRight") api?.scrollNext();
      if (e.key === "ArrowLeft") api?.scrollPrev();
      if (e.key === "Escape") setIsGridView(true);
    }
  };

  return (
    <div
      className="relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label={`Image gallery for ${title}`}
    >
      {/* Full Screen Image View */}
      {!isGridView && (
        <div className="relative h-[50vh] w-full">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              startIndex: activeImageIndex,
            }}
            className="h-full"
          >
            <CarouselContent className="h-full duration-700">
              {pictures.map((pic, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative h-full w-full">
                    <Image
                      src={pic}
                      alt={`${title} - image ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority={index === activeImageIndex}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="left-4 z-10 h-10 w-10"
              onClick={() => api?.scrollPrev()}
            />
            <CarouselNext
              className="right-4 z-10 h-10 w-10"
              onClick={() => api?.scrollNext()}
            />
          </Carousel>

          {/* Image Counter and Back to Grid Button */}
          <div className="absolute right-0 bottom-4 left-0 z-20 flex items-center justify-center gap-4">
            <span className="bg-background/70 rounded-full px-3 py-1 text-xs backdrop-blur-md">
              {activeImageIndex + 1} / {pictures.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="bg-background/70 hover:bg-background/90 rounded-full text-xs backdrop-blur-md"
              onClick={() => setIsGridView(true)}
            >
              Back to gallery
            </Button>
          </div>
        </div>
      )}

      {/* Grid View */}
      {isGridView && (
        <div className="grid gap-4 p-4">
          {pictures.length === 1 ? (
            // Single image layout - full width, taller
            <motion.div
              className="group relative h-[400px] cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handleImageClick(0)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              aria-label={`View ${title} image fullscreen`}
            >
              <Image
                src={pictures[0]}
                alt={`${title} - image 1`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="100vw"
                priority
              />

              {/* Hover effects */}
              <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 opacity-0 transition-transform duration-700 group-hover:translate-x-full group-hover:opacity-100"
                style={{
                  transformOrigin: "bottom left",
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/80 rounded-full p-3 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M9 21H3v-6" />
                    <path d="M3 9 14 20" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ) : pictures.length === 2 ? (
            // Two images layout - side by side on desktop, stacked on mobile
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {pictures.map((pic, index) => (
                <motion.div
                  key={index}
                  className="group relative h-[250px] cursor-pointer overflow-hidden rounded-lg md:h-[300px]"
                  onClick={() => handleImageClick(index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                  aria-label={`View ${title} image ${index + 1} fullscreen`}
                >
                  <Image
                    src={pic}
                    alt={`${title} - image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Hover effects */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div
                    className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 opacity-0 transition-transform duration-700 group-hover:translate-x-full group-hover:opacity-100"
                    style={{
                      transformOrigin: "bottom left",
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/80 rounded-full p-3 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M9 21H3v-6" />
                        <path d="M3 9 14 20" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Grid for 3+ images with limits
            <div className="grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[200px] md:grid-cols-3">
              {getVisibleImages().map((pic, index) => {
                // Determine if this image should span multiple grid cells
                const isWide = index % 3 === 0;
                const isTall = index % 5 === 0;

                // For the last visible image, show count of remaining images if any
                const isLastVisible = index === getVisibleImages().length - 1;
                const showMoreCount = isLastVisible && hiddenImagesCount > 0;

                return (
                  <motion.div
                    key={index}
                    className={`group relative cursor-pointer overflow-hidden rounded-lg ${
                      isWide ? "sm:col-span-2" : ""
                    } ${isTall ? "row-span-2" : ""}`}
                    onClick={() => handleImageClick(index)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    aria-label={`View ${title} image ${index + 1} fullscreen`}
                  >
                    <Image
                      src={pic}
                      alt={`${title} - image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes={
                        isWide ? "100vw" : "(max-width: 768px) 100vw, 33vw"
                      }
                    />

                    {/* Hover overlay with zoom icon */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Shine effect on hover */}
                    <div
                      className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 opacity-0 transition-transform duration-700 group-hover:translate-x-full group-hover:opacity-100"
                      style={{
                        transformOrigin: "bottom left",
                      }}
                      aria-hidden="true"
                    />

                    {/* Show more count overlay */}
                    {showMoreCount && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="text-center text-xl font-bold text-white">
                          +{hiddenImagesCount} more
                        </span>
                      </div>
                    )}

                    {/* Zoom indicator */}
                    {!showMoreCount && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-background/80 rounded-full p-3 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M15 3h6v6" />
                            <path d="M10 14 21 3" />
                            <path d="M9 21H3v-6" />
                            <path d="M3 9 14 20" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

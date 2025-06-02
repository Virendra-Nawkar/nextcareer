import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Full Stack Developer",
  "Graphic Designer",
];

const CategoryCarousel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent className="flex gap-4">
          {
            categories.map((category, index) => (
              <CarouselItem key={index} className="basis-auto md:basis-1.5 lg:basis-1/3">
                <Button className="whitespace-nowrap rounded-full">
                  {category}
                </Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;

"use client"

import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getFood } from "@/app/api/foods/getFood";
import Image from "next/image";
import { LuClock } from "react-icons/lu";

interface Food{
  name: string;
  img: string;
}

export function CarouselSize() {
  const [food, setFood] = useState<Food[]>([]);

  useEffect(() => {
    const fetchFoodImages = async () => {
      try {
        const { foods }: {foods : Food[]} = await getFood();
        const processedFoods = foods.map((food) =>  (
          {
            name:food.name,
            img:`data:image/jpeg;base64,${food.img}`,
          }
        ))
        setFood(processedFoods);

      } catch (error) {
        console.error("Failed to fetch food images:", error);
      }
    };

    fetchFoodImages();
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-7xl z-0"
    >
      <CarouselContent>
        {food.map((food, index) => (
          <CarouselItem key={index} className="md:basis-1/5 lg:basis-1/6 basis-28 ">
            <div className="p-1 md:p-0 lg:p-4">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-4 bg-[#feede0] border rounded-lg border-[#ffc8a3]">
                  
                 
                  <div>
                  <Image
                    src={food.img}
                    alt={`Food item ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover aspect-square"
                  />
                  </div>
                  
                  <div className="bg-[#eadff8]">
                  <h1 className="text-sm text-[#b74d1a] font-semibold">{food.name}</h1>
                  <h1 className="text-sm text-[#b74d1a] font-semibold">⭐ 4.3</h1>
                  <div className="flex flex-row gap-1 text-sm text-[#b74d1a]"><LuClock size={20}/> 30 mins</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

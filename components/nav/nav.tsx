"use client";

import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GrPrevious, GrNext } from "react-icons/gr";
import { LuClock } from "react-icons/lu";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

export default function NavRestaurant() {
  const scrollContainerRef = useRef<HTMLDivElement>(null); //using this ref to modify the d
  const tabItems = [
    { value: "1", label: "#BetterWithCoke" },
    { value: "2", label: "Chicken Nuggets" },
    { value: "3", label: "Family Meals" },
    { value: "4", label: "Breakfast" },
    { value: "5", label: "Chickenjoy" },
    { value: "6", label: "Burgers" },
    { value: "7", label: "Jolly Spaghetti" },
    { value: "8", label: "Burger Steak" },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const foods = [
    {
      name: "Burger with mozarella",
      price: "100"
    },
    {
      name: "Burger with fries",
      price: "200"
    },
    {
      name: "Burger with me",
      price: "100"
    },
    {
      name: "Burger",
      price: "200"
    },
    {
      name: "Me",
      price: "100"
    },
    {
      name: "Me and Burger",
      price: "200"
    },
  ]

  return (
    <div className="bg-white">
      <div className="flex flex-col mb-10 gap-1">
        <h1 className="text-3xl font-bold leading-loose">
          Jon&apos;s Korean Restaurant
        </h1>
        <p className="text-sm text-muted-foreground">
          Korean, Chicken, Fast Food
        </p>

        <div className="flex flex-row gap-2 text-sm">
          <h1 className="text-sm text-muted-foreground">⭐ 4.3</h1>
          <span className="flex flex-row items-center gap-1 text-muted-foreground">
            <LuClock size={16} /> 30 mins
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex items-start">
        {tabItems.length > 12 ? (
          <button onClick={scrollLeft} className="py-2">
            <GrPrevious className="w-5 h-5 text-gray-500" />
          </button>
        ) : (
          ""
        )}

        <Tabs defaultValue="1" className="flex-1 overflow-hidden">
          <TabsList
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide"
          >
            <div className="flex flex-row">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="whitespace-nowrap"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
          <TabsContent value="1">
            <div className="grid grid-cols-5 gap-4 p-10">
              {foods.map((item) =>(
              <Card key={item.name}>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-4 bg-white border rounded-lg ">
                  <div>
                    <Image
                      src="/chicken.png"
                      alt="try 1"
                      width={100}
                      height={100}
                      className="object-cover aspect-square"
                    />
                  </div>

                  <div className="bg-[#ffffff]">
                    <h1 className="text-sm text-[#b74d1a] font-semibold">
                      {item.name}
                    </h1>
{/*                     <h1 className="text-sm text-[#b74d1a] font-semibold">
                      ⭐ 4.3
                    </h1>
                    <div className="flex flex-row gap-1 text-sm text-[#b74d1a]">
                      <LuClock size={20} /> 30 mins
                    </div> */}
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="2">Chicken Nuggets content here.</TabsContent>
          <TabsContent value="3">Family Meals content here.</TabsContent>
        </Tabs>
        {tabItems.length > 12 ? (
          <button onClick={scrollRight} className="py-2">
            <GrNext className="w-5 h-5 text-gray-500" />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

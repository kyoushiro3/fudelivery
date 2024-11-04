import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/libs/utils";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Felicem | Slow Deliveries? Not on Our Watch!",
  description:
    "Food is our passion, and pleasing the customers is their mission. From the cooks who prepare delicious dishes for you to the couriers who bring you this joy, we are all for the happiness of our guests – one dinner at a time.",
  keywords: [
    "Fresh Food Delivery",
    "Fast & Reliable Delivery Service",
    "Delicious Dishes Delivered",
    "Satisfy Your Cravings Quickly",
    "On-Time Food Delivery",
    "Passion for Food, Customer Happiness",
    "Top Quality Food & Fast Service",
    "Happiness Delivered to Your Door",
    "Couriers Bringing Joy",
    "One Dinner at a Time",
    "Felicem Food Delivery Service",
    "Fast & Fresh at Felicem",
    "Delicious Meals, Prompt Delivery",
    "From Kitchen to Your Table",
    "Quick & Tasty Food Solutions",
  ],
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="z-50">
        <GridPattern
          width={100}
          height={100}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      </div>
      <div className="mt-20 px-4 sm:px-6 md:px-12 lg:px-6 justify-center">
        {" "}
        {/* don't edit */}
        <div className="grid grid-cols-2 border grid-rows-2 border-black gap-2">
          <div className="border border-black">
            <h1 className="font-bold">
              <span className="text-4xl lg:text-5xl text-[#eab308] font-semibold">
                Delivering Happiness
              </span>
              <br />
              <span className="font-semibold text-3xl lg:text-4xl">
                One Meal at a Time
              </span>
            </h1>

            <div className="grid grid-cols-4 gap-4 border border-black mt-4">
              <button className="px-2 py-2 rounded-full bg-black  text-white">
                Sign Up
              </button>
              <button className="px-2 py-2 rounded-full bg-yellow-500 text-black">
                Order Now
              </button>
            </div>
            <p className="text-2xl py-4">
              Food is our passion, and pleasing the customers is their mission.
              From the cooks who prepare delicious dishes for you to the
              couriers who bring you this joy, we are all for the happiness of
              our guests
            </p>
          </div>
          <div className="border border-black">
            <div className="mx-auto">
              <Image src="/png.png" width={500} height={500} alt="food" />
            </div>
          </div>
        </div>
      </div>

      {/* we will add bento or grid div style here */}
    </div>
  );
}

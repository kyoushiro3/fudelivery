import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Onest } from "next/font/google";
import { FiMapPin } from "react-icons/fi";

const onest = Onest({ subsets: ["latin"], weight: "500" });

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
      <div className="z-0">
        <GridPattern
          width={100}
          height={100}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] z-10"
          )}
        />
      </div>
      <div className="flex-col mt-10 px-4 sm:px-6 md:px-12 lg:px-6 justify-center flex z-10 mx-auto ">
        {" "}
        {/* don't edit */}
        {/* <div className="grid grid-cols-2 border grid-rows-2 border-black gap-2 mx-[12.5rem]">
          <div className="border border-black">
            <h1 className="text-[11.5px] font-semibold tracking-widest">FELICEM</h1>
            <h1 className="ml-0">
              <span className="text-[28px] md:text-[30px] lg:text-5xl text-[#eab308] font-semibold tracking-wider">
                Delivering Happiness
              </span>
              <br />
              <span className="text-[28px] md:text-[30px] lg:text-5xl text-[#eab308] font-semibold tracking-wider">
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
            <p className="text-base py-4">
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
         
        </div> */}
        <div className="flex flex-col items-center z-20">
          <h1 className={`${onest.className} text-5xl`}>Good Morning!</h1>
          <p>Where should we deliver your food today?</p>

          <form className="flex items-center max-w-sm mx-auto">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FiMapPin width={4} height={4} />
              </div>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your location..."
              />
            </div>
            
          </form>



        </div>
        <div className="relative">{/* <CarouselSize/> */}</div>
        {/* <Waves/> */}
        {/* <div className="grid grid-cols-4">
          <BentoCard/>
        </div> */}
      </div>

      {/* we will add bento or grid div style here */}
    </div>
  );
}

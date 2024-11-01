import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/libs/utils";

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
      <div className="mt-20 px-4 sm:px-6 md:px-12 lg:px-20 justify-center">
        <div className="mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl text-primary dark:text-primary-dark text-center">
          Delivering Happiness, One Meal at a Time!
          </h1>
          <p>the #1 delivery app.</p>
        </div>
      </div>

      {/* we will add bento or grid div style here */}
    </div>
  );
}



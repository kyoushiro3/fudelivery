import AddFood from "./addFood/page";

export default function Home() {
  return (
    <div className="relative px-4 sm:px-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-5xl md:text-7xl text-primary dark:text-primary-dark">
          <span className="text-red dark:text-yellow">Felicem</span>
        </h1>
        <p>the #1 delivery app.</p>
      </div>
    </div>
  );
}

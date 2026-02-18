import Category from "@/src/objects/Category";
import { RadialChart } from "./RadialChart/RadialChart";
import { useEffect, useState } from "react";

export default function CategoryBlock({ category }: { category: Category }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;
  return (
    <div className="p-4 flex flex-col bg-foreground text-background rounded-lg shadow-md items-center justify-center size-fit">
      <RadialChart
        spent={category.getAmountSpent()}
        remaining={category.getRemainingBudget()}
      />
      <h2 className="text-2xl font-bold">{category.getName()}</h2>
      <div className="flex flex-row mt-4 w-full">
        <p className="leading-[1.2] w-1/2">
          ${category.getAmountSpent()}
          <br />
          Spent
        </p>
        <div className="w-px bg-background/50 mx-4" />
        <p className="leading-[1.2] w-1/2">
          ${category.getRemainingBudget()}
          <br />
          Available
        </p>
      </div>
    </div>
  );
}

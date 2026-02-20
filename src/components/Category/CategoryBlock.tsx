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
    <div className="flex flex-col justify-around p-6 pt-4 pb-8 bg-[#F5F5F5] text-[#36393B] rounded-lg shadow-md items-center md:items-start gap-8">
      <h1 className="text-4xl font-bold">{category.getName()}</h1>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 min-w-full justify-around">
        <div>
          <RadialChart
            spent={category.getAmountSpent()}
            remaining={category.getRemainingBudget()}
          />
        </div>
        <div className="flex flex-col justify-center text-md w-fit text-gray-500 justify-self-start h-fit mt-8 md:mt-0 min-w-3xs max-w-3xs">
          <div>{category.getExpenses().length} Expenses</div>
          <div>
            {category.getExpenses().length > 0 && (
              <ul className="mt-2 list-disc text-left list-inside w-fit">
                {category
                  .getExpenses()
                  .reverse()
                  .slice(0, 2)
                  .map((expense, index) => (
                    <li key={index}>
                      {expense.description}: ${expense.amount} on{" "}
                      {expense.date.toLocaleDateString()}
                    </li>
                  ))}
                {category.getExpenses().length > 2 && <li>...</li>}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

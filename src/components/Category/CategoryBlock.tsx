import Category from "@/src/objects/Category";

export default function CategoryBlock({ category }: { category: Category }) {
  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-2xl font-bold">{category.getName()}</h2>
      <p>Total Budget: ${category.getMaxBudget()}</p>
      <p>Amount Spent: ${category.getAmountSpent()}</p>
      <p>Remaining Budget: ${category.getRemainingBudget()}</p>
      <button
        onClick={() => {
          const details = category.getExpenses();
          if (details.length === 0) {
            alert("No expenses in this category");
          } else {
            alert(
              `Expenses:\n\n${details.map((e) => `${e.description}: $${e.amount}`).join("\n")}`,
            );
          }
        }}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        View Details
      </button>
    </div>
  );
}

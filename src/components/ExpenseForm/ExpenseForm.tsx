import Category from "@/src/objects/Category";

export default function CategoryForm({
  categories,
  setCategories,
}: {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
  const handleExpenseSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const categoryIndex = parseInt(formData.get("category") as string);
    const amount = parseFloat(formData.get("amount") as string);
    const description = formData.get("description") as string;
    if (categoryIndex >= 0 && amount > 0) {
      const updatedCategories = [...categories];
      const expense = {
        description,
        amount,
        date: new Date(),
      };
      updatedCategories[categoryIndex].addExpense(expense);
      setCategories(updatedCategories);
      e.currentTarget.reset();
    }
  };

  return (
    <div className="mt-6 w-full max-w-md">
      <form
        onSubmit={handleExpenseSubmit}
        className="flex flex-col gap-4 p-4 border rounded">
        <select
          name="category"
          required
          className="px-3 py-2 border rounded bg-background">
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={index}>
              {category.getName()}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Expense amount"
          required
          min="0"
          step="0.01"
          className="px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Expense description"
          className="px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Expense
        </button>
      </form>
    </div>
  );
}

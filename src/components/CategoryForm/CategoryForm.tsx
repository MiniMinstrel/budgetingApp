import Category from "@/src/objects/Category";

export default function CategoryForm({
  categories,
  setCategories,
}: {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) {
  const handleCategorySubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const budget = parseFloat(formData.get("budget") as string);

    if (name && budget > 0) {
      setCategories([...categories, new Category(name, budget)]);
      e.currentTarget.reset();
    }
  };

  return (
    <div className="mt-6 w-full max-w-md">
      <form
        onSubmit={handleCategorySubmit}
        className="flex flex-col gap-4 p-4 border rounded">
        <input
          type="text"
          name="name"
          placeholder="Category name"
          required
          className="px-3 py-2 border rounded"
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget amount"
          required
          min="0"
          step="0.01"
          className="px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add Category
        </button>
      </form>
    </div>
  );
}

"use client";
import Category from "@/src/objects/Category";
import CategoryBlock from "@/src/components/Category/CategoryBlock";
import AddCategoryForm from "@/src/components/CategoryForm/AddCategoryForm";
import { PlusIcon } from "lucide-react";
import { CategoryButton } from "@/src/components/Category/CategoryButtons/CategoryButton";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  /*
  This main page requires the minimum...
  - A list of categories.
  - The total amount of money in each category.
  - The total amount spent in each category.
  - A button to add categories and expenses.
  - A button to view the details of each category.
  */
  useEffect(() => {
    // Fetch categories from the backend API
    //timeout to test loading state
    setTimeout(() => {
      axios.get("http://localhost:5298/categories").then((response) => {
        console.log("Fetched categories:", response.data);
        const categoryObjects = response.data.map(
          (item: any) =>
            new Category(item.id, item.name, item.maxBudget, item.expenses),
        );
        setCategories(categoryObjects);
        setLoading(false);
      });
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-2">
      <div className="flex flex-col items-center justify-center px-10 text-center gap-6">
        <div>
          <h1 className="text-6xl font-bold">Budgeting App</h1>
          <p className="mt-3 text-2xl">
            A simple budgeting app to help you manage your finances.
          </p>
        </div>
        {loading && (
          <p className="text-xl text-gray-500">Loading categories...</p>
        )}
        {categories.length === 0 && !loading && (
          <p className="text-xl text-gray-500">
            No categories added yet. Add a new category to get started!
          </p>
        )}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <CategoryBlock
              key={index}
              category={category}
              categoryId={category.getId()}
              setCategories={setCategories}
            />
          ))}
        </div>
        <div className="w-1/3">
          <CategoryButton
            title="Add Category"
            icon={<PlusIcon />}
            DialogDescriptionComponent={
              <AddCategoryForm
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

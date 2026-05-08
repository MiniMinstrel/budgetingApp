"use client";
import Category from "@/src/objects/Category";
import CategoryBlock from "@/src/components/Category/CategoryBlock";
import CategoryForm from "@/src/components/CategoryForm/CategoryForm";
import ExpenseForm from "@/src/components/ExpenseForm/ExpenseForm";
import { useState } from "react";

export default function Home() {
  /*
  This main page requires the minimum...
  - A list of categories.
  - The total amount of money in each category.
  - The total amount spent in each category.
  - A button to add categories and expenses.
  - A button to view the details of each category.
  */
  const [categories, setCategories] = useState<Category[]>([
    new Category("Groceries", 200, [
      { description: "Milk", amount: 40, date: new Date() },
    ]),
    new Category("Transportation", 300, [
      { description: "Plane", amount: 200, date: new Date() },
      { description: "Gas", amount: 25, date: new Date() },
    ]),
    new Category("Entertainment", 200, [
      { description: "Movies", amount: 80, date: new Date() },
      { description: "Concert", amount: 100, date: new Date() },
    ]),
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-2">
      <div className="flex flex-col items-center justify-center px-10 text-center gap-6">
        <div>
          <h1 className="text-6xl font-bold">Budgeting App</h1>
          <p className="mt-3 text-2xl">
            A simple budgeting app to help you manage your finances.
          </p>
        </div>
        {categories.length === 0 && (
          <p className="text-xl text-gray-500">
            No categories added yet. Add a new category to get started!
          </p>
        )}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <CategoryBlock key={index} category={category} />
          ))}
        </div>
        <div className="w-1/3">
          <CategoryForm categories={categories} setCategories={setCategories} />
          <ExpenseForm categories={categories} setCategories={setCategories} />
        </div>
      </div>
    </div>
  );
}

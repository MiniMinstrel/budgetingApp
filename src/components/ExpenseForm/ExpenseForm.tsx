import React from "react";
import { DialogClose } from "@/components/ui/dialog";

interface Expense {
  description: string;
  amount: number;
  date: Date;
}

export default function ExpenseForm({
  onAddExpense,
}: {
  onAddExpense: (expense: Expense) => void;
}) {
  const handleExpenseSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = parseFloat(formData.get("amount") as string);
    const description = formData.get("description") as string;
    if (amount > 0) {
      const expense = {
        description,
        amount,
        date: new Date(),
      };
      onAddExpense(expense);
      e.currentTarget.reset();
    }
  };

  return (
    <div className="mt-6 w-full max-w-md">
      <form
        onSubmit={handleExpenseSubmit}
        className="flex flex-col gap-4 p-4 border rounded">
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
        <DialogClose asChild>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add Expense
          </button>
        </DialogClose>
      </form>
    </div>
  );
}

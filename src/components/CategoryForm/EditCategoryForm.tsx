import React from "react";
import { DialogClose } from "@/components/ui/dialog";

export default function EditCategoryForm({
  currentName,
  currentMaxBudget,
  onChangeInformation,
}: {
  currentName: string;
  currentMaxBudget: number;
  onChangeInformation: (name: string, maxBudget: number) => void;
}) {
  const handleCategorySubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const maxBudget = parseFloat(formData.get("maxBudget") as string);
    if (name && !isNaN(maxBudget)) {
      onChangeInformation(name, maxBudget);
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
          defaultValue={currentName}
          required
          className="px-3 py-2 border rounded"
        />
        <input
          type="number"
          name="maxBudget"
          placeholder="Maximum budget"
          defaultValue={currentMaxBudget}
          required
          min="0"
          step="0.01"
          className="px-3 py-2 border rounded"
        />
        <DialogClose asChild>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save Changes
          </button>
        </DialogClose>
      </form>
    </div>
  );
}

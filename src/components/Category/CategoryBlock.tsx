import Category from "@/src/objects/Category";
import { RadialChart } from "./RadialChart/RadialChart";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Trash, Pencil, PlusIcon } from "lucide-react";
import AddExpenseForm from "../ExpenseForm/AddExpenseForm";
import EditCategoryForm from "../CategoryForm/EditCategoryForm";
import { addExpense, changeCategoryInformation, deleteCategory, editExpense, deleteExpense } from "@/src/utils/expenseCRUD";
import EditExpenseForm from "../ExpenseForm/EditExpenseForm";
import { CategoryButton } from "./CategoryButtons/CategoryButton";

interface Expense {
  description: string;
  amount: number;
  date: Date;
}

export default function CategoryBlock({ category, setCategories, categoryIndex }: { category: Category; setCategories: React.Dispatch<React.SetStateAction<Category[]>>; categoryIndex: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleAddExpense = (expense: Expense) => {
    addExpense(categoryIndex, setCategories, expense);
  };

  const handleChangeInformation = (name: string, maxBudget: number) => {
    changeCategoryInformation(categoryIndex, setCategories, name, maxBudget);
  };

  const handleDeleteCategory = () => {
    deleteCategory(categoryIndex, setCategories);
  };

  const handleEditExpense = (oldExpense: Expense, newExpense: Expense) => {
    editExpense(categoryIndex, setCategories, oldExpense, newExpense);
  };

  const handleDeleteExpense = (expense: Expense) => {
    deleteExpense(categoryIndex, setCategories, expense);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;
  return (
    <>
      <Card className="pb-6 md:pb-10">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-4xl font-bold text-left ml-0">
            <p>{category.getName()}</p>
            { }
            <div className="hidden md:flex gap-2">
              <CategoryButton title="Add Expense" icon={<PlusIcon />} DialogDescriptionComponent={<AddExpenseForm onAddExpense={handleAddExpense} />} />
              <CategoryButton title="Edit Category" icon={<Pencil />} DialogDescriptionComponent={<EditCategoryForm currentName={category.getName()} currentMaxBudget={category.getMaxBudget()} onChangeInformation={handleChangeInformation} />} />
              <CategoryButton title="Delete Category" icon={<Trash />} destructive={true} DialogDescriptionComponent={
                <div className="flex flex-col gap-4">
                  <p>Are you sure you want to delete this category? This action cannot be undone.</p>
                  <div className="flex gap-2 justify-end">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="destructive" onClick={handleDeleteCategory}>Delete</Button>
                    </DialogClose>
                  </div>
                </div>} />
            </div>
          </CardTitle>
          <CardDescription className="text-left text-sm text-gray-500 ml-0.5">
            {category.getExpenses().length} Expenses || ${category.getAmountSpent()} / ${category.getMaxBudget()}
            <br />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-8 min-w-full justify-around">
            <div>
              <RadialChart
                spent={category.getAmountSpent()}
                remaining={category.getRemainingBudget()}
              />
            </div>
            <div className="flex flex-col items-center text-md w-fit text-gray-500 h-fit md:-mt-6 mt-0 min-w-3xs max-w-3xs">
              <div>
                {category.getExpenses().length > 0 && (
                  <Table className="mt-2 w-fit">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-500">Expense</TableHead>
                        <TableHead className="text-gray-500">Amount</TableHead>
                        <TableHead className="text-gray-500">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category
                        .getExpenses()
                        .slice(0, 2)
                        .map((expense, index) => (
                          <EditExpenseForm key={index} expense={expense} index={index} onEditExpense={handleEditExpense} onDeleteExpense={handleDeleteExpense} />
                        ))}
                      {category.getExpenses().length > 2 && (
                        <TableRow>
                          <TableCell colSpan={3}>...</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-2 mt-4 md:hidden">
              <div className="flex gap-2">
                <CategoryButton title="Add Expense" icon={<PlusIcon />} DialogDescriptionComponent={<AddExpenseForm onAddExpense={handleAddExpense} />} />
                <CategoryButton title="Edit Category" icon={<Pencil />} DialogDescriptionComponent={<EditCategoryForm currentName={category.getName()} currentMaxBudget={category.getMaxBudget()} onChangeInformation={handleChangeInformation} />} />
                <CategoryButton title="Delete Category" icon={<Trash />} destructive={true} DialogDescriptionComponent={
                  <div className="flex flex-col gap-4">
                    <p>Are you sure you want to delete this category? This action cannot be undone.</p>
                    <div className="flex gap-2 justify-end">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="destructive" onClick={handleDeleteCategory}>Delete</Button>
                      </DialogClose>
                    </div>
                  </div>} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

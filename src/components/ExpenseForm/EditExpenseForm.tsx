import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import { Button } from "@/components/ui/button";

interface Expense {
  name: string;
  amount: number;
  date: Date;
}

export default function EditExpenseForm({
  expense,
  index,
  onEditExpense,
  onDeleteExpense,
}: {
  expense: Expense;
  index: number;
  onEditExpense: (oldExpense: Expense, newExpense: Expense) => void;
  onDeleteExpense: (expense: Expense) => void;
}) {
  const expenseDate = new Date(expense.date);

  return (
    <Dialog key={index}>
      <DialogTrigger asChild>
        <TableRow className="cursor-pointer hover:bg-gray-100">
          <TableCell>
            {expense.name.length > 10
              ? expense.name.substring(0, 10) + "..."
              : expense.name}
          </TableCell>
          <TableCell>${expense.amount}</TableCell>
          <TableCell>
            {expenseDate.toLocaleDateString("en-US", { timeZone: "UTC" })}
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              defaultValue={expense.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              id={`edit-name-${index}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              defaultValue={expense.amount}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              id={`edit-amount-${index}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              defaultValue={expenseDate.toISOString().split("T")[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              id={`edit-date-${index}`}
            />
          </div>
          <div className="flex gap-4 justify-between pt-4">
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  onDeleteExpense(expense);
                }}>
                Delete
              </Button>
            </DialogClose>
            <div className="flex gap-4">
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    const name = (
                      document.getElementById(
                        `edit-name-${index}`,
                      ) as HTMLInputElement
                    ).value;
                    const amt = parseFloat(
                      (
                        document.getElementById(
                          `edit-amount-${index}`,
                        ) as HTMLInputElement
                      ).value,
                    );
                    const date = new Date(
                      (
                        document.getElementById(
                          `edit-date-${index}`,
                        ) as HTMLInputElement
                      ).value,
                    );
                    onEditExpense(expense, { name: name, amount: amt, date });
                  }}>
                  Save
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import {
    Dialog,
    DialogContent,
    DialogDescription,
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
    description: string;
    amount: number;
    date: Date;
}

export default function EditExpenseForm({ expense, index, onEditExpense, onDeleteExpense }: { expense: Expense; index: number; onEditExpense: (oldExpense: Expense, newExpense: Expense) => void; onDeleteExpense: (expense: Expense) => void }) {
    return (
        <Dialog key={index}>
            <DialogTrigger asChild>
                <TableRow className="cursor-pointer hover:bg-gray-100">
                    <TableCell>
                        {expense.description.length > 10
                            ? expense.description.substring(0, 10) + "..."
                            : expense.description}
                    </TableCell>
                    <TableCell>${expense.amount}</TableCell>
                    <TableCell>
                        {expense.date.toLocaleDateString('en-US', {timeZone: 'UTC'})}
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
                            defaultValue={expense.description}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            id={`edit-desc-${index}`}
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
                            defaultValue={expense.date.toISOString().split('T')[0]}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            id={`edit-date-${index}`}
                        />
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onClick={() => {
                                    const desc = (document.getElementById(`edit-desc-${index}`) as HTMLInputElement).value;
                                    const amt = parseFloat((document.getElementById(`edit-amount-${index}`) as HTMLInputElement).value);
                                    const date = new Date((document.getElementById(`edit-date-${index}`) as HTMLInputElement).value);
                                    onEditExpense(expense, { description: desc, amount: amt, date });
                                }}
                            >
                                Save
                            </Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                onDeleteExpense(expense);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>);
}
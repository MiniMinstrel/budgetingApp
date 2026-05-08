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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { X, Pencil, PlusIcon } from "lucide-react";

export default function CategoryBlock({ category }: { category: Category }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;
  return (
    <>
      <Card className="pb-6 md:pb-10">
        <CardHeader>
          <CardTitle className="flex justify-between items-center text-4xl font-bold text-left">
            <p>{category.getName()}</p>
            {}
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border drop-shadow-md border-gray-300">
                    <PlusIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger className="-mt-2" asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-0 border drop-shadow-md border-gray-300">
                    <Pencil />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
          <CardDescription className="text-left text-sm text-gray-500">
            {category.getExpenses().length} Expenses
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
                        .reverse()
                        .slice(0, 2)
                        .map((expense, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {expense.description.length > 10
                                ? expense.description.substring(0, 10) + "..."
                                : expense.description}
                            </TableCell>
                            <TableCell>${expense.amount}</TableCell>
                            <TableCell>
                              {expense.date.toLocaleDateString()}
                            </TableCell>
                          </TableRow>
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
          </div>
        </CardContent>
      </Card>
    </>
  );
}

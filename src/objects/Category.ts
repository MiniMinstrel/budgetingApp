class Category {
    private id: number;
    private name: string;
    private maxBudget: number;
    private amountSpent: number;
    private expenses: Expense[];

    constructor(id: number, name: string, maxBudget: number, expenses: Expense[] = []) {
        this.id = id;
        this.name = name;
        this.maxBudget = maxBudget;
        this.amountSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        this.expenses = expenses;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getMaxBudget(): number {
        return this.maxBudget;
    }

    getAmountSpent(): number {
        return this.amountSpent;
    }

    getExpenses(): Expense[] {
        return this.expenses.reverse();
    }

    getRemainingBudget(): number {
        return this.maxBudget - this.amountSpent;
    }
}

export interface Expense {
    id?: number;
    name: string;
    amount: number;
    date: Date;
}

export default Category;
class Category {
    private name: string;
    private maxBudget: number;
    private amountSpent: number;
    private expenses: Expense[];

    constructor(name: string, maxBudget: number, expenses: Expense[] = []) {
        this.name = name;
        this.maxBudget = maxBudget;
        this.amountSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        this.expenses = expenses;
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
        return this.expenses;
    }

    getRemainingBudget(): number {
        return this.maxBudget - this.amountSpent;
    }
}

interface Expense {
    description: string;
    amount: number;
    date: Date;
}

export default Category;
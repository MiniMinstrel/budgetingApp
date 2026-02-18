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

    setName(name: string): void {
        this.name = name;
    }

    getMaxBudget(): number {
        return this.maxBudget;
    }

    setMaxBudget(maxBudget: number): void {
        this.maxBudget = maxBudget;
    }

    getAmountSpent(): number {
        return this.amountSpent;
    }

    setAmountSpent(amountSpent: number): void {
        this.amountSpent = amountSpent;
    }

    getExpenses(): Expense[] {
        return this.expenses;
    }

    setExpenses(expenses: Expense[]): void {
        this.expenses = expenses;
    }

    addExpense(expense: Expense): void {
        this.expenses.push(expense);
        this.amountSpent += expense.amount;
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
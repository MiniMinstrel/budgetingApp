import Category from '../objects/Category';


const addExpense = (
    categoryIndex: number,
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    expense: { description: string; amount: number; date: Date },
  ) => {
    setCategories((prev) => {
      const updated = [...prev];
      const currentCategory = updated[categoryIndex];
      const newExpenses = [expense, ...currentCategory.getExpenses()];
      updated[categoryIndex] = new Category(
        currentCategory.getName(),
        currentCategory.getMaxBudget(),
        newExpenses,
      );
      return updated;
    });
  };

  const changeCategoryInformation = (
    categoryIndex: number,
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    name: string,
    maxBudget: number,
  ) => {
    setCategories((prev) => {
      const updated = [...prev];
      const currentCategory = updated[categoryIndex];
      updated[categoryIndex] = new Category(
        name,
        maxBudget,
        currentCategory.getExpenses(),
      );
      return updated;
    });
  };

  const deleteCategory = (categoryIndex: number, setCategories: React.Dispatch<React.SetStateAction<Category[]>>) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated.splice(categoryIndex, 1);
      return updated;
    });
  };

  const editExpense = (
    categoryIndex: number,
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    oldExpense: { description: string; amount: number; date: Date },
    newExpense: { description: string; amount: number; date: Date },
  ) => {
    setCategories((prev) => {
      const updated = [...prev];
      const currentCategory = updated[categoryIndex];
      const expenses = currentCategory.getExpenses();
      const expenseIndex = expenses.findIndex(
        (e) => e.description === oldExpense.description && e.amount === oldExpense.amount
      );
      if (expenseIndex !== -1) {
        expenses[expenseIndex] = newExpense;
      }
      updated[categoryIndex] = new Category(
        currentCategory.getName(),
        currentCategory.getMaxBudget(),
        expenses,
      );
      return updated;
    });
  };

  const deleteExpense = (
    categoryIndex: number,
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    expense: { description: string; amount: number; date: Date },
  ) => {
    setCategories((prev) => {
      const updated = [...prev];
      const currentCategory = updated[categoryIndex];
      const expenses = currentCategory.getExpenses().filter(
        (e) => !(e.description === expense.description && e.amount === expense.amount)
      );
      updated[categoryIndex] = new Category(
        currentCategory.getName(),
        currentCategory.getMaxBudget(),
        expenses,
      );
      return updated;
    });
  };

  export { addExpense, changeCategoryInformation, deleteCategory, editExpense, deleteExpense };

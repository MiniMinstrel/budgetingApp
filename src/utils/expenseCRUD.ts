import axios from 'axios';
import Category, { Expense } from '../objects/Category';


const addExpense = (
  categoryId: number,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  expense: Expense,
) => {
  axios.post(`http://localhost:5298/categories/${categoryId}/expenses`, {
    name: expense.name,
    amount: expense.amount,
    date: expense.date.toISOString().split('T')[0],
  }).then((response) => {
    setCategories((prev) => {
      const updated = [...prev];
      const categoryIndex = updated.findIndex((e) => e.getId() === categoryId);
      const currentCategory = updated[categoryIndex];
      const newExpenses = [{ ...expense, id: response.data.id } as Expense, ...currentCategory.getExpenses()];
      updated[categoryIndex] = new Category(
        currentCategory.getId(),
        currentCategory.getName(),
        currentCategory.getMaxBudget(),
        newExpenses,
      );
      return updated;
    });
  });
};

const changeCategoryInformation = (
  categoryId: number,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  name: string,
  maxBudget: number,
) => {
  console.log(categoryId)
  const response = axios.put(`http://localhost:5298/categories/${categoryId}`, {
    name,
    maxBudget,
  });
  response.then(() => {
    setCategories((prev) => {
      const updated = [...prev];
      const categoryIndex = updated.findIndex((e) => e.getId() == categoryId)
      if (categoryIndex !== -1) {
        const currentCategory = updated[categoryIndex];
        updated[categoryIndex] = new Category(
          currentCategory.getId(),
          name,
          maxBudget,
          currentCategory.getExpenses(),
        );
      }
      return updated;
    });
  });
}

const deleteCategory = (categoryId: number, setCategories: React.Dispatch<React.SetStateAction<Category[]>>) => {
  axios.delete(`http://localhost:5298/categories/${categoryId}`).then(() => {
    setCategories((prev) => {
      const updated = [...prev];
      const categoryIndex = updated.findIndex((e) => e.getId() === categoryId);
      if (categoryIndex !== -1) {
        updated.splice(categoryIndex, 1);
      }
      return updated;
    });
  });
};

const editExpense = (
  categoryId: number,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  oldExpense: Expense,
  newExpense: Expense,
) => {
  axios.put(`http://localhost:5298/categories/${categoryId}/expenses/${oldExpense.id}`, {
    name: newExpense.name,
    amount: newExpense.amount,
    date: newExpense.date.toISOString().split('T')[0],
  }).then(() => {
    setCategories((prev) => {
      const updated = [...prev];
      const categoryIndex = updated.findIndex((e) => e.getId() === categoryId);
      const currentCategory = updated[categoryIndex];
      const expenses = currentCategory.getExpenses();
      const expenseIndex = expenses.findIndex(
        (e) => e.id == oldExpense.id
      );
      if (expenseIndex !== -1) {
        expenses[expenseIndex] = newExpense;
      }
      updated[categoryIndex] = new Category(
        currentCategory.getId(),
        currentCategory.getName(),
        currentCategory.getMaxBudget(),
        expenses,
      );
      return updated;
    });
  });
};

const deleteExpense = (
  categoryId: number,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  expense: Expense,
) => {
  console.log(expense)
  axios.delete(`http://localhost:5298/categories/${categoryId}/expenses/${expense.id}`).then(() => {
    setCategories((prev) => {
      const updated = [...prev];
      const categoryIndex = updated.findIndex((e) => e.getId() === categoryId);
      const currentCategory = updated[categoryIndex];
      const expenses = currentCategory.getExpenses().filter(
        (e) => !(e.id == expense.id)
      );
      updated[categoryIndex] = new Category(
        currentCategory.getId(),
        currentCategory.getName(),
        currentCategory.getMaxBudget(),
        expenses,
      );
      return updated;
    });
  })
};

export { addExpense, changeCategoryInformation, deleteCategory, editExpense, deleteExpense };

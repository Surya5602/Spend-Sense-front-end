import { Calendar } from "rsuite";
import "rsuite/Calendar/styles/index.css";
import "./calendar.css";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Contexts/dataContext.jsx";

const TransactionCalendar = () => {
  const response = useContext(DataContext);
  const [expense, setExpense] = useState({});

  useEffect(() => {
    if (response?.transaction) {
      const updatedExpense = {};
      response.transaction.forEach((singleTransaction) => {
        const date = new Date(singleTransaction.createdAt).toDateString();
        if (!updatedExpense[date]) {
          updatedExpense[date] = { income: 0, expense: 0 };
        }
        if (singleTransaction.type === "income") {
          updatedExpense[date].income += singleTransaction.amountSpend;
        } else if (singleTransaction.type === "expense") {
          updatedExpense[date].expense += singleTransaction.amountSpend;
        }
      });
      setExpense(updatedExpense);
    }
  }, [response]);
  const addDatasToDate = (date) => {
    const day = new Date(date).toDateString();
    const values = expense[day];
    if (typeof values !== "undefined") {
      const showingOutput = values.income - values.expense;
      return (
        <div
          className={`${showingOutput < 0 ? "expenseClass" : "incomeClass"}`}
        >
          {showingOutput}
        </div>
      );
    }
  };
  return (
    <div className="calendar-com">
      <Calendar key={JSON.stringify(expense)} renderCell={addDatasToDate} />
    </div>
  );
};
export default TransactionCalendar;

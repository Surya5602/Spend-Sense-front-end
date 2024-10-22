import Navbar from "../../Components/Navbar/Navbar.jsx";
import Summary from "../../Components/Summary/Summary.jsx";
import Chart from "../../Components/ChartOverview/Chart.jsx";
import "./home.css";
import TransactionDetail from "../../Components/TransactionDetail/TransactionDetail.jsx";
import AccountDetails from "../../Components/AccountOverview/AccountDetails.jsx";
import CreditTab from "../../Components/CreditTab/CreditTab.jsx";
import { useContext } from "react";
import { DataContext } from "../../Contexts/dataContext.jsx";

const Home = () => {
  const data = useContext(DataContext);
  const today = new Date();
  const currMonth = today.getMonth();
  const lastMonth = currMonth === 0 ? 11 : currMonth - 1;
  const currYear = today.getFullYear();
  const lastMonthYear = currMonth === 0 ? currYear - 1 : currYear;

  let thisMonthObj = { income: 0, expense: 0, total: 0, name: "This month" };
  let lastMonthObj = { income: 0, expense: 0, total: 0, name: "Last month" };

  data?.transaction.forEach((singleTransaction) => {
    const transactionDate = new Date(singleTransaction.createdAt);
    const transactionMonth = transactionDate.getMonth();
    const transactionYear = transactionDate.getFullYear();

    if (singleTransaction.type === "income") {
      if (transactionMonth === currMonth && transactionYear === currYear) {
        thisMonthObj.income += singleTransaction.amountSpend;
      } else if (
        transactionMonth === lastMonth &&
        transactionYear === lastMonthYear
      ) {
        lastMonthObj.income += singleTransaction.amountSpend;
      }
    } else {
      if (transactionMonth === currMonth && transactionYear === currYear) {
        thisMonthObj.expense += singleTransaction.amountSpend;
      } else if (
        transactionMonth === lastMonth &&
        transactionYear === lastMonthYear
      ) {
        lastMonthObj.expense += singleTransaction.amountSpend;
      }
    }
  });
  thisMonthObj.total = thisMonthObj.income - thisMonthObj.expense;
  lastMonthObj.total = lastMonthObj.income - lastMonthObj.expense;
  return (
    <div className="homeComponent">
      <Navbar pageName={"Overview"} />
      <div className="firstRow">
        <Summary data={thisMonthObj} />
        <Chart values={thisMonthObj} />
        <Chart values={lastMonthObj} />
      </div>
      <div className="secondRow">
        <div className="cred-acc">
          <AccountDetails details={data?.accounts} />
          <CreditTab />
        </div>
        <TransactionDetail transactions={data?.transaction} isHomePage={true} />
      </div>
    </div>
  );
};
export default Home;

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useContext, useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./chart.css";
import PieChartTab from "../PieChartTab/PieChartTab";
import { DataContext } from "../../Contexts/dataContext.jsx";

const Chart = () => {
  const [value, setValue] = useState("0");
  const responseData = useContext(DataContext);
  const [allData, setAllData] = useState([
    { incomeData: null },
    { expenseData: null },
  ]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (responseData?.transaction) {
      let incomeObj = { id: 0, value: 0, label: "income" };
      let expenseObj = { id: 1, value: 0, label: "expense" };
      let newIncomeData = {};
      let newExpenseData = {};
      responseData.transaction.forEach((singleTransaction) => {
        if (
          singleTransaction.type === "income" &&
          typeof singleTransaction.amountSpend !== undefined
        ) {
          incomeObj.value += singleTransaction.amountSpend;
          let prevVal = newIncomeData[singleTransaction.subCategory.name]
            ? newIncomeData[singleTransaction.subCategory.name]
            : 0;
          newIncomeData[singleTransaction.subCategory.name] =
            prevVal + singleTransaction.amountSpend;
        } else if (
          singleTransaction.type === "expense" &&
          typeof singleTransaction.amountSpend !== undefined
        ) {
          expenseObj.value += singleTransaction.amountSpend;
          let prevVal = newExpenseData[singleTransaction.subCategory.name]
            ? newExpenseData[singleTransaction.subCategory.name]
            : 0;
          newExpenseData[singleTransaction.subCategory.name] =
            prevVal + singleTransaction.amountSpend;
        }
      });
      let newIncomeDataArray = [];
      let newExpenseDataArray = [];
      if (newIncomeData) {
        Object.keys(newIncomeData).map((incomeVal, index) => {
          newIncomeDataArray.push({
            id: index,
            value: newIncomeData[incomeVal],
            label: incomeVal,
          });
        });
      }
      if (newExpenseData) {
        Object.keys(newExpenseData).map((expenseVal, index) => {
          newExpenseDataArray.push({
            id: index,
            value: newExpenseData[expenseVal],
            label: expenseVal,
          });
        });
      }
      setIncomeData(newIncomeDataArray);
      setExpenseData(newExpenseDataArray);
      setAllData([incomeObj, expenseObj]);
    }
  }, [responseData]);

  return (
    <div className="chartTab">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value} defaultValue="0">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Chart analysis tab"
              centered
            >
              <Tab
                icon={<SwapVertIcon />}
                iconPosition="start"
                label="All"
                value="0"
              />
              <Tab
                icon={<ArrowDownwardIcon />}
                iconPosition="start"
                label="income"
                value="1"
              />
              <Tab
                icon={<ArrowUpwardIcon />}
                iconPosition="start"
                label="expense"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="0">
            <PieChartTab data={allData} />
          </TabPanel>
          <TabPanel value="1">
            <PieChartTab data={incomeData} />
          </TabPanel>
          <TabPanel value="2">
            <PieChartTab data={expenseData} />
          </TabPanel>
        </TabContext>
      </Box>
      <div className="pieDiagram"></div>
    </div>
  );
};
export default Chart;

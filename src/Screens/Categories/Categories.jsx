import { Tab, Tabs } from "react-bootstrap";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./categories.css";
import axios from "axios";
import { API_URL } from "../../constants.js";
import { useEffect, useState } from "react";
import CategoryTab from "../../Components/CategoryTab/CategoryTab.jsx";
const Categories = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${API_URL}/getCategoryData`);
        setIncomes(response.data.data.income);
        setExpenses(response.data.data.expense);
      } catch (error) {
        console.log("Error while fetching: ", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div>
      <Navbar pageName={"Categories Management"} />
      <div className="CategoryTab">
        <Tabs defaultActiveKey="income" id="justify-tab-example" justify>
          <Tab eventKey="income" title="Income">
            <CategoryTab arrays={incomes} />
          </Tab>
          <Tab eventKey="expense" title="Expense">
            <CategoryTab arrays={expenses} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default Categories;

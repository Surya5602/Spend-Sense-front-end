import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./constants.js";
import { UserProvider } from "./Contexts/userContext.jsx";
import { fetchAccounts , fetchTransactions } from "./Helpers/applicationHelpers.jsx";
import { DataProvider } from "./Contexts/dataContext.jsx";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (token) {
          const response = await axios.post(`${API_URL}/checkTokenExpiration`, {
            token,
          });
          if (response.status === 200 && response.data.status === true) {
            setIsAuthenticated(true);
          } else {
            localStorage.clear(token);
            setIsAuthenticated(false);
          }
        } else {
          localStorage.clear(token);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking token expiration:", error);
        setIsAuthenticated(false);
      }
    };
    checkToken();
  }, [token]);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (token) {
        try {
          const accountDetails = await fetchAccounts(token);
          const transactionDetail = await fetchTransactions(token);
          setData({ accounts: accountDetails , transaction: transactionDetail});
        } catch (error) {
          console.error("Error fetching account details", error);
        }
      }
    };
    fetchAccountDetails();
  }, [isAuthenticated]);
  if (isAuthenticated === null) {
    return <div>Checking</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <UserProvider value={token}>
      <DataProvider value={data}>{children}</DataProvider>
    </UserProvider>
  );
};

export default PrivateRoute;

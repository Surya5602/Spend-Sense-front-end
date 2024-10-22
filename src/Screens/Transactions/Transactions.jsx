import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./transaction.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Months } from "../../constants.js";
import { Fragment, useContext, useEffect, useState } from "react";
import PlusIcon from "../../Components/PlusIcon/PlusIcon.jsx";
import MinusIcon from "../../Components/MinusIcon/MinusIcon.jsx";
import TransactionForm from "../../Components/TransactionForm/TransactionForm.jsx";
import TransactionDetail from "../../Components/TransactionDetail/TransactionDetail.jsx";
import { UserContext } from "../../Contexts/userContext.jsx";
import { DataContext } from "../../Contexts/dataContext.jsx";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchTransactions } from "../../Helpers/applicationHelpers.jsx";

const Transactions = () => {
  const [modal, setModal] = useState(false);
  const userToken = useContext(UserContext);
  const dataDetails = useContext(DataContext);
  const [menuDetails, setMenuDetails] = useState({
    name: "New expense",
    type: "expense",
  });
  const [allTransactions, setAllTransactions] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const currentMonth = Months[month];
  const [currentMonthNum, setCurrentMonthNum] = useState(currentMonth);
  const year = date.getFullYear();
  const ModalUpdate = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  const addPlusDetails = () => {
    setMenuDetails((prevVal) => ({
      ...prevVal,
      name: "New Income",
      type: "income",
    }));
    ModalUpdate();
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
  const addMinusDetails = () => {
    setMenuDetails((prevVal) => ({
      ...prevVal,
      name: "New Expense",
      type: "expense",
    }));
    ModalUpdate();
  };
  const findThatMonthsTransactions = (date) => {
    const filteredObj = allTransactions?.filter((singleTransaction) => {
      const transactionDate = new Date(singleTransaction.createdAt);
      return (
        date.getMonth() === transactionDate.getMonth() &&
        date.getFullYear() === transactionDate.getFullYear()
      );
    });
    setTransactions(filteredObj);
  };
  const changeMonth = async (todo) => {
    if (todo == "dec") {
      let prevMonth = month - 1;
      if (prevMonth >= 0) {
        setMonth((prevVal) => prevVal - 1);
        setCurrentMonthNum(Months[prevMonth]);
        findThatMonthsTransactions(new Date(2024, prevMonth, 1));
      }
    } else {
      let nextMonth = month + 1;
      if (nextMonth < 12) {
        setMonth((prevVal) => prevVal + 1);
        setCurrentMonthNum(Months[nextMonth]);
        findThatMonthsTransactions(new Date(2024, nextMonth, 1));
      }
    }
  };
  const fetchTransactionDetails = async () => {
    if (userToken) {
      const transactionDetail = await fetchTransactions(userToken);
      setAllTransactions(transactionDetail);
    }
  };
  useEffect(() => {
    fetchTransactionDetails();
  }, [userToken]);
  useEffect(() => {
    const today = new Date();
    findThatMonthsTransactions(today);
  }, allTransactions);
  return (
    <div className="mainTransaction">
      <div>
        <Navbar pageName={"Transactions"} />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          severity="success"
          message={alertMessage}
          action={action}
          key={"top" + "right"}
        />
        <div className="mainComponent">
          <div className="calendar">
            <div
              className="arrow-icon"
              onClick={() => {
                changeMonth("dec");
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div>{`${currentMonthNum} ${year}`}</div>
            <div
              className="arrow-icon"
              onClick={() => {
                changeMonth("inc");
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
          <TransactionDetail transactions={transactions} />
        </div>
        <div onClick={addPlusDetails}>
          <PlusIcon />
        </div>
        <div onClick={addMinusDetails}>
          <MinusIcon />
        </div>
      </div>
      <TransactionForm
        modalHeading={menuDetails["name"]}
        currentState={modal}
        updateState={setModal}
        type={menuDetails["type"]}
        data={dataDetails}
        userToken={userToken}
        setAlert={setAlertMessage}
        openPopup={setOpen}
        fetchTransactions={fetchTransactionDetails}
      />
    </div>
  );
};
export default Transactions;

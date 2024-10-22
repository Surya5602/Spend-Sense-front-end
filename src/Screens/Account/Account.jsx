import { Fragment, useEffect, useState } from "react";
import DynamicForm from "../../Components/DynamicForm/DynamicForm.jsx";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import PlusIcon from "../../Components/PlusIcon/PlusIcon.jsx";
import "./account.css";
import AccountDetails from "../../Components/AccountDetail/AccountDetails.jsx";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserConsumer } from "../../Contexts/userContext.jsx";
import { fetchAccounts } from "../../Helpers/applicationHelpers.jsx";

const Account = () => {
  const fields = [
    {
      name: "accountName",
      label: "Account Name*",
      type: "text",
      placeholder: "Enter account name",
    },
    {
      name: "balance",
      label: "Balance*",
      type: "number",
      placeholder: "Enter balance",
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Optinal",
    },
  ];
  const [token, setToken] = useState("");
  const [accountDetails, setAccountDetails] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  
  const fetchAccountDetails = async()=>{
    if(token){
      const accountDetails = await fetchAccounts(token)
      setAccountDetails(accountDetails) 
    }
  }
  useEffect(() => {
    fetchAccountDetails();
  }, [token]);

  const handleClick = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
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
  return (
    <UserConsumer>
      {(token) => {
        setToken(token);
        return (
          <div>
            <Navbar pageName={"Account"} />
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              severity="success"
              message={alertMessage}
              action={action}
              key={"top" + "right"}
            />
            <div className="accountMainDiv">
              <div>
                <AccountDetails details={accountDetails} fetchAccountDetails={fetchAccountDetails} setAlertMessage={setAlertMessage} openPopup={setOpen}/>
              </div>
              <div onClick={handleClick}>
                <PlusIcon />
              </div>
            </div>
            <DynamicForm
              fields={fields}
              modalHeading={"Create New Account"}
              currentState={show}
              updateState={setShow}
              openPopup={setOpen}
              setAlertMessage={setAlertMessage}
              fetchAccounts = {fetchAccountDetails}
              token={token}
            />
          </div>
        );
      }}
    </UserConsumer>
  );
};
export default Account;

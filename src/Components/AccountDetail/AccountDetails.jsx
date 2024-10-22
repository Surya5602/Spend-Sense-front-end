import "./accountdetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../constants";
const AccountDetails = ({ details , fetchAccountDetails , setAlertMessage, openPopup}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [deletePopup, setDeletePopup] = useState({
    status: false,
    accountId: null,
  });
  const handleClickOpen = (accountId) => {
    setDeletePopup({ ...deletePopup, status: true , accountId: accountId });
    setOpenMenuIndex(null);
  };

  const handleClose = () => {
    setDeletePopup({ ...deletePopup, status: false });
    setOpenMenuIndex(null);
  };
  const handleDelete = async() =>{
      try{
        const response = await axios.post(`${API_URL}/deleteAccount` , {accountId: deletePopup.accountId})
        if(response.status===200){
          handleClose();
          openPopup(true);
          setAlertMessage("Account Deleted Successfully")
          fetchAccountDetails();
        }
      }catch(err){
        console.log("Error", err);
      }
  }
  const updateModal = (index) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const totalBalance = details?.reduce(
    (total, detail) => total + detail.initialAmount,
    0
  );
  return (
    <div className="Accounts">
      <div className="AccountDetail totalDiv">
        <div>Total:</div>
        <div className="balance">₹{totalBalance}</div>
      </div>
      {details.map((detail, index) => (
        <div className="AccountDetail" key={index}>
          <div className="details">
            <div>{detail.name}</div>
            <div className="amount">₹{detail.initialAmount}</div>
          </div>
          <div className="noteDetials">
            <div className="notes">{detail.notes}</div>
            <div className="editIcon">
              <FontAwesomeIcon
                className="three-dot"
                onClick={() => updateModal(index)}
                icon={faEllipsisVertical}
              />
              {openMenuIndex === index && (
                <div className="menu">
                  <ul>
                    <li onClick={()=>handleClickOpen(detail.id)}>Delete</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <Dialog
        open={deletePopup.status}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Account Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this account will remove all associated transactions. Are
            you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AccountDetails;

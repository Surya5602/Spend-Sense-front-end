import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./transactionForm.css";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import CategoryModal from "../CategoryModal/CategoryModal";
import axios from "axios";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { API_URL } from "../../constants";

const TransactionForm = ({
  modalHeading,
  currentState,
  updateState,
  type,
  data,
  userToken,
  openPopup,
  setAlert,
  fetchTransactions,
}) => {
  let [formData, setFormData] = useState({
    accountId: data?.accounts[0]?.id,
    type: type,
  });
  const [error, setError] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [selectedCategory, setSelectCategory] = useState({
    image: "https://webapp.fastbudget.app/static/icons/ic_blank_grey.svg",
    name: "",
    id: "",
  });
  const handleClose = () => {
    updateState(!currentState);
  };
  const updateForm = (event, key) => {
    setFormData({ ...formData, [key]: event.target.value });
  };
  const handleSelectChange = (event, key) => {
    setFormData({ ...formData, [key]: event.target.value });
  };
  const dateOnChange = (event , key) => {
    let date = new Date( event.$d);
    date = date.toISOString();
    setFormData({ ...formData, [key]: date});
  };
  const updateTransactions = async () => {
    const allRequiredField =
      formData.accountId &&
      formData.type &&
      formData.detail &&
      formData.categoryId &&
      formData.amount &&
      formData.Date && 
      formData.accountId !== "";
    if (allRequiredField) {
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      try {
        const response = await axios.post(
          `${API_URL}/addTransactions`,
          { formData },
          config
        );
        if (response.status === 200 && response.data.status === true) {
          openPopup(true);
          formData = {};
          setAlert(response.data.message);
          setError("");
          handleClose();
          fetchTransactions();
        } else {
          openPopup(true);
          setAlert(response.data.message);
          console.log("error", response);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setError("Fill all required fields");
    }
  };
  useEffect(() => {
    setFormData({ ...formData, categoryId: selectedCategory.id });
  }, [selectedCategory]);
  useEffect(() => {
    setFormData({ ...formData, type: type });
  }, [type]);

  return (
    <div className="totalModal">
      <Modal className="detailModal" show={currentState} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="select-category">
              <div className="subCategory">
                <label htmlFor="category">Select Category*: </label>
                <img className="subCategoryImage" src={selectedCategory.image} alt="sub-category-image" />
                <input
                  type="text"
                  placeholder="Select category"
                  onClick={() => setCategoryModal(true)}
                  value={selectedCategory.name}
                  readOnly
                />
              </div>
              <div className="subCategory">
                <label htmlFor="name">Transaction Name*: </label>
                <input
                  type="text"
                  placeholder="Eg: Evening Travel"
                  onChange={(e) => updateForm(e, "detail")}
                />
              </div>
              <div className="subCategory">
                <label htmlFor="price">Value*: </label>
                <input
                  type="number"
                  placeholder="Enter the amount"
                  onChange={(e) => updateForm(e, "amount")}
                />
              </div>
              <div className="subCategory">
                <label htmlFor="account">Account*: </label>
                <select
                  name="Account"
                  onChange={(e) => handleSelectChange(e, "accountId")}
                >
                  <option value="">Select an Account</option>
                  {data?.accounts?.map((account, index) => (
                    <option value={account.id} key={index}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="subCategory">
                <label htmlFor="account">Date*: </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker onChange={(e)=> dateOnChange(e , "Date")}/>
                </LocalizationProvider>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {error ? <p className="errorMessage">{error}</p> : ""}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className={`${type === "expense" ? "redButton" : "greenButton"}`}
            variant="primary"
            onClick={updateTransactions}
          >
            Add {type}
          </Button>
        </Modal.Footer>
      </Modal>
      {categoryModal && (
        <CategoryModal
          currentState={categoryModal}
          updateState={setCategoryModal}
          type={type}
          setSelectCategory={setSelectCategory}
        />
      )}
    </div>
  );
};
export default TransactionForm;

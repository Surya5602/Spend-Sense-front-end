import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Dynamicform.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { API_URL } from "../../constants.js";
const DynamicForm = ({
  fields,
  modalHeading,
  currentState,
  updateState,
  openPopup,
  setAlertMessage,
  token,
  fetchAccounts,
}) => {
  let [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field.name]: e.target.value,
    });
  };
  const handleClose = () => {
    if (currentState) {
      updateState(false);
    } else {
      updateState(true);
    }
  };
  const AddAccount = async () => {
    if (formData.accountName !== undefined || formData.balance !== undefined) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const response = await axios.post(
          `${API_URL}/addAccounts`,
          { formData },
          config
        );
        if (response.status === 200 && response.data.status === true) {
          openPopup(true);
          setFormData({});
          setAlertMessage(response.data.message);
          fetchAccounts(token);
          handleClose();
        } else {
          openPopup(true);
          setAlertMessage(response.data.message);
          console.log("error", response);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setError((prevVal) => {
        prevVal = "Enter all required Fields";
        return prevVal;
      });
    }
  };
  return (
    <div>
      <Modal show={currentState} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {fields.map((field, index) => (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                key={index}
              >
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(e, field)}
                  autoFocus={index === 0}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {error ? <p className="errorMessage">{error}</p> : ""}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddAccount}>
            Add Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default DynamicForm;

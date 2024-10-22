import { Button, Modal } from "react-bootstrap";
import SelectCategory from "../SelectCategory/SelectCategory";

const CategoryModal = ({ currentState, updateState , type , setSelectCategory}) => {
  const handleClose = () => {
    if (currentState) {
      updateState(false);
    } else {
      updateState(true);
    }
  };

  return (
    <div className="categoryModal">
      <Modal className="detailModal" show={currentState} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectCategory type={type} selectedCategory={setSelectCategory} close={handleClose}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default CategoryModal;

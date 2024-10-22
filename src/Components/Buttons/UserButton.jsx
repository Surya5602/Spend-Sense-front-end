import { Button } from "react-bootstrap";

const UserButton = ({ NameOfButton, classNameString , functionTriggered }) => {
  return (
    <Button
      type="sumbit"
      className={classNameString}
      onClick={() => functionTriggered()}
    >
      {NameOfButton}
    </Button>
  );
};
export default UserButton;

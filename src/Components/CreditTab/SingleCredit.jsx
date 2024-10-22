import { Progress } from "rsuite";
import "rsuite/Progress/styles/index.css";
import Styles from "./credit.module.css";
const SingleCredit = ({ percent, cardName , index ,amountSpend }) => {
  return (
    <div key={index}>
      <div className={Styles.Details}>
        <p className={Styles.cardName}>{cardName}</p>
        <p className={Styles.Amount}>-₹{amountSpend}</p>
      </div>
      <Progress.Line percent={percent} status="active" />
    </div>
  );
};
export default SingleCredit;

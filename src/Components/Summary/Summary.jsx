import "./summary.css";
const Summary = ({data}) => {
  return (
    <div className="summary">
      <div className="header">Summary</div>
      <div className="body">
        <div className="flex space-between pRL income">
          <p>Income:</p>
          <p className="total">₹ {data.income}</p>
        </div>
        <div className="flex space-between pRL expense">
          <p>Expense:</p>
          <p className="total">- ₹ {data.expense}</p>
        </div>

        <div className="Balance">
          <hr />
          <p>₹ {data.total}</p>
        </div>
      </div>
    </div>
  );
};
export default Summary;

import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./transaction.css";
const TransactionDetail = ({ transactions, isHomePage }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };
  const totalAmount = transactions?.reduce((acc, transaction) => {
    return acc + transaction.amountSpend;
  }, 0);
  const displayedTransactions = isHomePage
    ? transactions?.slice(0, 7)
    : transactions;
  return (
    <div className="transaction">
      <div className="header">
        <div className="count">
          <p>Transactions:</p>
          <p>{transactions?.length}</p>
        </div>
        <div className="total">
          <p>Total:</p>
          <p className="price">₹{totalAmount}</p>
        </div>
      </div>

      {displayedTransactions?.map((transaction, index) => (
        <div
          className={`${
            transaction.type === "expense" ? "redBorder" : "greenBorder"
          } singleTransaction`}
          key={index}
        >
          <div className="category">
            <img
              src={transaction.subCategory.picture}
              alt={`${transaction.subCategory.name} image`}
            />
            <div>
              <p className="subCategory">{transaction.subCategory.name}</p>
              <p className="account-name">{transaction.account.name}</p>
            </div>
          </div>
          <div className="amount-details">
            <div className="details">
              {}
              <p className="amount-spent">
                {transaction.type === "expense" ? "-" : ""}₹
                {transaction.amountSpend}
              </p>
              <p className="spent-date">{formatDate(transaction.createdAt)}</p>
            </div>
            <FontAwesomeIcon className="three-dot" icon={faEllipsisVertical} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default TransactionDetail;

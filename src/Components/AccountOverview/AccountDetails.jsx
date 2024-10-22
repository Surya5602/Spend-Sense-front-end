import "./accountdetail.css";
const AccountDetails = ({ details }) => {
  return (
    <div className="Accounts">
      <p>Accounts</p>
      {details?.map((detail, index) => (
        <div className="AccountDetail" key={index}>
          <div className="details">
            <div>{detail.name}</div>
            <div className="amount">₹{detail.initialAmount}</div>
          </div>
          <div className="noteDetials">
            <div className="notes">{detail.notes}</div>
          </div>
          {details[index + 1] && <hr />}
        </div>
      ))}
    </div>
  );
};
export default AccountDetails;

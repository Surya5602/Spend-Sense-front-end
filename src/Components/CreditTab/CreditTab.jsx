import Styles from "./credit.module.css";
import SingleCredit from "./SingleCredit";

const CreditTab = () => {
  const CreditCards = [
    { name: "ICICI Card", percentage: 36, amountSpend: 4046 },
    { name: "SBI Card", percentage: 57, amountSpend: 3769 },
  ];
  return (
    <div className={Styles.comingSoonTab}>
      Credit Card Option Coming soon ... 
    </div>
    // <div className={Styles.CreditTab}>
    //   <p className={Styles.header}>Credit Card</p>
    //   {CreditCards.map((card , index) => (
    //     <SingleCredit percent={card.percentage} cardName={card.name} index={index} amountSpend={card.amountSpend}/>
    //   ))}
    // </div>
  );
};
export default CreditTab;

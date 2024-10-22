import Navbar from "../../Components/Navbar/Navbar.jsx";
import TransactionCalendar from "../../Components/TransactionCalendar/TransactionCalendar.jsx";

const CalendarScreen = () => {
  return (
    <div>
      <Navbar pageName={"Calendar"} />
      <TransactionCalendar/>
    </div>
  );
};
export default CalendarScreen;

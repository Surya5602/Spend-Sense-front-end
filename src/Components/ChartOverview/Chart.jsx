import { PieChart } from "@mui/x-charts/PieChart";

const Chart = ({values}) => {
  const data = [
    { id: 0, value: values.income },
    { id: 1, value: values.expense },
  ];
  return (
    <div className="chart">
      <div className="pieDiagram">
        <PieChart
          colors={["green", "red"]}
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={200}
        />
      </div>
      <div className="details">
        <div>
          <p className="month">{values.name}</p>
          <div className="amount">
            <div className="income">
            <p className="total">₹ {values.income}</p>
            </div>
            <div className="expense">
            <p className="total">- ₹ {values.expense}</p>
            </div>
            <div className="balance">
              <hr />
              <p>₹ {values.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chart;

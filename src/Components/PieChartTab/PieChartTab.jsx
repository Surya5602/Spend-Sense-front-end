import { PieChart } from "@mui/x-charts/PieChart"

const PieChartTab = ({data})=>{
    return(
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={400}
          width={800}
        />
    )
}
export default PieChartTab
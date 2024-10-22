import Chart from '../../Components/ChartTab/Chart.jsx';
import Navbar  from '../../Components/Navbar/Navbar.jsx';
import './chart.css'

const Charts = ()=>{
    return(
        <div className='chartTabCom'>
            <Navbar pageName={"Chart"}/>
            <Chart/>
        </div>
    )
}
export default Charts
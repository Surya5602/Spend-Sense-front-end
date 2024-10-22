import { faMinus } from "@fortawesome/free-solid-svg-icons"
import './minusicon.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const MinusIcon = ()=>{
    return(
        <div className="minusIcon">
            <FontAwesomeIcon icon={faMinus} />
        </div>
    )
}
export default MinusIcon
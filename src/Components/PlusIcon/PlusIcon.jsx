import { faPlus } from "@fortawesome/free-solid-svg-icons"
import './plusicon.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const PlusIcon = ()=>{
    return(
        <div className="plusIcon">
            <FontAwesomeIcon icon={faPlus} />
        </div>
    )
}

export default PlusIcon
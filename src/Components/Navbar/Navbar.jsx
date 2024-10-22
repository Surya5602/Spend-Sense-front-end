import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./navbar.css";
import {
  faCalendarDays,
  faChartPie,
  faEllipsisVertical,
  faFileInvoice,
  faGripVertical,
  faTentArrowLeftRight,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Navbar = ({ pageName }) => {
  const [show, setShow] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const menuItems = [
    { name: "Overview", icon: faGripVertical, link: "/overview" },
    { name: "Transactions", icon: faTentArrowLeftRight, link: "/transactions" },
    { name: "Account", icon: faFileInvoice, link: "/account" },
    { name: "Chart", icon: faChartPie, link: "/chart" },
    { name: "Calendar", icon: faCalendarDays, link: "/calendar" },
    { name: "Categories Management", icon: faLayerGroup, link: "/categories" },
  ];
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const removeUserToken = ()=>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div>
      <div className="navbarCom">
        <div className="navbarLeft">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            fill="white"
            viewBox="0 0 24 24"
            onClick={handleShow}
          >
            <path d="M2 11H22V13H2zM2 5H22V7H2zM2 17H22V19H2z"></path>
          </svg>
          <p>{pageName}</p>
        </div>
        <div className="navbarRight">
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            onClick={() => {
              dropDown === true ? setDropDown(false) : setDropDown(true);
            }}
          />
          {dropDown ? (
            <div className="dropDown" onClick={removeUserToken}>
              Sign out
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="imageDiv">
              <img
                src="https://res.cloudinary.com/dqvb4pnky/image/upload/v1723709690/icons8-expense-100_eqdwrz.png"
                alt="appLogo"
              />
            </div>
            <p>Spend Sense</p>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="openCarousel">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`${pageName === item.name ? "active" : ""}`}
              >
                <div className={`icons`}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
export default Navbar;

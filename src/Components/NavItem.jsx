import { NavLink } from "react-router-dom";

const NavItem = (props) => {
    return (
        <li className="nav-item">
            <NavLink
                to={props.href}
                className="nav-link"
                activeClassName="active"
            >
                {props.icon}
                {props.text}
            </NavLink>
        </li>
    );
};

export default NavItem;

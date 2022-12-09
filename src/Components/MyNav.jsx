import { BiChevronLeft, BiChevronRight, BiSearch } from "react-icons/bi";
import User from "../user.png";

const MyNav = () => {
    return (
        <nav>
            <div className="navigation-buttons">
                <a href="#">
                    <BiChevronLeft size="27" />
                </a>
                <a href="#">
                    <BiChevronRight size="27" />
                </a>
            </div>

            <div className="user">
                <div>
                    <img src={User} />
                    John Doe
                </div>
            </div>
        </nav>
    );
};

export default MyNav;

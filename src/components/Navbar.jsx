import { useContext } from "react";
import { LoggedInContext } from "../context/loggedInContext";

const Navbar =() =>{
    const loggedIn = useContext(LoggedInContext);
    return (
        <nav className="navbar">
            <ul>
                <li>Home</li>
                {loggedIn ?
                <li>Logout</li>
                :
                <li>Login</li>
                }
            </ul>
        </nav>
    )
}

export default Navbar;
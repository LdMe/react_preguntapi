import { useContext } from "react";
import { LoggedInContext } from "../../context/loggedInContext";
import "./Navbar.css";
const Navbar =({goHome}) =>{
    const {loggedIn, logOut} = useContext(LoggedInContext);
    function handleClicked(){
        console.log("clicked");
        goHome();
    }
    return (
        <nav className="navbar">
            <ul>
                <li onClick={handleClicked}>Inicio</li>
                {loggedIn ?
                <li onClick={logOut}>Logout</li>
                :
                <li>Login</li>
                }
            </ul>
        </nav>
    )
}

export default Navbar;
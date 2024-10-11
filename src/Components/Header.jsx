import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../Assets/img/argentBankLogo.png";


/*const logChange = document.querySelector(".main-nav-item");*/
/*let user = window.localStorage.getItem("user");*/



/*Modifier page*/

/*if (localStorage.getItem('token')) {
    logChange.innerText = "Sign Out";
    logChange.addEventListener("click", ()=>{
        localStorage.removeItem("token");
        window.location.href = "/";
        logChange.innerText= "Sign In";
    })
}*/

function Header(){
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        }
      }, []);
    
      const handleSignOut = () => {

        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/'); 
      };  
   return(
    <header>
        <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
        <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
        {isLoggedIn ? (
          <button className="main-nav-item" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
            <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
        </Link>
        )}
        </div>
    </nav>
  </header>
   )
}
export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../Assets/img/argentBankLogo.png";


/*const logChange = document.querySelector(".main-nav-item");*/


/*Modifier page*/

/*if (localStorage.getItem('token')) {
    logChange.innerText = "logout";
    logChange.addEventListener("click", ()=>{
        localStorage.removeItem("token");
        window.location.href = "index.html";
    })

}*/

function Header(){

   return(
    <header>
        <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
        <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
            <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
        </Link>
        </div>
    </nav>
  </header>
   )
}
export default Header;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../Assets/img/argentBankLogo.png";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authReducer';
import { useNavigate } from 'react-router-dom';


function Header(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const handleSignOut = () => {
    dispatch(logoutUser());
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
         {token ? (
            <button className="main-nav-item" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i> 
            </button>
        ):(
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
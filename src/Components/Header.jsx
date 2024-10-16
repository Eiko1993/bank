import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../Assets/img/argentBankLogo.png";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authReducer';
import { fetchUserProfile } from '../redux/editReducer';

function Header(){
  const dispatch = useDispatch();
  const { user, loading} = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);
  
  useEffect(() => {
    if(token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  const handleSignOut = () => {
    dispatch(logoutUser()).then(() => {
      window.location.href = '/';
    });
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
          <>
          {!loading && user &&(
            <span className='main-nav-item'>{user.userName}</span>
          )}
            <button className="main-nav-item" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
                Sign Out
            </button>
          </>
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
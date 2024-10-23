import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../Assets/img/argentBankLogo.png";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authReducer';
import { fetchUserProfile } from '../redux/editReducer';

function Header(){
  const dispatch = useDispatch();
  const { user: profileUser, loading: profileLoading } = useSelector((state) => state.profile);
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
            {profileLoading ? (
              <p className='main-nav-item'>Loading...</p>
            ) : (
              profileUser && profileUser.userName ? (
                <p className='main-nav-item'>
                  <i className="fa fa-user-circle"></i> {profileUser.userName}
                </p>
              ) : null
            )}
            <Link to="/sign-in" className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-user-circle"></i>
            Sign Out
        </Link>
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
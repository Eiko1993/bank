import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authReducer';
import {useNavigate } from 'react-router-dom';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ isFormSubmitted, setIsFormSubmitted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { isConnected, error } = useSelector((state) => state.user);
  
    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        }
  
        // Dispatch the loginUser thunk
        dispatch(loginUser(loginData));
        setIsFormSubmitted(true);
    };
    useEffect(() => {
        if (isConnected) {
            navigate('/user');
        }
    }, [isConnected, navigate]);

    return (
      <div className='main bg-dark'>
        <section className="sign-in-content main bg-dark">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}> 
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="sign-in-button" type="submit" disabled={isConnected}>
                {isConnected ? 'Signing In...' : 'Sign In'}                
                </button>
                {error&&(
                    <div className='error-message'>{error}</div>
                )}
            </form>
        </section>
        </div>  
    );
}

export default SignInForm;
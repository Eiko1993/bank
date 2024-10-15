import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authReducer';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
  
    const { loading, error } = useSelector((state) => state.user);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Dispatch the loginUser thunk
      dispatch(loginUser({ email, password })).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          // Redirect to the user page on successful login
          window.location.href = '/user';
        }
      });
    };
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
                <button className="sign-in-button" type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Sign In'}                
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
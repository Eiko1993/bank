import React, { useState } from 'react';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }) 
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); 
                window.location.href = "/user"; 
            } else {
                setErrorMessage('Erreur dans l’identifiant ou le mot de passe'); 
            }
        } catch (error) {
            console.log('Error: ' + error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
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
                {errorMessage && <p className="error-message">{errorMessage}</p>} 
                <button className="sign-in-button" type="submit">Sign In</button>
            </form>
        </section>
    );
}

export default SignInForm;
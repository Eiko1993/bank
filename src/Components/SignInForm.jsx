import React from 'react';
import "../../css/main.css";
const log = document.querySelector("#login");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.querySelector('form #email').value;
  let password = document.querySelector('form #password').value;

const user = fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "email": email,
          "password": password,
      })
  })
  .then(function(response){
      if(response.ok){
          response.json().then(function(data){
              localStorage.setItem('token',data.token);
              window.location.href = "index.html";
          })
      } else {
          console.log('Erreur dans l’identifiant ou le mot de passe');
          errorMessage.textContent = 'Erreur dans l’identifiant ou le mot de passe';
      }
  })
  .catch(error =>
      console.log('error: ' + error)
  );
})


function SignInForm(){
    return(
    <section className="sign-in-content main bg-dark">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label for="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label for="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
    </section>
    )
}

export default SignInForm;
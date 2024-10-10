import React from 'react';

function Banner(img){
    return(
        <section className="hero-content">
          <div>
            <img src={img} alt="bannière ArgentBank"></img>
            </div>
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>

        </section>
    )
}

export default Banner;

import { Link } from "react-router-dom";

function Error(){
    return(
        <div className="main">
        <div className="error">
            <h1>404</h1>
            <h4>Oups! La page que vous demandez n'existe pas.</h4>
            <p><Link to="/">Retourner sur la page d'acceuil</Link></p>
        </div>
        </div>
    )
}

export default Error;
import "../Assets/css/main.css";
import User from "../Components/User";
import NameEdit from "../Components/NameEdit";

function UserPage(){
    return(
        <div>
            <NameEdit />
            <User className="bg-dark" />
        </div>
    )
}

export default UserPage;
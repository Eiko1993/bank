import "../Assets/css/main.css";
import User from "../Components/User";
import NameEdit from "../Components/NameEdit";

function UserPage(){
    return(
        <div className="bg-dark">
            <NameEdit />
            <User />
        </div>
    )
}

export default UserPage;
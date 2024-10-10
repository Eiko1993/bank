import { Provider } from "react-redux";
import "../../css/main.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SignInForm from "../Components/SignInForm";

function SignIn(){
    return(
        <div>
            <Header />
            <SignInForm />
            <Footer />
        </div>
    )
}

export default SignIn;
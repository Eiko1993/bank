//import { Provider } from "react-redux";
import "../Assets/css/main.css";
import Banner from "../Components/Banner";
import Features from "../Components/Features";
import background from "../Assets/img/bank-tree.jpeg";


function Home(){
    return(
        <div>
                <Banner img={background} />
                <Features />
        </div>
    )
}

export default Home;
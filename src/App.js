import './Assets/css/main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SignInForm from './Components/SignInForm';
import UserPage from './Pages/user';
import Error from './Pages/Error';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/*" element={<Error />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

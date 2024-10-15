import './Assets/css/main.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import SignInForm from './Components/SignInForm';
import UserPage from './Pages/user';
import Error from './Pages/Error';
import { Provider } from "react-redux";
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

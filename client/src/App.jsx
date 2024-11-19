import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./connection/Login";
import SignupPage from "./connection/SignUp";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductInfo from "./Products/ProductInfo";


function App() {
  
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/productInfo/:productId" element={<ProductInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

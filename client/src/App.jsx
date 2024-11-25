import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./connection/Login";
import SignupPage from "./connection/SignUp";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductInfo from "./Products/ProductInfo";
import Deconnect from "./connection/deconnect";
import CartInfo from "./Cart/CartInfo";
import DeleteProduct from "./Cart/DeleteProduct";


function App() {
  
  return (
    <BrowserRouter  future={{ 
      v7_startTransition: true, 
      v7_relativeSplatPath: true 
    }}>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Cart" element={<CartInfo />} />
        <Route path="/deconnect" element={<Deconnect />} />
        <Route path="/productInfo/:productId" element={<ProductInfo />} />
        <Route path="/updateCart/:id" element={<DeleteProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

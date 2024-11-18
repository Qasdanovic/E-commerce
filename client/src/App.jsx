import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./connection/Login";
import SignupPage from "./connection/SignUp";


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

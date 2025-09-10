import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";
import { VerifyEmail } from "./pages/VerifyEmail";
import { NotFound } from "./pages/NotFound";
import { NavBar } from "./pages/NavBar";

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027]">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

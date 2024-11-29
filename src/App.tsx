import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Collaborator from "./pages/Collaborator";
import Carrer from "./pages/Carrer";
import Dashboard from "./pages/Dashboard";
import SendMail from "./pages/SendMail";
import Reset from "./pages/Reset";
import Users from "./pages/Users";
import CompleteRegister from "./pages/CompleteRegister";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Register />}></Route>
      <Route path="/collaborator" element={<Collaborator />}></Route>
      <Route path="/carrer" element={<Carrer />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/sendmail" element={<SendMail />}></Route>
      <Route path="/resetpassword" element={<Reset />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/completeregister" element={<CompleteRegister />}></Route>
    </Routes>
  );
}

export default App;

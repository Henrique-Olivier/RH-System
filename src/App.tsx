import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Collaborator from "./components/pages/Collaborator";
import Carrer from "./components/pages/Carrer";
import Dashboard from "./components/pages/Dashboard";
import SendMail from "./components/pages/SendMail";
import Reset from "./components/pages/Reset";
import Users from "./components/pages/Users";

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
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import { Adoption } from "../pages/Adoption/Adoption";
import { Help } from "../pages/Help/Help";
import { Donate } from "../pages/Donate/Donate";
import { Login } from "../pages/Login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/historia" element={<Contact />} />
      <Route path="/adocao" element={<Adoption />} />
      <Route path="/voluntariado" element={<Help />} />
      <Route path="/contato" element={<Contact />} />
      <Route path="/doar" element={<Donate />} />
      <Route path="/admin" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import { Adoption } from "../pages/Adoption/Adoption";
import { Help } from "../pages/Help/help";
import { Donate } from "../pages/Donate/Donate";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historia" element={<Contact />} />
            <Route path="/adocao" element={<Adoption />} />
            <Route path="/ajudar" element={<Help />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/doar" element={<Donate />} />
        </Routes>
    );
};

export default AppRoutes;

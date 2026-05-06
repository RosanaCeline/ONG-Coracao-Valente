import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contato" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

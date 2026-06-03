import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components/layout/NavbarComponent/NavbarComponent";
import FooterComponent from "./components/layout/FooterComponent/FooterComponent";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Navbar } from './components/layout/NavbarComponent/NavbarComponent';
import FooterComponent from './components/layout/FooterComponent/FooterComponent';
import { RatingPopup } from './components/RatingPopup/RatingPopup';

const AppShell = () => {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/admin/painel');

  return (
    <>
      {!isAdminPanel && <Navbar />}
      <AppRoutes />
      {!isAdminPanel && <FooterComponent />}
      <RatingPopup />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;

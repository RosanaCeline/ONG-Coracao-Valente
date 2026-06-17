import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Adoption from '../pages/Adoption/Adoption';
import Help from '../pages/Help/Help';
import Donate from '../pages/Donate/Donate';
import { Login } from '../pages/Login/Login';
import History from '../pages/History/History';

import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../pages/Admin/AdminLayout/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import Animals from '../pages/Admin/Animals/Animals';
import Financial from '../pages/Admin/Financial/Financial';
import OngInfo from '../pages/Admin/OngInfo/OngInfo';
import CalendarPage from '../pages/Admin/Calendar/CalendarPage';
import Documents from '../pages/Admin/Documents/Documents';

const AppRoutes = () => (
  <Routes>
    <Route path="/"             element={<Home />} />
    <Route path="/historia"     element={<History />} />
    <Route path="/adocao"       element={<Adoption />} />
    <Route path="/voluntariado" element={<Help />} />
    <Route path="/doar"         element={<Donate />} />
    <Route path="/admin"        element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/admin/painel" element={<AdminLayout />}>
        <Route index              element={<Dashboard />} />
        <Route path="animais"     element={<Animals />} />
        <Route path="financeiro"  element={<Financial />} />
        <Route path="ong"         element={<OngInfo />} />
        <Route path="calendario"  element={<CalendarPage />} />
        <Route path="documentos"  element={<Documents />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;

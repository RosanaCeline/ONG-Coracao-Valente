import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Cat, Wallet, Building2, Package, CalendarDays, FolderOpen, LogOut } from 'lucide-react';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import navStyles from '../../../components/layout/NavbarComponent/NavbarComponent.module.css';
import styles from './AdminLayout.module.css';

const NAV_LINKS = [
  { to: '/admin/painel',             end: true,  icon: LayoutDashboard, label: 'PAINEL' },
  { to: '/admin/painel/animais',     end: false, icon: Cat,             label: 'ANIMAIS' },
  { to: '/admin/painel/financeiro',  end: false, icon: Wallet,          label: 'FINANCEIRO' },
  { to: '/admin/painel/estoque',     end: false, icon: Package,         label: 'ESTOQUE' },
  { to: '/admin/painel/calendario',  end: false, icon: CalendarDays,    label: 'CALENDÁRIO' },
  { to: '/admin/painel/documentos',  end: false, icon: FolderOpen,      label: 'DOCUMENTOS' },
  { to: '/admin/painel/ong',         end: false, icon: Building2,       label: 'ONG' },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className={styles.layout}>
      <header className={navStyles.header}>
        <nav className={navStyles.navbar}>
          {NAV_LINKS.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive
                  ? `${navStyles['nav-item']} ${navStyles.active}`
                  : navStyles['nav-item']
              }
            >
              <Icon />
              <span className={navStyles.label}>{label}</span>
            </NavLink>
          ))}

          <ButtonComponent
            icon={LogOut}
            variant="red"
            onClick={handleLogout}
            className={navStyles.donateBtn}
          >
            SAIR
          </ButtonComponent>
        </nav>
      </header>

      <div className={navStyles.headerSpacer} aria-hidden="true" />

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  House,
  BookOpen,
  Heart,
  Users,
  HandHeart,
} from "lucide-react";
import ButtonComponent from "../../btn/ButtonComponent/ButtonComponent";
import styles from "./NavbarComponent.module.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDonateActive = location.pathname === "/doar";

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-item"]} ${styles.active}`
                : styles["nav-item"]
            }
          >
            <House />
            <span className={styles.label}>INÍCIO</span>
          </NavLink>

          <NavLink
            to="/historia"
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-item"]} ${styles.active}`
                : styles["nav-item"]
            }
          >
            <BookOpen />
            <span className={styles.label}>HISTÓRIA</span>
          </NavLink>

          <NavLink
            to="/adocao"
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-item"]} ${styles.active}`
                : styles["nav-item"]
            }
          >
            <Heart />
            <span className={styles.label}>ADOÇÃO</span>
          </NavLink>

          <NavLink
            to="/voluntariado"
            className={({ isActive }) =>
              isActive
                ? `${styles["nav-item"]} ${styles.active}`
                : styles["nav-item"]
            }
          >
            <Users />
            <span className={styles.label}>VOLUNTARIAR</span>
          </NavLink>

          <ButtonComponent
            icon={HandHeart}
            variant="red"
            onClick={() => navigate("/doar")}
            className={isDonateActive ? styles.donateActive : styles.donateBtn}
          >
            DOAR
          </ButtonComponent>
        </nav>
      </header>

      <div className={styles.headerSpacer} aria-hidden="true" />
    </>
  );
};

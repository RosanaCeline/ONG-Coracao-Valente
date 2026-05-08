import { NavLink } from "react-router-dom";

import { House, BookOpen, Heart, Users, Headset, HandHeart} from "lucide-react";

import styles from "./NavbarComponent.module.css";

export const Navbar = () => {
  return (
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
        to="/ajudar"
        className={({ isActive }) =>
          isActive
            ? `${styles["nav-item"]} ${styles.active}`
            : styles["nav-item"]
        }
      >
        <Users />
        <span className={styles.label} >AJUDAR</span>
      </NavLink>

      <NavLink
        to="/contato"
        className={({ isActive }) =>
          isActive
            ? `${styles["nav-item"]} ${styles.active}`
            : styles["nav-item"]
        }
      >
        <Headset />
        <span className={styles.label}>CONTATO</span>
      </NavLink>

      <NavLink
        to="/doar"
        className={({ isActive }) =>
          isActive
            ? `${styles["donate-btn"]} ${styles.activeDonate}`
            : styles["donate-btn"]
        }
      >
        <HandHeart size={18} />
        <span className={styles["donate-label"]}>DOAR</span>
      </NavLink>
    </nav>
  );
};
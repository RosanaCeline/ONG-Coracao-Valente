import styles from "./Login.module.css";
import logo from "../../assets/full-logo.png";
import { useEffect } from "react";

export function Login(){
    useEffect(() => {
        document.title = "Acesso Restrito | ONG Coração Valente";
    }, []);

    return(
        <div className={styles.container}>
            <section>
                <img src={logo} alt="Logo da ONG Coração Valente" className={styles.logo} />
            </section>
            <section>
                <h2 className={styles.title}>Login para Acesso Restrito</h2>
                <form className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className={styles.formInput} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" className={styles.formInput} />
                    </div>
                    <button type="submit" className={styles.loginButton}>
                        Entrar
                    </button>
                </form>
            </section>
        </div>
    )
}
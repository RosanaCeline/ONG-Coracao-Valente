import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/full-logo.png';
import ButtonComponent from '../../components/btn/ButtonComponent/ButtonComponent';

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Acesso Restrito | ONG Coração Valente';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/painel');
  };

  return (
    <div className={styles.container}>
      <section>
        <img src={logo} alt="Logo da ONG Coração Valente" className={styles.logo} />
      </section>
      <section>
        <h2 className={styles.title}>Login para Acesso Restrito</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className={styles.formInput} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" className={styles.formInput} />
          </div>
          <ButtonComponent style={{ width: '100%', marginTop: '10px' }}>
            Entrar
          </ButtonComponent>
        </form>
      </section>
    </div>
  );
}

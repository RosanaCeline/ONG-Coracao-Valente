import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/full-logo.png';
import ButtonComponent from '../../components/btn/ButtonComponent/ButtonComponent';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    document.title = 'Acesso Restrito | ONG Coração Valente';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError('Email ou senha incorretos.');
        return;
      }
      const { token } = await res.json();
      localStorage.setItem('token', token);
      navigate('/admin/painel');
    } catch {
      setError('Erro ao conectar ao servidor. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
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
            <input
              type="email"
              id="email"
              className={styles.formInput}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p style={{ color: '#c90008', fontSize: '0.85rem', margin: '0' }}>{error}</p>
          )}
          <ButtonComponent style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </ButtonComponent>
        </form>
      </section>
    </div>
  );
}

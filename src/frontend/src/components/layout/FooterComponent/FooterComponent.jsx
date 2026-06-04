import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import { INSTAGRAM_URL } from '../../../services/instagram';
import styles from './FooterComponent.module.css';

const FooterComponent = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoCircle}>
            <img src={logo} alt="Logo ONG Coração Valente" className={styles.logoImg} />
          </div>

          <div className={styles.brandInfo}>
            <span className={styles.brandName}>ONG Coração Valente</span>

            <address className={styles.address}>
              Av. Manoel da Custódia, nº 1.111 / 1.119, Bairro São Geraldo
            </address>

            <div className={styles.socials}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram da ONG Coração Valente"
              >
                <FaInstagram size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="WhatsApp">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <p className={styles.rights}>
          Todos os direitos reservados a ONG Coração Valente. Feito com carinho.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;

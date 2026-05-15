import { MapPin } from 'lucide-react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import fullLogo from '../../../assets/full-logo.png';
import styles from './FooterComponent.module.css';

const FooterComponent = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <img src={fullLogo} alt="ONG Coração Valente" className={styles.logo} />

        <div className={styles.address}>
          <MapPin size={14} />
          <span>R. 110 S/N, Serra da Bitapaba, Trindade — Goiás</span>
        </div>

        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/ong.coracaovalente/"
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
    </footer>
  );
};

export default FooterComponent;

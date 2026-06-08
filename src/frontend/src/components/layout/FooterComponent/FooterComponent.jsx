import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import { ONG_INFO } from '../../../services/ong';
import styles from './FooterComponent.module.css';

const FooterComponent = () => {
  const { name, address, socials } = ONG_INFO;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoCircle}>
            <img src={logo} alt={`Logo ${name}`} className={styles.logoImg} />
          </div>

          <div className={styles.brandInfo}>
            <span className={styles.brandName}>{name}</span>

            <address className={styles.address}>{address}</address>

            <div className={styles.socials}>
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Instagram da ${name}`}
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
              )}
              {socials.whatsapp && (
                <a
                  href={socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <p className={styles.rights}>
          Todos os direitos reservados a {name}. Feito com carinho.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;

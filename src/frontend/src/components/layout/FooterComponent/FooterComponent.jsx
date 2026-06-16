import { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import { ONG_INFO, getOngInfo } from '../../../services/ong';
import styles from './FooterComponent.module.css';

const buildSocials = (info) => ({
  instagram: info.instagramUrl ?? null,
  facebook:  null,
  whatsapp:  info.whatsappNumber ? `https://wa.me/${info.whatsappNumber}` : null,
});

const buildAddress = (info) =>
  [info.address, info.number, info.neighborhood, info.city && info.state ? `${info.city}/${info.state}` : (info.city ?? info.state)]
    .filter(Boolean)
    .join(', ');

const FooterComponent = () => {
  const [name,    setName]    = useState(ONG_INFO.name);
  const [address, setAddress] = useState(buildAddress(ONG_INFO));
  const [socials, setSocials] = useState(ONG_INFO.socials);

  useEffect(() => {
    getOngInfo()
      .then(info => {
        if (info.name)    setName(info.name);
        setAddress(buildAddress(info));
        setSocials(buildSocials(info));
      })
      .catch(() => {});
  }, []);

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

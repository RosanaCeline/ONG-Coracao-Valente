import { useState, useRef } from 'react';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
const PARTNER_WHATSAPP_URL = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent('Olá! Vim pelo site da ONG Coração Valente e gostaria de apoiar e ser parceiro da ONG. 🐾')}&type=phone_number&app_absent=0`;
import Title from '../../../components/ui/Title/Title';
import useInView from '../../../hooks/useInView';
import prefeituraImg from '../../../assets/landingpage/parceiros/pref-tiangua.jpg';
import ryoImg from '../../../assets/landingpage/parceiros/ryo-clinica.jpeg';
import cuidaVetImg from '../../../assets/landingpage/parceiros/cuida-vet-ubajara.jpeg';
import styles from './PartnersSection.module.css';

const PARTNERS = [
  {
    id: 1,
    name: 'Prefeitura de Tianguá',
    city: 'Tianguá - CE',
    img: prefeituraImg,
    color: '#2D5F8A',
  },
  {
    id: 2,
    name: 'Clínica Ryo',
    city: 'Tianguá - CE',
    img: ryoImg,
    color: '#3A7D54',
  },
  {
    id: 3,
    name: 'Clínica Cuida Vet',
    city: 'Ubajara - CE',
    img: cuidaVetImg,
    color: '#E07E2A',
  },
];

function getInitials(name) {
  return name
    .split(' ')
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

function PartnerCard({ partner }) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !partner.img || imgError;

  return (
    <div className={styles.partnerCard}>
      <div className={styles.partnerMedia}>
        {!showFallback ? (
          <img
            src={partner.img}
            alt={partner.name}
            className={styles.partnerImg}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={styles.partnerFallback}
            style={{ '--partner-color': partner.color }}
          >
            <span className={styles.partnerInitial}>
              {getInitials(partner.name)}
            </span>
          </div>
        )}
      </div>
      <div className={styles.partnerInfo}>
        <strong className={styles.partnerName}>{partner.name}</strong>
        <span className={styles.partnerCity}>{partner.city}</span>
      </div>
    </div>
  );
}

const PartnersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);

  return (
    <section className={styles.section} ref={ref}>
      <div className={`${styles.inner} ${inView ? styles.visible : ''}`}>
        <span className={styles.label}>PARCEIROS</span>

        <Title as="h2" className={styles.heading}>
          Empresas que escolheram fazer parte disso.
        </Title>

        <p className={styles.description}>
          Nossos parceiros acreditam que cuidar dos animais é também cuidar da
          comunidade.{' '}
          <strong>Se a sua empresa pensa assim, queremos conversar.</strong>
        </p>

        <div className={styles.logos}>
          {PARTNERS.map(partner => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>

        <ButtonComponent variant="white" onClick={() => window.open(PARTNER_WHATSAPP_URL, '_blank', 'noopener,noreferrer')}>
          Quero ser parceiro
        </ButtonComponent>
      </div>
    </section>
  );
};

export default PartnersSection;

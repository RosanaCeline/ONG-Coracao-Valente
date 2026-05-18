import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import Title from '../../../components/ui/Title/Title';
import useInView from '../../../hooks/useInView';
import styles from './PartnersSection.module.css';

const partners = [
  { id: 1, name: 'Natura', color: '#E07E2A' },
  { id: 2, name: 'HASTEM', color: '#2D4E6A' },
  { id: 3, name: 'GreenLife', color: '#3A7D54' },
];

const PartnersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);
  const navigate = useNavigate();

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
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={styles.logo}
              style={{ '--partner-color': partner.color }}
            >
              <span className={styles.logoName}>{partner.name}</span>
            </div>
          ))}
        </div>

        <ButtonComponent variant="white" onClick={() => navigate('/contato')}>
          Quero ser parceiro
        </ButtonComponent>
      </div>
    </section>
  );
};

export default PartnersSection;

import { useRef } from 'react';
import { FaInstagram } from 'react-icons/fa';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import Title from '../../../components/ui/Title/Title';
import useInView from '../../../hooks/useInView';
import { INSTAGRAM_URL, LIGHT_WIDGET_URL } from '../../../services/instagram';
import styles from './InstagramSection.module.css';

const InstagramSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.15);

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={sectionRef}
    >
      <div className={styles.textContent}>
        <span className={styles.label}>ACOMPANHE-NOS</span>
        <Title as="h2">O que está acontecendo por aqui?</Title>
        <p className={styles.description}>
          Novidades, resgates, histórias de adoção e muito mais — diretamente do
          nosso Instagram.
        </p>
      </div>

      {LIGHT_WIDGET_URL ? (
        <div className={styles.widgetWrapper}>
          <iframe
            src={LIGHT_WIDGET_URL}
            scrolling="no"
            allowTransparency="true"
            className={styles.widget}
            style={{ border: 0, overflow: 'hidden' }}
            title="Posts do Instagram"
          />
        </div>
      ) : (
        <div className={styles.widgetPlaceholder}>
          <FaInstagram size={32} />
          <p>Configure o<code>código</code>para exibir o feed.</p>
        </div>
      )}

      <div className={styles.cta}>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <ButtonComponent variant="outline" icon={FaInstagram}>
            Seguir no Instagram
          </ButtonComponent>
        </a>
      </div>
    </section>
  );
};

export default InstagramSection;

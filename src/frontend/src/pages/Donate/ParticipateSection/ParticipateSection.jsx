import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import Title from '../../../components/ui/Title/Title';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import styles from './ParticipateSection.module.css';

const ParticipateSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <section ref={ref} className={styles.mission}>
      <div className={styles.inner}>
        <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
          <Title as="h2" className={styles.heading}>
            Sua doação pode salvar uma vida. Contribua com essa causa!
          </Title>
          <ButtonComponent variant="white" onClick={scrollToTop}>
            Quero contribuir
          </ButtonComponent>
        </div>
      </div>
    </section>
  );
};

export default ParticipateSection;

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import Title from '../../../components/ui/Title/Title';
import useInView from '../../../hooks/useInView';
import dogsImg from '../../../assets/landingpage/HOME_cachorros_unidos.png';
import styles from './MissionSection.module.css';

const MissionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);
  const navigate = useNavigate();

  return (
    <section className={styles.mission} ref={ref}>
      <div className={styles.inner}>
        <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
          <span className={styles.label}>NOSSA MISSÃO</span>

          <Title as="h2" className={styles.heading}>
            Dar voz a quem não pode falar.
          </Title>

          <p className={styles.description}>
            Acreditamos que todo animal <strong>merece ser visto</strong>,{' '}
            <strong>cuidado e amado</strong>. Nossa missão é transformar animais
            vulneráveis em <strong>recomendados</strong>, com resgate, tratamento
            e <strong>adoção responsável</strong>.
          </p>

          <div className={styles.actions}>
            <ButtonComponent variant="white" onClick={() => navigate('/adocao')}>
              Conhecer os animais
            </ButtonComponent>
            <ButtonComponent variant="outline" onClick={() => navigate('/ajudar')}>
              Seja voluntário
            </ButtonComponent>
          </div>
        </div>

        <div className={`${styles.imageWrapper} ${inView ? styles.imageVisible : ''}`}>
          <img
            src={dogsImg}
            alt="Cachorros unidos na ONG Coração Valente"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

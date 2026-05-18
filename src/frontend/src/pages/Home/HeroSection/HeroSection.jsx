import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import Title from '../../../components/ui/Title/Title';
import heroDog from '../../../assets/landingpage/HOME_cachorro_hero.png';
import ballImg from '../../../assets/landingpage/HOME_bola_cachorro.png';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <MapPin size={14} />
          <span>Coração Valente • Tianguá • Ceará</span>
        </div>

        <Title as="h1">
          Toda vida merece uma segunda <em>chance.</em>
        </Title>

        <p className={styles.description}>
          Na Serra da Bitapaba, a ONG Coração Valente é o primeiro passo para um novo começo.
          Atuamos como um lar transitório, acolhendo animais vulneráveis{' '}
          <strong>temporariamente</strong>, cuidando com <strong>dedicação</strong> e
          conectamos cada um deles a um lar <strong>cheio de amor</strong>.
        </p>

        <div className={styles.actions}>
          <ButtonComponent onClick={() => navigate('/adocao')}>
            Conhecer os animais
          </ButtonComponent>
          <ButtonComponent variant="outline" onClick={() => navigate('/ajudar')}>
            Como atuamos
          </ButtonComponent>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={heroDog}
          alt="Cachorro feliz da ONG Coração Valente"
          className={styles.dogImage}
        />
        <img
          src={ballImg}
          alt=""
          aria-hidden="true"
          className={styles.ball}
        />
      </div>
    </section>
  );
};

export default HeroSection;

import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import Title from '../../../components/ui/Title/Title';
import { ONG_INFO } from '../../../services/ong';
import heroDog from '../../../assets/landingpage/HOME_cachorro_hero.png';
import ballImg from '../../../assets/landingpage/HOME_bola_cachorro.png';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const { name, city, state } = ONG_INFO;

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <MapPin size={14} />
          <span>{name} • {city} • {state}</span>
        </div>

        <Title as="h1">
          Toda vida merece uma segunda <em>chance.</em>
        </Title>

        <p className={styles.description}>
          Na Serra da Ibiapaba, a ONG Coração Valente é o primeiro passo para um novo começo.
          Atuamos como um lar transitório, acolhendo animais vulneráveis{' '}
          <strong>temporariamente</strong>, cuidando com <strong>dedicação</strong> e
          conectamos cada um deles a um lar <strong>cheio de amor</strong>.
        </p>

        <div className={styles.actions}>
          <ButtonComponent onClick={() => navigate('/adocao')}>
            Conhecer os animais
          </ButtonComponent>
          <ButtonComponent variant="outline" onClick={() => navigate('/historia')}>
            Como atuamos
          </ButtonComponent>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={heroDog}
          alt={`Cachorro feliz da ${name}`}
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

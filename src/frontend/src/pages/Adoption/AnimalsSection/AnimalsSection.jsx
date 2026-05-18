import { useRef, useState, useEffect } from 'react';
import { FaInstagram } from 'react-icons/fa';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import Title from '../../../components/ui/Title/Title';
import AnimalCard from '../AnimalCard/AnimalCard';
import useInView from '../../../hooks/useInView';

import dogHero from '../../../assets/landingpage/HOME_cachorro_hero.png';
import dogBall from '../../../assets/landingpage/HOME_bola_cachorro.png';
import dogsTogether from '../../../assets/landingpage/HOME_cachorros_unidos.png';

import { INSTAGRAM_URL } from '../../../services/instagram';
import styles from './AnimalsSection.module.css';

const mockAnimals = [
  {
    id: 1,
    name: 'Luna',
    age: '5 meses',
    photo: dogHero,
    tags: ['Cão', 'Fêmea', 'Dócil', 'Carinhosa'],
  },
  {
    id: 2,
    name: 'Thor',
    age: '8 meses',
    photo: dogBall,
    tags: ['Cão', 'Macho', 'Brincalhão', 'Ativo'],
  },
  {
    id: 3,
    name: 'Mel',
    age: '2 anos',
    photo: dogsTogether,
    tags: ['Cão', 'Fêmea', 'Tranquila', 'Vacinada'],
  },
];

const AnimalsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimals(mockAnimals);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={ref}
    >
      <span className={styles.label}>ADOTE</span>

      <Title as="h1">
        Eles estão{' '}
        <em>esperando por você.</em>
      </Title>

      <p className={styles.description}>
        Cada um tem um nome, uma história e um lugar no mundo que ainda não
        encontrou. Talvez seja na sua casa.
      </p>

      {loading ? (
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {animals.map((animal) => (
            <AnimalCard key={animal.id} {...animal} />
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Não encontrou o animal certo agora? A lista é atualizada sempre que um
          novo resgate chega. Acompanhe nossas redes ou volte em breve —{' '}
          <strong>seu companheiro pode estar a caminho.</strong>
        </p>

        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <ButtonComponent icon={FaInstagram}>
            Seguir a ONG no Instagram
          </ButtonComponent>
        </a>
      </div>
    </section>
  );
};

export default AnimalsSection;

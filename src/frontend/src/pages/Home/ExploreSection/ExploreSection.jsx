import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  BookOpen,
  HandCoins,
  PawPrint,
  HandHelping,
  MessageCircleQuestion,
} from 'lucide-react';
import ExploreCard from './ExploreCard/ExploreCard';
import Title from '../../../components/ui/Title/Title';
import useInView from '../../../hooks/useInView';
import styles from './ExploreSection.module.css';

const CARD_WIDTH = 500;
const GAP = 15;

const cards = [
  {
    id: 1,
    title: 'Conheça a história por trás do Coração Valente.',
    buttonLabel: 'Ver história',
    to: '/historia',
    icon: BookOpen,
  },
  {
    id: 2,
    title: 'Doe qualquer valor.',
    buttonLabel: 'Doar',
    to: '/doar',
    icon: HandCoins,
  },
  {
    id: 3,
    title: 'Tem um animal aqui que combina com você.',
    buttonLabel: 'Ver animais',
    to: '/adocao',
    icon: PawPrint,
  },
  {
    id: 4,
    title: 'Veja como se voluntariar.',
    buttonLabel: 'Ser voluntário',
    to: '/ajudar',
    icon: HandHelping,
  },
  {
    id: 5,
    title: 'Tem alguma dúvida? A gente responde.',
    buttonLabel: 'Falar com a ONG',
    to: '/contato',
    icon: MessageCircleQuestion,
  },
];

const ExploreSection = () => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.15);

  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({
        left: dir * (CARD_WIDTH + GAP),
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={sectionRef}
    >
      <span className={styles.label}>EXPLORE MAIS SOBRE A ONG</span>

      <Title as="h2">
        <em>Saiba</em> mais:
      </Title>

      <p className={styles.subtitle}>
        Ajude, adote, compartilhe amor, veja como:
      </p>

      <div className={styles.carousel}>
        <button
          className={styles.arrow}
          onClick={() => scroll(-1)}
          aria-label="Rolar para o anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.track} ref={trackRef}>
          {cards.map((card) => (
            <div key={card.id} className={styles.cardWrapper}>
              <ExploreCard
                title={card.title}
                buttonLabel={card.buttonLabel}
                to={card.to}
                icon={card.icon}
              />
            </div>
          ))}
        </div>

        <button
          className={styles.arrow}
          onClick={() => scroll(1)}
          aria-label="Rolar para o próximo"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default ExploreSection;

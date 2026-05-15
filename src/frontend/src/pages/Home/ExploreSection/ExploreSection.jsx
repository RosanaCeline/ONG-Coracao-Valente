import { useRef } from 'react';
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
  const ref = useRef(null);
  const inView = useInView(ref, 0.15);

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={ref}
    >
      <span className={styles.label}>EXPLORE MAIS SOBRE A ONG</span>

      <Title as="h2">
        <em>Saiba</em> mais:
      </Title>

      {/* Mobile: scroll horizontal com snap | Desktop: grid */}
      <div className={styles.cardsTrack}>
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
    </section>
  );
};

export default ExploreSection;

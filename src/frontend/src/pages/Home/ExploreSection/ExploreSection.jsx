import { useRef, useState } from 'react';
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
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, 0.15);

  const prev = () => setCurrent((c) => (c === 0 ? cards.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === cards.length - 1 ? 0 : c + 1));

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={ref}
    >
      <span className={styles.label}>EXPLORE MAIS SOBRE A ONG</span>

      <Title as="h2">
        <em>Saiba</em> mais:
      </Title>

      <div className={styles.carousel}>
        <button
          className={styles.arrow}
          onClick={prev}
          aria-label="Card anterior"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Janela do carrossel — clips o conteúdo */}
        <div className={styles.window}>
          <div
            className={styles.track}
            style={{ transform: `translateX(calc(-${current * 100}%))` }}
          >
            {cards.map((card) => (
              <div key={card.id} className={styles.slide}>
                <ExploreCard
                  title={card.title}
                  buttonLabel={card.buttonLabel}
                  to={card.to}
                  icon={card.icon}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles.arrow}
          onClick={next}
          aria-label="Próximo card"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots de navegação */}
      <div className={styles.dots} role="tablist">
        {cards.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Card ${i + 1} de ${cards.length}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreSection;

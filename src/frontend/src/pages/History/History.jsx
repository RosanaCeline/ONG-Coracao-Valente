import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './History.module.css';
import ButtonComponent from '../../components/btn/ButtonComponent/ButtonComponent';

const CARDS = [
  {
    src: '/acoes/castracao.jpeg',
    alt: 'Mutirão de castração',
    title: 'Castração de animais',
    sub: 'Mutirão de vacinação e cuidados veterinários',
    emoji: '🐾',
  },
  {
    src: '/acoes/cachorranegonaedit.png',
    alt: 'Cachorro para adoção',
    title: 'Divulgação de animais',
    sub: 'Animais disponíveis para adoção responsável',
    emoji: '🐶',
  },
  {
    src: '/acoes/escolaedit.png',
    alt: 'Ação nas escolas',
    title: 'Educação ambiental',
    sub: 'Ações educativas levadas às escolas da região',
    emoji: '🏫',
  },
  {
    src: null,
    alt: 'Feira de adoção',
    title: 'Feiras de adoção',
    sub: 'Encontrando lares para animais resgatados',
    emoji: '❤️',
  },
  {
    src: '/acoes/animalresgatado.png',
    alt: 'Resgate de animais',
    title: 'Resgate e reabilitação',
    sub: 'Atendimento a animais em situação de risco',
    emoji: '🐕',
  },
];

const TOTAL = CARDS.length;

function CarouselCard({ card }) {
  const [imgError, setImgError] = useState(!card.src);
  return (
    <div className={styles.cardSlide}>
      <div className={styles.card}>
        {!imgError && card.src ? (
          <img src={card.src} alt={card.alt} onError={() => setImgError(true)} />
        ) : (
          <div className={styles.cardPlaceholder}>
            <span className={styles.placeholderEmoji}>{card.emoji}</span>
            <span className={styles.placeholderLabel}>{card.alt}</span>
          </div>
        )}
        <div className={styles.cardLabel}>
          <strong>{card.title}</strong>
          <span>{card.sub}</span>
        </div>
      </div>
    </div>
  );
}

function Carousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const goTo = (idx) => setCurrent((idx + TOTAL) % TOTAL);

  return (
    <div>
      <div className={styles.carouselWrapper}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(${-current * (100 / TOTAL)}%)` }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
          }}
        >
          {CARDS.map((card, i) => <CarouselCard key={i} card={card} />)}
        </div>
      </div>

      <div className={styles.carouselControls}>
        <button className={styles.arrowBtn} onClick={() => goTo(current - 1)} aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.dots}>
          {CARDS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot}${i === current ? ` ${styles.dotActive}` : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button className={styles.arrowBtn} onClick={() => goTo(current + 1)} aria-label="Próximo">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const History = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'História | ONG Coração Valente';
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.quemSomos}>
        <p className={styles.chapeu}>Quem Somos</p>
        <h1>
          De uma <em>ideia</em>, uma revolução de <em>amor.</em>
        </h1>
        <div className={styles.paragrafos}>
          <p>Em 21 de setembro de 2018, em Tianguá, um grupo de pessoas decidiu não indignar-se não apenas pelo sofrimento — mas precisou agir. Assim nasceu a ONG Coração Valente.</p>
          <p>Desde então, resgatamos, tratamos e encaminhamos centenas de animais que chegaram até nós machucados, assustados ou simplesmente esquecidos. Não somos um abrigo permanente: somos a ponte entre o abandono e um novo lar.</p>
          <p>Cada castração realizada, cada feira de adoção organizada e cada ação educativa levada às escolas é um passo em direção a uma Serra da Ibiapaba mais consciente e mais justa com os animais.</p>
          <p>Tudo isso só é possível graças a você — voluntários, doadores e parceiros que acreditam que o cuidado com os animais diz muito sobre quem somos como comunidade.</p>
        </div>
      </section>

      <section className={styles.acoes}>
        <h2>
          Nossas principais <em>ações</em>
        </h2>
        <Carousel />
      </section>

      <section className={styles.cta}>
        <ButtonComponent onClick={() => navigate('/voluntariado')}>
          Quero ser voluntário
        </ButtonComponent>
      </section>
    </main>
  );
};

export default History;

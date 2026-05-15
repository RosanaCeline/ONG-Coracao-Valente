import { useRef, useState, useEffect } from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import Title from '../../../components/ui/Title/Title';
import useInView from '../../../hooks/useInView';
import styles from './InstagramSection.module.css';

const INSTAGRAM_URL = 'https://www.instagram.com/ong.coracaovalente/';

const mockPosts = [
  {
    id: '1',
    bg: '#D4E6EF',
    emoji: '🐶',
    caption: 'Mais um resgate realizado com sucesso! Bem-vindo à família, pequenininho.',
    likes: 47,
  },
  {
    id: '2',
    bg: '#EFE0D4',
    emoji: '🐕',
    caption: 'Pronto para adoção! Olha esse sorriso que derrete o coração.',
    likes: 63,
  },
  {
    id: '3',
    bg: '#D4EFDF',
    emoji: '🐾',
    caption: 'Obrigada a cada voluntário que faz tudo isso possível! ❤️',
    likes: 39,
  },
];

const InstagramPost = ({ post }) => (
  <a
    href={INSTAGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={styles.post}
    style={{ backgroundColor: post.bg }}
    aria-label={post.caption}
  >
    <span className={styles.postEmoji} aria-hidden="true">{post.emoji}</span>

    <div className={styles.postOverlay}>
      <p className={styles.postCaption}>{post.caption}</p>
      <span className={styles.postLikes}>
        <Heart size={13} />
        {post.likes}
      </span>
    </div>
  </a>
);

const InstagramSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, 0.15);

  useEffect(() => {
    // Quando o backend estiver pronto, substituir por:
    // fetch('/api/instagram/posts').then(r => r.json()).then(setPosts).catch(...)
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={ref}
    >
      <span className={styles.label}>ACOMPANHE-NOS</span>

      <Title as="h2">
        O que está acontecendo por aqui?
      </Title>

      <p className={styles.description}>
        Novidades, resgates, histórias de adoção e muito mais. Fique por dentro
        da nossa rotina.
      </p>

      {loading ? (
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <InstagramPost key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className={styles.cta}>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <ButtonComponent variant="outline" icon={ExternalLink}>
            Ver mais
          </ButtonComponent>
        </a>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.handle}
        >
          <FaInstagram size={16} />
          @ong.coracaovalente
        </a>
      </div>
    </section>
  );
};

export default InstagramSection;

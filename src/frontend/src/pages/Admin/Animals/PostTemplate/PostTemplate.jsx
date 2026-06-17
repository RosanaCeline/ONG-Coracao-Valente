import styles from './PostTemplate.module.css';
import logo from '../../../../assets/logo.png';

const RACE_LABELS = { DOG: 'Cão', CAT: 'Gato' };
const GENDER_LABELS = { MALE: 'Macho', FEMALE: 'Fêmea' };

// 1080×1080 — fixed-size branded layout, captured offscreen via html2canvas.
const PostTemplate = ({ animal, instagramHandle, pixKey }) => {
  const raceLabel   = RACE_LABELS[animal.race] ?? animal.race;
  const genderLabel = GENDER_LABELS[animal.gender] ?? animal.gender;

  return (
    <div className={styles.canvas}>
      <div className={styles.header}>
        <img src={logo} alt="" className={styles.logo} crossOrigin="anonymous" />
        <span className={styles.wordmark}>ONG Coração Valente</span>
      </div>

      <div className={styles.photoWrap}>
        <img src={animal.photoUrl} alt={animal.name} className={styles.photo} crossOrigin="anonymous" />
        <span className={styles.statusRibbon}>
          {animal.isAdopted ? 'Adotado' : 'Disponível para adoção'}
        </span>
      </div>

      <div className={styles.info}>
        <h1 className={styles.name}>{animal.name}</h1>
        <div className={styles.chips}>
          <span className={styles.chip}>{raceLabel}</span>
          <span className={styles.chip}>{genderLabel}</span>
          <span className={styles.chip}>{animal.age}</span>
          {animal.tags?.map(tag => (
            <span key={tag.id} className={styles.chip}>{tag.name}</span>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        {instagramHandle && <span className={styles.footerLine}>📷 {instagramHandle}</span>}
        {pixKey && <span className={styles.footerLine}>💚 PIX para ajudar: {pixKey}</span>}
      </div>
    </div>
  );
};

export default PostTemplate;

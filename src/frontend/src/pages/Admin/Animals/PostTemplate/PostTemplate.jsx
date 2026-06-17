import styles from './PostTemplate.module.css';
import logo from '../../../../assets/logo.png';

const RACE_LABELS = { DOG: 'Cão', CAT: 'Gato' };
const GENDER_LABELS = { MALE: 'Macho', FEMALE: 'Fêmea' };
const STATUS_COLORS = { available: '#9EB89C', adopted: '#7AACBF' };

// 1080×1350 (4:5) — full-bleed photo with a gradient overlay, captured offscreen via html2canvas.
const PostTemplate = ({ animal, instagramHandle, pixKey }) => {
  const raceLabel   = RACE_LABELS[animal.race] ?? animal.race;
  const genderLabel = GENDER_LABELS[animal.gender] ?? animal.gender;
  const statusKey   = animal.isAdopted ? 'adopted' : 'available';

  return (
    <div className={styles.canvas}>
      <img src={animal.photoUrl} alt="" className={styles.photo} crossOrigin="anonymous" />
      <div className={styles.gradient} />

      <div className={styles.topRow}>
        <div className={styles.logoBadge}>
          <img src={logo} alt="" className={styles.logoImg} crossOrigin="anonymous" />
          <span className={styles.logoText}>Coração Valente</span>
        </div>
        <span className={styles.statusBadge} style={{ background: STATUS_COLORS[statusKey] }}>
          {animal.isAdopted ? 'Adotado' : 'Disponível para adoção'}
        </span>
      </div>

      <div className={styles.content}>
        <h1 className={styles.name}>{animal.name}</h1>

        <div className={styles.chips}>
          <span className={styles.chip}>{raceLabel}</span>
          <span className={styles.chip}>{genderLabel}</span>
          <span className={styles.chip}>{animal.age}</span>
          {animal.tags?.map(tag => (
            <span key={tag.id} className={styles.chip}>{tag.name}</span>
          ))}
        </div>

        {(instagramHandle || pixKey) && (
          <div className={styles.contactRow}>
            {instagramHandle && <span className={styles.contactItem}>📷 {instagramHandle}</span>}
            {pixKey && <span className={styles.contactItem}>💚 PIX: {pixKey}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostTemplate;

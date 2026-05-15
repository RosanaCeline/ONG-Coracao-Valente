import styles from './AnimalCard.module.css';

const AnimalCard = ({ name, age, photo, tags }) => {
  return (
    <div className={styles.wrapper}>
      <article className={styles.card}>
        <div className={styles.photoWrapper}>
          <img src={photo} alt={`Foto de ${name}`} className={styles.photo} />
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.name}>{name}</span>
          <span className={styles.age}>{age}</span>
        </div>
      </article>

      <div className={styles.tags} aria-label="Características">
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimalCard;

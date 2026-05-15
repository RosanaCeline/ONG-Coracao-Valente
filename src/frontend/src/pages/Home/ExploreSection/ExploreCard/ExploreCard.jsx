import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../../components/btn/ButtonComponent/ButtonComponent';
import Title from '../../../../components/ui/Title/Title';
import styles from './ExploreCard.module.css';

const ExploreCard = ({ title, buttonLabel, to, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <article className={styles.card} onClick={() => navigate(to)}>
      {Icon && (
        <div className={styles.icon} aria-hidden="true">
          <Icon size={22} strokeWidth={1.5} />
        </div>
      )}

      <Title as="h3" className={styles.title}>
        {title}
      </Title>

      <ButtonComponent
        variant="white"
        onClick={(e) => { e.stopPropagation(); navigate(to); }}
      >
        {buttonLabel}
      </ButtonComponent>
    </article>
  );
};

export default ExploreCard;

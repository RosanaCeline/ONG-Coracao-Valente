import { useRef } from 'react';
import Title from '../../../components/ui/Title/Title';
import useInView from '../../../hooks/useInView';
import styles from './ResponsibleSection.module.css';

const checklistItems = [
  {
    title: 'Você tem tempo e presença diária para oferecer?',
    description: 'Animais precisam de companhia, não só de teto.',
  },
  {
    title: 'Está pronto para um compromisso de anos?',
    description: 'Um cão pode viver 15 anos. Um gato, mais de 20.',
  },
  {
    title: 'Considerou os custos?',
    description: 'Ração, vacinas, vermífugos e emergências fazem parte da vida com um animal.',
  },
  {
    title: 'Sua casa está preparada?',
    description: 'Espaço, segurança e ambiente saudável fazem toda a diferença.',
  },
];

const ResponsibleSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={ref}
    >
      <span className={styles.label}>ADOÇÃO RESPONSÁVEL</span>

      <Title as="h1">
        <em>Adotar</em> é para sempre.
      </Title>

      <p className={styles.intro}>
        Antes de dar esse passo, queremos ter certeza de que você e o animal
        vão se encontrar de verdade.
      </p>

      <ol className={styles.checklist}>
        {checklistItems.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.number} aria-hidden="true">
              {i + 1}
            </span>
            <p className={styles.itemText}>
              <strong>{item.title}</strong>{' '}
              {item.description}
            </p>
          </li>
        ))}
      </ol>

      <p className={styles.closing}>
        Se você respondeu <strong>sim</strong> para tudo isso —{' '}
        <strong>seu novo melhor amigo está esperando por você.</strong>
      </p>

      <hr className={styles.divider} />
    </section>
  );
};

export default ResponsibleSection;

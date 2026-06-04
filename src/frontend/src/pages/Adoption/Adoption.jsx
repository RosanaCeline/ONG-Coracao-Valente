import { useEffect } from 'react';
import ResponsibleSection from './ResponsibleSection/ResponsibleSection';
import AnimalsSection from './AnimalsSection/AnimalsSection';
import styles from './Adoption.module.css';

export function Adoption() {
  useEffect(() => {
    document.title = 'Adoção | ONG Coração Valente';
  }, []);

  return (
    <main className={styles.main}>
      <ResponsibleSection />
      <AnimalsSection />
    </main>
  );
}

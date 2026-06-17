import { useRef, useState, useEffect } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './TransparencySection.module.css';
import Title from '../../../components/ui/Title/Title';
import ExpenseChart from './components/ExpenseChart/ExpenseChart';
import ExpenseCards from './components/ExpenseCards/ExpenseCards';
import { getExpenseBreakdown } from '../../../services/donations';

import food from '../../../assets/transparency/food.png';
import maintenance from '../../../assets/transparency/maintenance.png';
import vaccine from '../../../assets/transparency/vaccine.png';
import veterinaryCare from '../../../assets/transparency/veterinaryCare.png';
import dogHouse from '../../../assets/transparency/dog-house.png';
import donatePet from '../../../assets/donate/donatePet.png';

const EXPENSE_METADATA = {
  ALIMENTACAO: { color: '#E8B86A', icon: food },
  VETERINARIO:  { color: '#7AACBF', icon: veterinaryCare },
  VACINAS:      { color: '#9EB89C', icon: vaccine },
  ABRIGO:       { color: '#C4A8A0', icon: dogHouse },
  CASTRAMOVEL:  { color: '#B5A8D4', icon: donatePet },
  TRANSPORTE:   { color: '#A8C4D4', icon: maintenance },
  OUTROS:       { color: '#C8C4BA', icon: maintenance },
};

const TransparencySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    getExpenseBreakdown().then(raw => {
      const total = raw.reduce((acc, item) => acc + item.value, 0);
      setExpenseData(raw.map(item => ({
        ...item,
        percentage: Math.round((item.value / total) * 100),
        ...EXPENSE_METADATA[item.id],
      })));
    });
  }, []);

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={ref}
    >
      <div className={styles.content}>
        <div className={styles.chartArea}>
          <Title as="h2">
            Para onde vai sua <em>doação?</em>
          </Title>
          <ExpenseChart data={expenseData} />
        </div>
        <div className={styles.cardsArea}>
          <ExpenseCards data={expenseData} />
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;

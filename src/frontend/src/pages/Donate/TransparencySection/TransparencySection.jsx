import { useRef, useState, useEffect } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './TransparencySection.module.css';
import Title from '../../../components/ui/Title/Title';
import ExpenseChart from './components/ExpenseChart/ExpenseChart';
import ExpenseCards from './components/ExpenseCards/ExpenseCards';
import { getExpenseBreakdown } from '../../../services/donations';

import food from '../../../assets/donate/donate-20.png';
import maintenance from '../../../assets/transparency/dog-house.png';
import vaccine from '../../../assets/donate/donate-50.png';
import veterinaryCare from '../../../assets/donate/donate-100.png';

const EXPENSE_METADATA = {
  food:    { color: '#E8B86A', icon: food },
  vet:     { color: '#7AACBF', icon: veterinaryCare },
  vaccine: { color: '#9EB89C', icon: vaccine },
  shelter: { color: '#C4A8A0', icon: maintenance },
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

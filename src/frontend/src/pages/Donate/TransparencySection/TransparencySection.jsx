import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './TransparencySection.module.css';
import Title from '../../../components/ui/Title/Title';
import ExpenseChart from './components/ExpenseChart/ExpenseChart';
import ExpenseCards from './components/ExpenseCards/ExpenseCards';

import food from '../../../assets/transparency/food.png';
import maintenance from '../../../assets/transparency/maintenance.png';
import vaccine from '../../../assets/transparency/vaccine.png';
import veterinaryCare from '../../../assets/transparency/veterinaryCare.png';

const expenseData = [
    {
        title: 'ALIMENTAÇÃO DOS ANIMAIS',
        value: 189980,
        percentage: 34,
        color: '#F5A623',
        icon: food
    },
    {
        title: 'ATENDIMENTO VETERINÁRIO',
        value: 162840,
        percentage: 30,
        color: '#3B82F6',
        icon: veterinaryCare
    },
    {
        title: 'VACINAS E MEDICAMENTOS',
        value: 108560,
        percentage: 20,
        color: '#B44DDB',
        icon: vaccine
    },
    {
        title: 'MANUTENÇÃO DO ABRIGO',
        value: 81420,
        percentage: 15,
        color: '#22B8B0',
        icon: maintenance
    }
];

export default function TransparencySection() {
    const ref = useRef(null);
    const inView = useInView(ref, 0.1);

    return(
        <section
            className={`${styles.section} ${inView ? styles.visible : ''}`}
            ref={ref}
            >
            <div className={styles.content}>
                <Title as="h1">
                    Para onde vai sua <em>doação?</em>
                    <ExpenseChart data={expenseData} />
                </Title>
                <section>
                    <ExpenseCards data={expenseData} />
                </section>
            </div>
        </section>
    )
}
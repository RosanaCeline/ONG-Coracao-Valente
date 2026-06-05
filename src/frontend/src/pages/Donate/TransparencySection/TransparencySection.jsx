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
        color: '#C87941',
        icon: food
    },
    {
        title: 'ATENDIMENTO VETERINÁRIO',
        value: 162840,
        percentage: 30,
        color: '#3D6278',
        icon: veterinaryCare
    },
    {
        title: 'VACINAS E MEDICAMENTOS',
        value: 108560,
        percentage: 20,
        color: '#6B8C6E',
        icon: vaccine
    },
    {
        title: 'MANUTENÇÃO DO ABRIGO',
        value: 81420,
        percentage: 15,
        color: '#8C7B6A',
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
                <div>
                    <Title as="h1">
                        Para onde vai sua <em>doação?</em>
                    </Title>
                    <ExpenseChart data={expenseData} />
                </div>
                <section>
                    <ExpenseCards data={expenseData} />
                </section>
            </div>
        </section>
    )
}
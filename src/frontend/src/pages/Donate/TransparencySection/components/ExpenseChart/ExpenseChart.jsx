import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './ExpenseChart.module.css';

ChartJS.register( ArcElement, Tooltip, Legend);

export default function ExpenseChart({ data }) {

    const total = data.reduce((acc, item) => acc + item.value, 0);

    const chartData = {
        labels: data.map(item => item.title),
        datasets: [
            {
                data: data.map(item => item.value),
                backgroundColor: data.map(item => item.color),
                borderWidth: 0,
                hoverOffset: 5
            }
        ]
    };

    const options = {
        cutout: '70%',
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className={styles.chartContainer}>
            <Doughnut data={chartData} options={options} />

            <div className={styles.chartCenter}>
                <h3 className={styles.chartTotal}>
                    {total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </h3>

                <span className={styles.chartLabel}>
                    ARRECADAÇÃO TOTAL
                </span>
            </div>
        </div>
    );
}
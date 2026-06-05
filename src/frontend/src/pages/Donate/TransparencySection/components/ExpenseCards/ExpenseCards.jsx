import styles from './ExpenseCards.module.css';

export default function ExpenseCards({ data }) {
    return (
        <div className={styles.cardsContainer}>
            {data.map(item => (
                <div
                    key={item.title}
                    className={styles.expenseCard}
                    style={{
                        background: `
                            linear-gradient(
                                135deg,
                                ${item.color},
                                ${item.color}dd
                            )
                        `
                    }}
                >
                    <img src={item.icon} alt={item.title} />

                    <div className={styles.expenseCardContent}>
                        <strong>
                            {item.percentage}% {item.title}
                        </strong>

                        <p>
                            {item.value.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
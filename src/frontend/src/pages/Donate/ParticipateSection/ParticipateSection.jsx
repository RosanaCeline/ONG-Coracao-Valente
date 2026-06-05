import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './ParticipateSection.module.css';

export default function ParticipateSection() {
    const ref = useRef(null);
    const inView = useInView(ref, 0.2);

    return(
        <section ref={ref} className={styles.mission}>
            <div className={styles.inner}>
                <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
                    <div className={styles.textArea}>
                        <h2 className={styles.heading}>Sua doação pode salvar uma vida. Contribua com essa causa!</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}
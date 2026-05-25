import { useRef } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './DonationSaveLivesSection.module.css';
import donatePet from '../../../assets/donate/donatePet.png';

export default function DonationSaveLivesSection() {
    const ref = useRef(null);
    const inView = useInView(ref, 0.2);

    return(
        <section ref={ref} className={styles.mission}>
            <div className={styles.inner}>
                <div className={`${styles.content} ${inView ? styles.visible : ''}`}>
                    <div className={styles.textArea}>
                        <span className={styles.label}>CONTRIBUA</span>
                        <h2 className={styles.heading}>Sua doação pode salvar uma vida</h2>
                        <p className={styles.description}>
                            A Luna chegou até nós com medo de tudo e de todos. Hoje, depois de meses de cuidado 
                            e muita paciência, <strong>ela é um exemplo de resiliência e esperança!</strong>
                        </p>
                    </div>
                    <img src={donatePet} className={styles.image} />
                </div>
            </div>
        </section>
    )
}
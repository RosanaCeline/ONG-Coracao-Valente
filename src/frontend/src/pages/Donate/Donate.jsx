import { useEffect } from 'react';
import styles from './Donate.module.css';
import DonateSection from './DonateSection/DonateSection';
import DonationSaveLivesSection from './DonationSaveLivesSection/DonationSaveLivesSection';
//import TransparencySection from './TransparencySection/TransparencySection';
import ParticipateSection from './ParticipateSection/ParticipateSection';

const Donate = () => {
  useEffect(() => {
    document.title = 'Doação | ONG Coração Valente';
  }, []);

  return (
    <main className={styles.main}>
      <DonateSection />
      <DonationSaveLivesSection />
      {/* <TransparencySection /> */}
      <ParticipateSection />
    </main>
  );
};

export default Donate;

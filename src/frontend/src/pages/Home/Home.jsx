import { useEffect } from 'react';
import HeroSection from './HeroSection/HeroSection';
import MissionSection from './MissionSection/MissionSection';
import ExploreSection from './ExploreSection/ExploreSection';
import InstagramSection from './InstagramSection/InstagramSection';
import PartnersSection from './PartnersSection/PartnersSection';
import styles from './Home.module.css';

const Home = () => {
  useEffect(() => {
    document.title = 'Início | ONG Coração Valente';
  }, []);

  return (
    <main className={styles.main}>
      <HeroSection />
      <MissionSection />
      <ExploreSection />
      <InstagramSection />
      <PartnersSection />
    </main>
  );
};

export default Home;

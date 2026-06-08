import { useRef, useState } from 'react';
import useInView from '../../../hooks/useInView';
import styles from './DonateSection.module.css';
import Title from '../../../components/ui/Title/Title';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import donate20 from '../../../assets/donate/donate-20.png';
import donate50 from '../../../assets/donate/donate-50.png';
import donate100 from '../../../assets/donate/donate-100.png';

const donationExplains = [
  {
    img: donate20,
    description: 'Sua doação de R$ 20 ajuda a alimentar um animal por uma semana.',
  },
  {
    img: donate50,
    description: 'Sua doação de R$ 50 contribui para a vacinação de um animal.',
  },
  {
    img: donate100,
    description: 'Sua doação de R$ 100 pode ajudar a realizar um tratamento médico para um animal.',
  },
];

const formatBRL = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const DonateSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);
  const [donateActiveButton, setDonateActiveButton] = useState(1);
  const [customDonate, setCustomDonate] = useState(formatBRL(50));

  const handleDonateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomDonate(formatBRL(Number(value) / 100));
    setDonateActiveButton(-1);
  };

  const setDonationValue = (value, index) => {
    setCustomDonate(formatBRL(value));
    setDonateActiveButton(index);
  };

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={ref}
    >
      <div className={styles.content}>
        <div className={styles.textArea}>
          <span className={styles.label}>FAÇA UMA DOAÇÃO</span>

          <Title as="h1">
            Eles só tem <em>você</em> agora.
          </Title>

          <p className={styles.intro}>
            Cada real doado <strong>se transforma em ração, vacina, curativo</strong> ou simplesmente
            <strong> mais um dia de vida</strong> para um animal que ainda não encontrou seu lar.
          </p>
        </div>

        <div className={styles.donateArea}>
          <p>ESCOLHA UM VALOR OU DIGITE O SEU</p>
          <div className={styles.donateValues}>
            {[20, 50, 100].map((value, index) => (
              <button
                key={value}
                className={`${styles.donateButton} ${donateActiveButton === index ? styles.activeDonateButton : ''}`}
                onClick={() => setDonationValue(value, index)}
              >
                R$ {value}
              </button>
            ))}
          </div>
          <div className={styles.donationExplain}>
            <img
              src={donationExplains[donateActiveButton === -1 ? 1 : donateActiveButton].img}
              alt={donationExplains[donateActiveButton === -1 ? 1 : donateActiveButton].description}
            />
            <p>{donationExplains[donateActiveButton === -1 ? 1 : donateActiveButton].description}</p>
          </div>
          <div className={styles.customDonate}>
            <label htmlFor="customDonate">DESEJA DOAR OUTRO VALOR?</label>
            <input
              type="text"
              id="customDonate"
              value={customDonate}
              onChange={handleDonateChange}
              placeholder="R$ 0,00"
            />
          </div>
          <ButtonComponent style={{ width: '100%' }}>
            Prosseguir com pagamento
          </ButtonComponent>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;

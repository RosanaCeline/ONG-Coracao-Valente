import { useRef, useState } from 'react';
import { X, Copy, Check, Loader2 } from 'lucide-react';
import useInView from '../../../hooks/useInView';
import styles from './DonateSection.module.css';
import Title from '../../../components/ui/Title/Title';
import ButtonComponent from '../../../components/btn/ButtonComponent/ButtonComponent';
import { getQrCode } from '../../../services/payment';
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

const parseBRL = (str) => {
  const digits = str.replace(/\D/g, '');
  return Number(digits) / 100;
};

const DonateSection = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, 0.1);

  const [donateActiveButton, setDonateActiveButton] = useState(1);
  const [customDonate, setCustomDonate]             = useState(formatBRL(50));

  const [qrOpen, setQrOpen]     = useState(false);
  const [qrData, setQrData]     = useState(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError]   = useState('');
  const [copied, setCopied]     = useState(false);

  const handleDonateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomDonate(formatBRL(Number(value) / 100));
    setDonateActiveButton(-1);
  };

  const setDonationValue = (value, index) => {
    setCustomDonate(formatBRL(value));
    setDonateActiveButton(index);
  };

  const handlePay = async () => {
    const amount = parseBRL(customDonate);
    if (!amount) return;
    setQrOpen(true);
    setQrLoading(true);
    setQrError('');
    setQrData(null);
    try {
      const data = await getQrCode(amount);
      setQrData(data);
    } catch (err) {
      if (err.status === 503) {
        setQrError('O pagamento via PIX ainda não está disponível. Tente novamente mais tarde.');
      } else {
        setQrError('Não foi possível gerar o QR Code. Tente novamente.');
      }
    } finally {
      setQrLoading(false);
    }
  };

  const handleCopy = () => {
    if (!qrData?.copyPaste) return;
    navigator.clipboard.writeText(qrData.copyPaste);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const closeQr = () => { setQrOpen(false); setQrData(null); setQrError(''); };

  return (
    <>
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
            <ButtonComponent style={{ width: '100%' }} onClick={handlePay}>
              Prosseguir com pagamento
            </ButtonComponent>
          </div>
        </div>
      </section>

      {/* ── QR Code modal ── */}
      {qrOpen && (
        <div className={styles.overlay} onClick={closeQr}>
          <div className={styles.qrModal} onClick={e => e.stopPropagation()}>
            <button className={styles.qrCloseBtn} onClick={closeQr} aria-label="Fechar">
              <X size={20} />
            </button>

            <h3 className={styles.qrTitle}>Doação via PIX</h3>

            {qrLoading && (
              <div className={styles.qrLoading}>
                <Loader2 size={32} className={styles.spin} />
              </div>
            )}

            {qrError && <p className={styles.qrError}>{qrError}</p>}

            {qrData && (
              <>
                <p className={styles.qrAmount}>
                  Valor: <strong>{customDonate}</strong>
                </p>
                <img
                  src={qrData.qrcode}
                  alt="QR Code PIX para doação"
                  className={styles.qrImage}
                />
                <p className={styles.qrInfo}>
                  {qrData.pixName} · {qrData.pixBank}
                </p>
                <div className={styles.copyRow}>
                  <code className={styles.copyCode}>{qrData.copyPaste}</code>
                  <button className={styles.copyBtn} onClick={handleCopy}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copiado!' : 'Copiar código'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DonateSection;

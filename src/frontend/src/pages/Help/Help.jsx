import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import limpeza from '../../assets/help/cleaner.png';
import organizacao from '../../assets/help/people.png';
import divulgacao from '../../assets/help/divulga.png';
import racao from '../../assets/help/trainer.png';
import imageDog from '../../assets/help/ImageDog.png';

import styles from './Help.module.css';
import ButtonComponent from '../../components/btn/ButtonComponent/ButtonComponent';
import useInView from '../../hooks/useInView';
import { getVolunteerAreas } from '../../services/volunteers';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const buildWhatsappUrl = (name, areaTitulo) => {
  const message = `Olá! Vim pelo site da ONG Coração Valente e gostaria de me voluntariar na área de *${areaTitulo}*. Meu nome é *${name}*. Como posso começar? 🐾`;
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
};

const AREA_METADATA = {
  1: { imagem: limpeza },
  2: { imagem: organizacao },
  3: { imagem: divulgacao },
  4: { imagem: racao },
};

const Help = () => {
  const navigate = useNavigate();

  const topRef = useRef(null);
  const gridRef = useRef(null);
  const impactoRef = useRef(null);
  const formRef = useRef(null);

  const topInView = useInView(topRef, 0.1);
  const gridInView = useInView(gridRef, 0.1);
  const impactoInView = useInView(impactoRef, 0.1);

  const [cardAreas, setCardAreas] = useState([]);
  const [selectAreas, setSelectAreas] = useState([]);
  const [formName, setFormName] = useState('');
  const [formArea, setFormArea] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = 'Voluntariado | ONG Coração Valente';
    getVolunteerAreas().then(raw => {
      setSelectAreas(raw);
      setCardAreas(raw.map(a => ({ ...a, ...AREA_METADATA[a.id] })));
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formName.trim()) newErrors.name = 'Por favor, informe seu nome.';
    if (!formArea) newErrors.area = 'Por favor, selecione uma área.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const areaTitulo = selectAreas.find(a => String(a.id) === formArea)?.titulo ?? formArea;
      window.open(buildWhatsappUrl(formName.trim(), areaTitulo), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main className={styles.main}>
      <div
        ref={topRef}
        className={`${styles.topBlock} ${topInView ? styles.visible : ''}`}
      >
        <p className={styles.tag}>Seja voluntário</p>
        <h1>
          Sua presença <em>salva vidas.</em>
        </h1>
        <p className={styles.subtitulo}>
          Não é preciso ser veterinário para fazer a diferença. Com algumas horas
          por semana, você pode ajudar na:
        </p>
      </div>

      <div
        ref={gridRef}
        className={`${styles.gridBlock} ${gridInView ? styles.visible : ''}`}
      >
        <div className={styles.grid}>
          {cardAreas.map((area) => (
            <div key={area.id} className={styles.card}>
              <img src={area.imagem} alt={area.titulo} className={styles.cardImg} />
              <span className={styles.cardTitulo}>{area.titulo}</span>
            </div>
          ))}
        </div>

        <p className={styles.subtitulo}>
          Cada voluntário que entra pela nossa porta leva junto um pedaço de
          esperança para quem não sabe o que é isso ainda.
        </p>

        <ButtonComponent style={{ alignSelf: 'center' }} onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}>
          Quero começar a fazer diferença agora
        </ButtonComponent>
      </div>

      <div
        ref={impactoRef}
        className={`${styles.secaoImpacto} ${impactoInView ? styles.visible : ''}`}
      >
        <div className={styles.impactoTexto}>
          <h2>
            Sua ajuda <em>importa.</em>
          </h2>
          <p className={styles.textoImpacto}>
            Com algumas horas por semana, você ajuda a{' '}
            <strong>melhorar as condições de vida dos animais resgatados</strong>
            , aumentar as chances de adoção e ajudar na recuperação de cada
            animal.
          </p>
          <p className={styles.textoImpacto}>
            Cada voluntário que entra pela nossa porta muda a rotina de quem não
            tem voz para pedir ajuda.
          </p>
          <ButtonComponent onClick={() => navigate('/doar')}>
            Prefiro doar
          </ButtonComponent>
        </div>
        <img src={imageDog} alt="Cachorro resgatado" className={styles.cachorroImg} />
      </div>

      <section ref={formRef} className={styles.secaoForm}>
        <div className={styles.secaoFormInner}>
          <p className={styles.formTag}>Voluntarie-se</p>
          <h2 className={styles.headlineForm}>Participe, faça diferença.</h2>
          <p className={styles.formSubtitulo}>
            Preencha abaixo e a gente entra em contato pelo WhatsApp para
            alinhar os próximos passos.
          </p>
          <form className={styles.formDireita} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="volunteer-name" className={styles.label}>
                Nome:
              </label>
              <input
                id="volunteer-name"
                type="text"
                placeholder="Como podemos te chamar?"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                value={formName}
                onChange={e => { setFormName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="volunteer-area" className={styles.label}>
                Como quer ajudar?
              </label>
              <select
                id="volunteer-area"
                className={`${styles.select} ${errors.area ? styles.inputError : ''}`}
                value={formArea}
                onChange={e => { setFormArea(e.target.value); setErrors(prev => ({ ...prev, area: undefined })); }}
              >
                <option value="" disabled>Selecione uma área...</option>
                {selectAreas.map((area) => (
                  <option key={area.id} value={area.id}>{area.titulo}</option>
                ))}
              </select>
              {errors.area && <span className={styles.error}>{errors.area}</span>}
            </div>

            <ButtonComponent variant="white" style={{ alignSelf: 'center' }}>
              Quero me voluntariar
            </ButtonComponent>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Help;

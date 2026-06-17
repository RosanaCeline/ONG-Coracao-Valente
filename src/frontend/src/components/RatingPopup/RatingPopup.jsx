import { useState } from 'react';
import styles from './RatingPopup.module.css';
import { useRatingPopup } from './useRatingPopup';
import { sendRating } from '../../services/rating';
  
const SUS_QUESTIONS = [
  { id: 'q1',  text: 'Acho que gostaria de utilizar a plataforma com frequência.' },
  { id: 'q2',  text: 'Considerei a plataforma mais complexa do que necessário.' },
  { id: 'q3',  text: 'Achei a plataforma fácil de utilizar.' },
  { id: 'q4',  text: 'Acho que necessitaria de ajuda de um técnico para conseguir utilizar a plataforma.' },
  { id: 'q5',  text: 'Considerei que as várias funcionalidades da plataforma estavam bem integradas.' },
  { id: 'q6',  text: 'Achei que a plataforma tinha muitas inconsistências.' },
  { id: 'q7',  text: 'Suponho que a maioria das pessoas aprenderia a utilizar a plataforma.' },
  { id: 'q8',  text: 'Considerei a plataforma muito complicada de utilizar.' },
  { id: 'q9',  text: 'Senti-me muito confiante ao utilizar a plataforma.' },
  { id: 'q10', text: 'Tive que aprender muito antes de conseguir lidar com a plataforma.' },
];

const SCALE = [1, 2, 3, 4, 5];

function SUSForm({ onSubmitted, onClose }) {
  const [answers, setAnswers] = useState({});
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const allAnswered = SUS_QUESTIONS.every((q) => answers[q.id] !== undefined);
  const canSubmit = allAnswered && consent && !loading;

  const handleSelect = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setError('');
    setLoading(true);

    const payload = { ...answers, isTermAccepted: consent };

    try {
      await sendRating(payload);

      setSubmitted(true);
      setTimeout(() => onSubmitted(), 2000);
    } catch (err) {
      console.error('Erro ao enviar avaliação SUS:', err);
      setError('Não foi possível enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.thankYou}>
        <div className={styles.thankYouEmoji}>💙</div>
        <p className={styles.thankYouTitle}>Obrigado pela sua avaliação!</p>
        <p className={styles.thankYouText}>
          Sua resposta contribui para a melhoria contínua da plataforma da ONG Coração Valente.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h2 className={styles.title}>Avalie sua experiência</h2>
          <p className={styles.subtitle}>
            Questionário SUS · 10 perguntas · menos de 2 minutos
          </p>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
          ✕
        </button>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendLabel}>1 — Discordo fortemente</span>
        <span className={styles.legendLabel}>5 — Concordo fortemente</span>
      </div>

      <div className={styles.questions}>
        {SUS_QUESTIONS.map((q, index) => (
          <div key={q.id} className={styles.questionRow}>
            <span className={styles.questionNumber}>Q{index + 1}</span>
            <span className={styles.questionText}>{q.text}</span>
            <div className={styles.scale} role="group" aria-label={`Resposta para Q${index + 1}`}>
              {SCALE.map((value) => (
                <button
                  key={value}
                  className={`${styles.scaleBtn} ${answers[q.id] === value ? styles.selected : ''}`}
                  onClick={() => handleSelect(q.id, value)}
                  aria-label={`${value}`}
                  aria-pressed={answers[q.id] === value}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.consentRow}>
          <input
            type="checkbox"
            id="sus-consent"
            className={styles.consentCheckbox}
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label htmlFor="sus-consent" className={styles.consentLabel}>
            <strong>Autorizo</strong> o uso das minhas respostas em pesquisas e relatórios
            futuros sobre a plataforma da ONG Coração Valente, de forma anônima e agregada.{' '}
            <em>(obrigatório)</em>
          </label>
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit} disabled={!canSubmit}>
          {loading ? 'Enviando…' : 'Enviar avaliação'}
        </button>

        {error && <p className={styles.errorMsg}>{error}</p>}
      </div>
    </>
  );
}

// Botão flutuante
function FloatingRatingBtn({ onClick }) {
  return (
    <button
      className={styles.floatingBtn}
      onClick={onClick}
      aria-label="Abrir avaliação do site"
      title="Avaliar a plataforma"
    >
      <span className={styles.floatingIcon}>★</span>
      <span className={styles.floatingLabel}>Avaliar</span>
    </button>
  );
}

export function RatingPopup() {
  const { isVisible, open, close, handleSubmitted, showFloatingBtn } = useRatingPopup();

  return (
    <>
      {showFloatingBtn && <FloatingRatingBtn onClick={open} />}

      {isVisible && (
        <div className={styles.overlay} onClick={close}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <SUSForm onSubmitted={handleSubmitted} onClose={close} />
          </div>
        </div>
      )}
    </>
  );
}
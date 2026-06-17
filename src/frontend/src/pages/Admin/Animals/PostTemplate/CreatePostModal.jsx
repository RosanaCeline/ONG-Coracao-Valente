import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { X, Download, Copy, Check, Loader2 } from 'lucide-react';
import { getOngInfo } from '../../../../services/ong';
import { getPixConfig } from '../../../../services/payment';
import PostTemplate from './PostTemplate';
import { buildCaption } from './buildCaption';
import styles from './CreatePostModal.module.css';

const Modal = ({ title, onClose, children }) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.modal} onClick={e => e.stopPropagation()}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const preloadImage = (src) => new Promise((resolve, reject) => {
  if (!src) { resolve(); return; }
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload  = () => resolve();
  img.onerror = () => reject(new Error('Falha ao carregar a foto do animal.'));
  img.src = src;
});

const CreatePostModal = ({ animal, onClose }) => {
  const captureRef = useRef(null);

  const [ongInfo, setOngInfo]       = useState(null);
  const [pixInfo, setPixInfo]       = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imageUrl, setImageUrl]     = useState('');
  const [caption, setCaption]       = useState('');
  const [generating, setGenerating] = useState(true);
  const [error, setError]           = useState('');
  const [copied, setCopied]         = useState(false);

  // 1) Fetch ONG + PIX data once.
  useEffect(() => {
    let cancelled = false;
    Promise.all([getOngInfo(), getPixConfig().catch(() => null)])
      .then(([info, pix]) => {
        if (cancelled) return;
        setOngInfo(info);
        setPixInfo(pix);
        setCaption(buildCaption(animal, info?.instagramHandle ?? ''));
        setDataLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setError('Não foi possível carregar os dados da ONG.');
      });
    return () => { cancelled = true; };
  }, [animal]);

  // 2) Only after the offscreen template has re-rendered with real data, capture it.
  useEffect(() => {
    if (!dataLoaded) return;
    let cancelled = false;

    const capture = async () => {
      try {
        await preloadImage(animal.photoUrl);
        await document.fonts.ready;
        const canvas = await html2canvas(captureRef.current, { useCORS: true, scale: 2 });
        if (!cancelled) setImageUrl(canvas.toDataURL('image/png'));
      } catch {
        if (!cancelled) setError('Não foi possível gerar a imagem. Verifique se a foto do animal carregou corretamente.');
      } finally {
        if (!cancelled) setGenerating(false);
      }
    };

    capture();
    return () => { cancelled = true; };
  }, [dataLoaded, animal]);

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `${animal.name.toLowerCase().replace(/\s+/g, '-')}-publicacao.png`;
    a.click();
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <Modal title={`Criar publicação — ${animal.name}`} onClose={onClose}>
        <div className={styles.body}>
          {generating && !error && (
            <div className={styles.loadingState}>
              <Loader2 size={28} className={styles.spin} />
              <p>Gerando imagem...</p>
            </div>
          )}

          {error && <p className={styles.errorMsg}>{error}</p>}

          {imageUrl && !generating && (
            <>
              <img src={imageUrl} alt={`Publicação de ${animal.name}`} className={styles.preview} />

              <button className={styles.downloadBtn} onClick={handleDownload}>
                <Download size={16} />
                Baixar imagem
              </button>

              <div className={styles.captionField}>
                <label className={styles.captionLabel}>Legenda sugerida</label>
                <textarea
                  className={styles.captionTextarea}
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  rows={8}
                />
                <button className={styles.copyBtn} onClick={handleCopyCaption}>
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? 'Copiado!' : 'Copiar legenda'}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Offscreen capture target — never visible, always present while this modal is mounted. */}
      <div className={styles.offscreen}>
        <div ref={captureRef}>
          <PostTemplate
            animal={animal}
            instagramHandle={ongInfo?.instagramHandle ?? ''}
            pixKey={pixInfo?.pixKey ?? ''}
          />
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;

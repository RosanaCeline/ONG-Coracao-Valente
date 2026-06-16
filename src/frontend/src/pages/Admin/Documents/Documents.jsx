import { useState, useEffect, useRef } from 'react';
import { Upload, Download, Trash2, FileText, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import {
  DOCUMENT_SLOTS,
  getDocuments, uploadDocument, removeDocument,
} from '../../../services/documents';
import styles from './Documents.module.css';

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

const triggerDownload = (doc) => {
  const a = document.createElement('a');
  a.href     = doc.url;
  a.download = doc.fileName;
  a.target   = '_blank';
  a.rel      = 'noopener noreferrer';
  a.click();
};

const Documents = () => {
  useEffect(() => {
    document.title = 'Documentos | ONG Coração Valente';
  }, []);

  const [docs,    setDocs]    = useState({});
  const [loading, setLoading] = useState(true);
  const [busy,    setBusy]    = useState({});
  const inputRefs = useRef({});

  useEffect(() => {
    getDocuments().then(data => { setDocs(data); setLoading(false); });
  }, []);

  const handleUpload = async (slotId, file) => {
    if (!file) return;
    setBusy(prev => ({ ...prev, [slotId]: 'uploading' }));
    const entry = await uploadDocument(slotId, file);
    setDocs(prev => ({ ...prev, [slotId]: entry }));
    setBusy(prev => ({ ...prev, [slotId]: null }));
  };

  const handleRemove = async (slotId) => {
    setBusy(prev => ({ ...prev, [slotId]: 'removing' }));
    await removeDocument(slotId);
    setDocs(prev => { const next = { ...prev }; delete next[slotId]; return next; });
    setBusy(prev => ({ ...prev, [slotId]: null }));
  };

  const total    = DOCUMENT_SLOTS.length;
  const uploaded = Object.keys(docs).length;
  const required = DOCUMENT_SLOTS.filter(s => s.required);
  const missingRequired = required.filter(s => !docs[s.id]).length;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.heading}>Documentos</h1>
        <div className={styles.progress}>
          <span className={styles.progressText}>{uploaded} de {total} documentos enviados</span>
          {missingRequired > 0 && (
            <span className={styles.missingBadge}>
              <AlertCircle size={13} />
              {missingRequired} obrigatório{missingRequired > 1 ? 's' : ''} pendente{missingRequired > 1 ? 's' : ''}
            </span>
          )}
          {missingRequired === 0 && uploaded > 0 && (
            <span className={styles.okBadge}><CheckCircle2 size={13} /> Documentos obrigatórios OK</span>
          )}
        </div>
      </div>

      <p className={styles.intro}>
        Mantenha os documentos da ONG organizados e atualizados. Os itens marcados com{' '}
        <strong>*</strong> são exigidos para convênios com a Prefeitura de Tianguá e para
        prestação de contas junto aos órgãos fiscais.
      </p>

      {loading ? (
        <div className={styles.list}>
          {[1,2,3,4,5].map(i => <div key={i} className={styles.skeleton} />)}
        </div>
      ) : (
        <div className={styles.list}>
          {DOCUMENT_SLOTS.map(slot => {
            const uploaded = docs[slot.id];
            const isBusy   = !!busy[slot.id];
            const status   = uploaded ? 'ok' : slot.required ? 'missing' : 'optional';

            return (
              <div key={slot.id} className={`${styles.card} ${styles[`card_${status}`]}`}>
                <div className={styles.cardIcon}>
                  {status === 'ok'
                    ? <CheckCircle2 size={20} className={styles.iconOk} />
                    : status === 'missing'
                    ? <AlertCircle  size={20} className={styles.iconMissing} />
                    : <FileText     size={20} className={styles.iconOptional} />
                  }
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.slotLabel}>
                    {slot.label}
                    {slot.required && <span className={styles.req}> *</span>}
                  </p>
                  <p className={styles.slotDesc}>{slot.description}</p>
                  {uploaded && (
                    <p className={styles.fileInfo}>
                      <Clock size={11} />
                      {uploaded.fileName} — enviado em {fmtDate(uploaded.uploadedAt)}
                    </p>
                  )}
                </div>

                <div className={styles.cardActions}>
                  {uploaded ? (
                    <>
                      <button
                        className={`${styles.actionBtn} ${styles.actionDownload}`}
                        onClick={() => triggerDownload(uploaded)}
                        aria-label="Baixar"
                        title="Baixar documento"
                      >
                        <Download size={15} />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.actionReplace}`}
                        onClick={() => inputRefs.current[slot.id]?.click()}
                        aria-label="Substituir"
                        title="Enviar nova versão"
                        disabled={isBusy}
                      >
                        <Upload size={15} />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.actionDelete}`}
                        onClick={() => handleRemove(slot.id)}
                        aria-label="Remover"
                        title="Remover documento"
                        disabled={isBusy}
                      >
                        <Trash2 size={15} />
                      </button>
                    </>
                  ) : (
                    <button
                      className={styles.uploadBtn}
                      onClick={() => inputRefs.current[slot.id]?.click()}
                      disabled={isBusy}
                    >
                      <Upload size={15} />
                      {isBusy ? 'Enviando...' : 'Enviar'}
                    </button>
                  )}

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className={styles.fileInput}
                    ref={el => { inputRefs.current[slot.id] = el; }}
                    onChange={e => { handleUpload(slot.id, e.target.files[0]); e.target.value = ''; }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Documents;

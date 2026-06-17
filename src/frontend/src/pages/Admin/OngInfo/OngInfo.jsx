import { useState, useEffect, useRef } from 'react';
import { Check, Upload, Loader2, MapPin, AlertCircle } from 'lucide-react';
import { getOngInfo, updateOngInfo } from '../../../services/ong';
import { getPixConfig, savePixConfig } from '../../../services/payment';
import styles from './OngInfo.module.css';

// ── PIX key type definitions (matches backend PixKeyType enum) ───────────────

const PIX_TYPES = {
  CPF:    'CPF',
  CNPJ:   'CNPJ',
  EMAIL:  'E-mail',
  PHONE:  'Telefone',
  RANDOM: 'Chave aleatória',
};

const PIX_PLACEHOLDERS = {
  CPF:    '000.000.000-00',
  CNPJ:   '00.000.000/0000-00',
  EMAIL:  'exemplo@email.com',
  PHONE:  '+5561912345678',
  RANDOM: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
};

// ── PIX key formatting (display only) ───────────────────────────────────────

const formatPix = (type, raw) => {
  if (type === 'CPF') {
    const d = raw.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }
  if (type === 'CNPJ') {
    const clean = raw.replace(/[.\/\-]/g, '');
    if (/^\d+$/.test(clean)) {
      const d = clean.slice(0, 14);
      if (d.length <= 2)  return d;
      if (d.length <= 5)  return `${d.slice(0, 2)}.${d.slice(2)}`;
      if (d.length <= 8)  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
      if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
      return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
    }
    return raw.toUpperCase().slice(0, 18);
  }
  return raw;
};

// ── Strip display formatting → raw BR Code key ──────────────────────────────
// CPF: digits only · CNPJ: strip . / - (keep letters) · others: as-is

const stripPixKey = (type, displayed) => {
  if (type === 'CPF')  return displayed.replace(/\D/g, '');
  if (type === 'CNPJ') return displayed.replace(/[.\/\-]/g, '');
  return displayed;
};

// ── BR Code validation rules (Manual Operacional DICT) ──────────────────────

const validatePix = (type, value) => {
  if (!value?.trim()) return null;
  switch (type) {
    case 'CPF': {
      const d = value.replace(/\D/g, '');
      return d.length === 11 ? null : 'CPF deve ter 11 dígitos';
    }
    case 'CNPJ': {
      const d = value.replace(/[.\/\-]/g, '');
      return /^[A-Z0-9]{14}$/i.test(d) ? null : 'CNPJ deve ter 14 caracteres alfanuméricos';
    }
    case 'EMAIL':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'E-mail inválido';
    case 'PHONE':
      return /^\+55\d{10,11}$/.test(value)
        ? null
        : 'Use o formato internacional: +55DDD999999999';
    case 'RANDOM':
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
        ? null
        : 'Formato UUID esperado: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    default:
      return null;
  }
};

// ── Other helpers ────────────────────────────────────────────────────────────

const formatCep = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};

const formatCnpj = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 14);
  if (d.length <= 2)  return d;
  if (d.length <= 5)  return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8)  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
};

const isFormValid = (f) =>
  f?.name?.trim() &&
  f?.responsibleName?.trim() &&
  f?.address?.trim() &&
  f?.neighborhood?.trim() &&
  f?.city?.trim() &&
  f?.state?.trim() &&
  f?.whatsappNumber?.trim() &&
  f?.instagramUrl?.trim() &&
  f?.instagramHandle?.trim();

// ── Component ────────────────────────────────────────────────────────────────

const OngInfo = () => {
  useEffect(() => {
    document.title = 'Informações da ONG | ONG Coração Valente';
  }, []);

  const [form, setForm]               = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [cepLoading, setCepLoading]   = useState(false);
  const [cepError, setCepError]       = useState('');
  const [cepOk, setCepOk]             = useState(false);
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);
  const [saveError, setSaveError]     = useState('');
  const [touched, setTouched]         = useState({});

  const isDirtyRef   = useRef(false);
  const savingRef    = useRef(false);
  const saveTimerRef = useRef(null);

  useEffect(() => {
    Promise.all([
      getOngInfo(),
      getPixConfig().catch(() => null),
    ]).then(([info, pix]) => {
      setForm({
        name:            info.name ?? '',
        cnpj:            info.cnpj ?? '',
        responsibleName: info.responsibleName ?? '',
        address:         info.address ?? '',
        number:          info.number ?? '',
        neighborhood:    info.neighborhood ?? '',
        city:            info.city ?? '',
        state:           info.state ?? '',
        cep:             info.cep ?? '',
        volunteers:      String(info.volunteers ?? ''),
        whatsappNumber:  info.whatsappNumber ?? '',
        instagramUrl:    info.instagramUrl ?? '',
        instagramHandle: info.instagramHandle ?? '',
        // PIX fields — sourced from real API
        pixKey:     pix?.pixKey     ?? '',
        pixKeyType: pix?.pixKeyType ?? 'CPF',
        pixBank:    pix?.pixBank    ?? '',
        pixName:    pix?.pixName    ?? '',
        pixCity:    pix?.pixCity    ?? '',
      });
      setLogoPreview(info.logoUrl ?? '');
    });
  }, []);

  const doSave = async (f, logo) => {
    // if (!isFormValid(f) || savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setSaveError('');
    try {
      await updateOngInfo({ ...f, volunteers: Number(f.volunteers) || 0, logoUrl: logo });

      const rawKey = stripPixKey(f.pixKeyType, f.pixKey ?? '').trim();
      const hasAnyPixData = rawKey || f.pixBank?.trim() || f.pixName?.trim() || f.pixCity?.trim();

      if (hasAnyPixData) {
        const missingTouch = {};
        if (!rawKey)            missingTouch.pixKey  = true;
        if (!f.pixBank?.trim()) missingTouch.pixBank = true;
        if (!f.pixName?.trim()) missingTouch.pixName = true;
        if (!f.pixCity?.trim()) missingTouch.pixCity = true;

        if (Object.keys(missingTouch).length > 0) {
          setTouched(prev => ({ ...prev, ...missingTouch }));
          throw new Error('Preencha todos os campos obrigatórios do PIX. Os dados do PIX não foram salvos.');
        }

        const pixErr = validatePix(f.pixKeyType, f.pixKey);
        if (pixErr) throw new Error(pixErr);

        await savePixConfig({
          pixKey:     rawKey,
          pixKeyType: f.pixKeyType,
          pixBank:    f.pixBank.trim(),
          pixName:    f.pixName.trim(),
          pixCity:    f.pixCity.trim(),
        });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setSaveError(err.message || 'Erro ao salvar.');
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!form || !isDirtyRef.current) return;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => doSave(form, logoPreview), 3000);
    return () => clearTimeout(saveTimerRef.current);
  }, [form, logoPreview]);

  const set = (field) => (e) => {
    isDirtyRef.current = true;
    setTouched(prev => ({ ...prev, [field]: true }));
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    isDirtyRef.current = true;
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleCepChange = async (e) => {
    const formatted = formatCep(e.target.value);
    isDirtyRef.current = true;
    setCepError('');
    setCepOk(false);
    setForm(prev => ({ ...prev, cep: formatted }));
    const clean = formatted.replace(/\D/g, '');
    if (clean.length !== 8) return;
    setCepLoading(true);
    try {
      const res  = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepError('CEP não encontrado');
      } else {
        setCepOk(true);
        setForm(prev => ({
          ...prev,
          address:      data.logradouro || prev.address,
          neighborhood: data.bairro     || prev.neighborhood,
          city:         data.localidade || prev.city,
          state:        data.uf         || prev.state,
        }));
      }
    } catch {
      setCepError('Erro ao buscar CEP');
    } finally {
      setCepLoading(false);
    }
  };

  const handleCnpjChange = (e) => {
    isDirtyRef.current = true;
    setForm(prev => ({ ...prev, cnpj: formatCnpj(e.target.value) }));
  };

  const handlePixKeyChange = (e) => {
    isDirtyRef.current = true;
    setForm(prev => ({ ...prev, pixKey: formatPix(prev.pixKeyType, e.target.value) }));
  };

  const handlePixTypeChange = (e) => {
    isDirtyRef.current = true;
    setForm(prev => ({ ...prev, pixKeyType: e.target.value, pixKey: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(saveTimerRef.current);
    setTouched({
      name: true, responsibleName: true, address: true, neighborhood: true,
      city: true, state: true,
      whatsappNumber: true, instagramUrl: true, instagramHandle: true,
    });
    doSave(form, logoPreview);
  };

  const pixError  = form ? validatePix(form.pixKeyType, form.pixKey) : null;
  const cnpjError = form?.cnpj?.trim()
    ? form.cnpj.replace(/\D/g, '').length !== 14 ? 'CNPJ deve ter 14 dígitos' : null
    : null;

  const err     = (field) => touched[field] && !form?.[field]?.trim() ? styles.inputError : '';
  const showErr = (field) => touched[field] && !form?.[field]?.trim();

  if (!form) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.heading}>Informações da ONG</h1>
        </div>
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit}>

        {/* ── Header ── */}
        <div className={styles.pageHeader}>
          <h1 className={styles.heading}>Informações da ONG</h1>
          <div className={styles.headerActions}>
            {saved && (
              <span className={styles.savedBadge}>
                <Check size={14} /> Salvo
              </span>
            )}
            {saving && !saved && (
              <span className={styles.savingBadge}>
                <Loader2 size={14} className={styles.spin} /> Salvando...
              </span>
            )}
            {saveError && (
              <span style={{ color: '#c90008', fontSize: '0.82rem' }}>
                <AlertCircle size={13} /> {saveError}
              </span>
            )}
            <button type="submit" className={styles.saveBtn}>
              Salvar alterações
            </button>
          </div>
        </div>

        <div className={styles.sections}>

          {/* ── PIX ── */}
          <section className={styles.pixSection}>
            <p className={styles.pixLabel}>Chave PIX para receber doações</p>
            <div className={styles.pixBoxes}>
              <div className={styles.pixBox}>
                <label className={styles.label}>Tipo de chave</label>
                <select
                  className={styles.select}
                  value={form.pixKeyType}
                  onChange={handlePixTypeChange}
                >
                  {Object.entries(PIX_TYPES).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div className={`${styles.pixBox} ${styles.pixBoxKey}`}>
                <label className={styles.label}>Chave <span className={styles.req}>*</span></label>
                <input
                  className={`${styles.input} ${(pixError || showErr('pixKey')) ? styles.inputError : ''}`}
                  value={form.pixKey}
                  onChange={handlePixKeyChange}
                  placeholder={PIX_PLACEHOLDERS[form.pixKeyType]}
                  inputMode={['CPF', 'CNPJ'].includes(form.pixKeyType) ? 'numeric' : 'text'}
                />
                {showErr('pixKey') ? (
                  <span className={styles.fieldError}>
                    <AlertCircle size={13} /> Campo obrigatório
                  </span>
                ) : pixError && (
                  <span className={styles.fieldError}>
                    <AlertCircle size={13} /> {pixError}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label}>Nome do recebedor <span className={styles.req}>*</span></label>
                <input
                  className={`${styles.input} ${err('pixName')}`}
                  value={form.pixName}
                  onChange={set('pixName')}
                  placeholder="Ex: ONG Coração Valente"
                />
                {showErr('pixName') && (
                  <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Banco <span className={styles.req}>*</span></label>
                <input
                  className={`${styles.input} ${err('pixBank')}`}
                  value={form.pixBank}
                  onChange={set('pixBank')}
                  placeholder="Ex: Nubank"
                />
                {showErr('pixBank') && (
                  <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
                )}
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Cidade do recebedor <span className={styles.req}>*</span></label>
              <input
                className={`${styles.input} ${err('pixCity')}`}
                value={form.pixCity}
                onChange={set('pixCity')}
                placeholder="Ex: Tianguá"
              />
              {showErr('pixCity') && (
                <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
              )}
            </div>
          </section>

          {/* ── Identidade ── */}
          {/* <section className={styles.card}>
            <h2 className={styles.cardTitle}>Identidade</h2>
            <div className={styles.logoRow}>
              <div className={styles.logoWrap}>
                {logoPreview
                  ? <img src={logoPreview} alt="Logo da ONG" className={styles.logoImg} />
                  : <span className={styles.logoPlaceholder}>Logo</span>
                }
              </div>
              <label className={styles.photoBtn}>
                <Upload size={15} />
                {logoPreview ? 'Trocar logo' : 'Enviar logo'}
                <input
                  type="file"
                  accept="image/*"
                  className={styles.photoInput}
                  onChange={handleLogoChange}
                />
              </label>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                Nome da ONG <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${err('name')}`}
                value={form.name}
                onChange={set('name')}
                placeholder="Ex: ONG Coração Valente"
              />
              {showErr('name') && (
                <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
              )}
            </div>

            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label}>CNPJ <span className={styles.optional}>(opcional)</span></label>
                <input
                  className={`${styles.input} ${cnpjError ? styles.inputError : ''}`}
                  value={form.cnpj}
                  onChange={handleCnpjChange}
                  placeholder="00.000.000/0000-00"
                  inputMode="numeric"
                />
                {cnpjError && (
                  <span className={styles.fieldError}><AlertCircle size={13} /> {cnpjError}</span>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Organizador / Responsável <span className={styles.req}>*</span></label>
                <input
                  className={`${styles.input} ${err('responsibleName')}`}
                  value={form.responsibleName}
                  onChange={set('responsibleName')}
                  placeholder="Ex: Maria Silva"
                />
                {showErr('responsibleName') && (
                  <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
                )}
              </div>
            </div>
          </section>

          {/* ── Localização ── */}
          {/* <section className={styles.card}>
            <h2 className={styles.cardTitle}>Localização</h2>

            <div className={styles.field} style={{ maxWidth: 200 }}>
              <label className={styles.label}>CEP</label>
              <div className={styles.inputIconWrap}>
                <input
                  className={`${styles.input} ${cepError ? styles.inputError : ''}`}
                  value={form.cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  inputMode="numeric"
                  maxLength={9}
                />
                {cepLoading && (
                  <Loader2 size={15} className={`${styles.inputAdorn} ${styles.spin}`} />
                )}
                {!cepLoading && cepOk && (
                  <MapPin size={15} className={`${styles.inputAdorn} ${styles.adornGreen}`} />
                )}
              </div>
              {cepError && (
                <span className={styles.fieldError}><AlertCircle size={13} /> {cepError}</span>
              )}
            </div>

            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label}>
                  Logradouro <span className={styles.req}>*</span>
                </label>
                <input
                  className={`${styles.input} ${err('address')}`}
                  value={form.address}
                  onChange={set('address')}
                  placeholder="Ex: Av. Manoel da Custódia"
                />
                {showErr('address') && (
                  <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>
                  Número <span className={styles.optional}>(opcional)</span>
                </label>
                <input
                  className={styles.input}
                  value={form.number}
                  onChange={set('number')}
                  placeholder="Ex: 1.111"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Bairro <span className={styles.req}>*</span>
              </label>
              <input
                className={`${styles.input} ${err('neighborhood')}`}
                value={form.neighborhood}
                onChange={set('neighborhood')}
                placeholder="Ex: Bairro São Geraldo"
              />
              {showErr('neighborhood') && (
                <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
              )}
            </div>

            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label}>
                  Cidade <span className={styles.req}>*</span>
                </label>
                <input
                  className={`${styles.input} ${err('city')}`}
                  value={form.city}
                  onChange={set('city')}
                  placeholder="Ex: Tianguá"
                />
                {showErr('city') && (
                  <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>
                  Estado (UF) <span className={styles.req}>*</span>
                </label>
                <input
                  className={`${styles.input} ${err('state')}`}
                  value={form.state}
                  onChange={set('state')}
                  placeholder="Ex: CE"
                  maxLength={30}
                />
                {showErr('state') && (
                  <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
                )}
              </div>
            </div>
          </section>

          {/* ── Contato ── */}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Contato &amp; Redes sociais</h2>
            <div className={styles.field}>
              <label className={styles.label}>
                WhatsApp <span className={styles.req}>*</span>
                <span className={styles.hint}> — somente números (DDI+DDD+número)</span>
              </label>
              <input
                className={`${styles.input} ${err('whatsappNumber')}`}
                value={form.whatsappNumber}
                onChange={set('whatsappNumber')}
                placeholder="5588994852867"
                inputMode="numeric"
              />
              {showErr('whatsappNumber') && (
                <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
              )}
            </div>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label}>
                  Instagram URL <span className={styles.req}>*</span>
                </label>
                <input
                  className={`${styles.input} ${err('instagramUrl')}`}
                  value={form.instagramUrl}
                  onChange={set('instagramUrl')}
                  placeholder="https://www.instagram.com/..."
                  type="url"
                />
                {showErr('instagramUrl') && (
                  <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>
                  Instagram @ <span className={styles.req}>*</span>
                </label>
                <input
                  className={`${styles.input} ${err('instagramHandle')}`}
                  value={form.instagramHandle}
                  onChange={set('instagramHandle')}
                  placeholder="@ong.coracaovalente"
                />
                {showErr('instagramHandle') && (
                  <span className={styles.fieldError}><AlertCircle size={13} /> Campo obrigatório</span>
                )}
              </div>
            </div>
          </section>

          {/* ── Equipe ── */}
          {/* <section className={styles.card}>
            <h2 className={styles.cardTitle}>Equipe</h2>
            <div className={styles.field}>
              <label className={styles.label}>
                Número de voluntários <span className={styles.optional}>(opcional)</span>
              </label>
              <input
                className={`${styles.input} ${styles.inputNarrow}`}
                value={form.volunteers}
                onChange={set('volunteers')}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>
          </section> */}

        </div>
      </form>
    </div>
  );
};

export default OngInfo;

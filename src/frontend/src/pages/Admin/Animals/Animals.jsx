import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Heart, X, Upload, ChevronDown, Loader2, ImageDown } from 'lucide-react';
import { getAnimals, createAnimal, updateAnimal, deleteAnimal, adoptAnimal } from '../../../services/animals';
import { getTags, createTag } from '../../../services/tags';
import CreatePostModal from './PostTemplate/CreatePostModal';
import styles from './Animals.module.css';

const STATUS_CONFIG = {
  disponivel: { label: 'Disponível para adoção', color: '#9EB89C' },
  adotado:    { label: 'Adotado',                color: '#7AACBF' },
};

const RACE_OPTIONS = [
  { value: 'DOG', label: 'Cão' },
  { value: 'CAT', label: 'Gato' },
];

const GENDER_OPTIONS = [
  { value: 'MALE',   label: 'Macho' },
  { value: 'FEMALE', label: 'Fêmea' },
];

const EMPTY_FORM = {
  name: '', race: 'DOG', gender: 'MALE', age: '', phoneNumber: '',
  photoFile: null, photoPreview: '',
  tags: [],
};

// ── Modal wrapper ───────────────────────────────────────────────────────────
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

// ── Tag multi-select ────────────────────────────────────────────────────────
// available / selected: [{id, name}]
const TagSelect = ({ available, selected, onChange, onCreateTag }) => {
  const [open, setOpen]     = useState(false);
  const [newTag, setNewTag] = useState('');
  const wrapRef             = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const isSelected = (tag) => selected.some(t => t.id === tag.id);

  const toggle = (tag) =>
    onChange(isSelected(tag) ? selected.filter(t => t.id !== tag.id) : [...selected, tag]);

  const handleCreate = async () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    try {
      const created = await onCreateTag(trimmed);
      if (created && !isSelected(created)) onChange([...selected, created]);
      setNewTag('');
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.tagSelectWrap} ref={wrapRef}>
      <div className={styles.selectedChips}>
        {selected.map(tag => (
          <span key={tag.id} className={styles.chip}>
            {tag.name}
            <button
              type="button"
              className={styles.chipRemove}
              onClick={() => toggle(tag)}
              aria-label={`Remover ${tag.name}`}
            >
              <X size={11} />
            </button>
          </span>
        ))}
        <button
          type="button"
          className={`${styles.chip} ${styles.chipToggle}`}
          onClick={() => setOpen(o => !o)}
        >
          Selecionar
          <ChevronDown size={12} className={open ? styles.chevronUp : ''} />
        </button>
      </div>

      {open && (
        <div className={styles.tagDropdown}>
          <div className={styles.tagOptions}>
            {available.map(tag => (
              <label key={tag.id} className={styles.tagOption}>
                <input
                  type="checkbox"
                  checked={isSelected(tag)}
                  onChange={() => toggle(tag)}
                />
                {tag.name}
              </label>
            ))}
          </div>
          <div className={styles.addTagRow}>
            <input
              className={styles.addTagInput}
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              placeholder="Nova tag..."
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleCreate())}
            />
            <button type="button" className={styles.addTagBtn} onClick={handleCreate}>
              Criar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Animal card ─────────────────────────────────────────────────────────────
const AnimalCard = ({ animal, onEdit, onAdopt, onDelete, onCreatePost }) => {
  const status    = animal.isAdopted ? STATUS_CONFIG.adotado : STATUS_CONFIG.disponivel;
  const raceLabel = animal.race === 'DOG' ? 'Cão' : 'Gato';

  return (
    <div className={styles.card}>
      {animal.photoUrl && (
        <img src={animal.photoUrl} alt={animal.name} className={styles.cardPhoto} />
      )}
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <div>
            <p className={styles.cardName}>{animal.name}</p>
            <p className={styles.cardAge}>
              <span className={styles.cardTipo}>{raceLabel}</span>
              {animal.age}
            </p>
          </div>
          <span className={styles.statusBadge} style={{ background: status.color }}>
            {status.label}
          </span>
        </div>

        {animal.tags?.length > 0 && (
          <div className={styles.tags}>
            {animal.tags.map(tag => (
              <span key={tag.id} className={styles.tag}>{tag.name}</span>
            ))}
          </div>
        )}

        <div className={styles.cardActions}>
          <button className={styles.actionBtn} onClick={() => onEdit(animal)} aria-label="Editar">
            <Pencil size={15} />
            Editar
          </button>
          {!animal.isAdopted && (
            <button
              className={`${styles.actionBtn} ${styles.actionAdopt}`}
              onClick={() => onAdopt(animal)}
              aria-label="Registrar adoção"
            >
              <Heart size={15} />
              Registrar adoção
            </button>
          )}
          {animal.photoUrl && (
            <button
              className={styles.actionBtn}
              onClick={() => onCreatePost(animal)}
              aria-label="Criar publicação"
            >
              <ImageDown size={15} />
              Criar publicação
            </button>
          )}
          <button
            className={`${styles.actionBtn} ${styles.actionDelete}`}
            onClick={() => onDelete(animal)}
            aria-label="Remover"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
const Animals = () => {
  useEffect(() => {
    document.title = 'Animais | ONG Coração Valente';
  }, []);

  const [animals, setAnimals]           = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [modal, setModal]               = useState(null);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [formError, setFormError]       = useState('');

  useEffect(() => {
    Promise.all([getAnimals(), getTags()])
      .then(([data, tags]) => {
        setAnimals(data);
        setAvailableTags(tags);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const closeModal = () => { setModal(null); setFormError(''); };

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setFormError('');
    setModal({ type: 'add' });
  };

  const openEdit = (animal) => {
    setForm({
      name:         animal.name,
      race:         animal.race,
      gender:       animal.gender,
      age:          animal.age,
      phoneNumber:  animal.phoneNumber ?? '',
      photoFile:    null,
      photoPreview: animal.photoUrl ?? '',
      tags:         animal.tags ?? [],
    });
    setFormError('');
    setModal({ type: 'edit', animal });
  };

  const openAdopt      = (animal) => { setFormError(''); setModal({ type: 'adopt', animal }); };
  const openDelete     = (animal) => { setFormError(''); setModal({ type: 'delete', animal }); };
  const openCreatePost = (animal) => setModal({ type: 'createPost', animal });

  const set = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(prev => ({
      ...prev,
      photoFile:    file,
      photoPreview: URL.createObjectURL(file),
    }));
  };

  const handleTagsChange   = (tags) => setForm(prev => ({ ...prev, tags }));

  const handleCreateTag = async (label) => {
    try {
      const tag = await createTag(label);
      setAvailableTags(prev => prev.some(t => t.id === tag.id) ? prev : [...prev, tag]);
      return tag;
    } catch (err) {
      if (err.status === 409) {
        return availableTags.find(t => t.name.toLowerCase() === label.toLowerCase()) ?? null;
      }
      throw err;
    }
  };

  const buildFormData = async () => {
    const fd = new FormData();
    fd.append('name',   form.name);
    fd.append('age',    form.age);
    fd.append('gender', form.gender);
    fd.append('race',   form.race);
    if (form.phoneNumber?.trim()) fd.append('phoneNumber', form.phoneNumber.trim());
    form.tags.forEach(t => fd.append('tagIds', t.id));

    if (form.photoFile) {
      fd.append('photo', form.photoFile);
    } else if (modal?.type === 'edit' && form.photoPreview) {
      const r    = await fetch(form.photoPreview);
      const blob = await r.blob();
      fd.append('photo', blob, 'photo.jpg');
    }
    return fd;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const fd = await buildFormData();
      let result;
      if (modal.type === 'add') {
        result = await createAnimal(fd);
        setAnimals(prev => [result, ...prev]);
      } else {
        result = await updateAnimal(modal.animal.id, fd);
        setAnimals(prev => prev.map(a => a.id === result.id ? result : a));
      }
      closeModal();
    } catch (err) {
      setFormError(err.message || 'Erro ao salvar animal.');
    } finally {
      setSaving(false);
    }
  };

  const handleAdopt = async () => {
    setSaving(true);
    setFormError('');
    try {
      const result = await adoptAnimal(modal.animal.id);
      setAnimals(prev => prev.map(a => a.id === result.id ? result : a));
      closeModal();
    } catch (err) {
      setFormError(err.message || 'Erro ao registrar adoção.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setFormError('');
    try {
      await deleteAnimal(modal.animal.id);
      setAnimals(prev => prev.filter(a => a.id !== modal.animal.id));
      closeModal();
    } catch (err) {
      setFormError(err.message || 'Erro ao remover animal.');
    } finally {
      setSaving(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.heading}>Animais</h1>
        <button className={styles.addBtn} onClick={openAdd}>
          <Plus size={18} />
          Adicionar animal
        </button>
      </div>

      {loading ? (
        <div className={styles.list}>
          {[1, 2, 3].map(i => <div key={i} className={styles.skeleton} />)}
        </div>
      ) : animals.length === 0 ? (
        <p className={styles.empty}>Nenhum animal cadastrado ainda.</p>
      ) : (
        <div className={styles.list}>
          {animals.map(animal => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onEdit={openEdit}
              onAdopt={openAdopt}
              onDelete={openDelete}
              onCreatePost={openCreatePost}
            />
          ))}
        </div>
      )}

      {/* ── Add / Edit modal ── */}
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <Modal
          title={modal.type === 'add' ? 'Novo animal' : 'Editar animal'}
          onClose={closeModal}
        >
          <form className={styles.form} onSubmit={handleSave}>
            <div className={styles.field}>
              <label className={styles.label}>Nome</label>
              <input
                className={styles.input}
                value={form.name}
                onChange={set('name')}
                placeholder="Ex: Luna"
                required
              />
            </div>

            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Espécie</label>
                <select className={styles.select} value={form.race} onChange={set('race')}>
                  {RACE_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Sexo</label>
                <select className={styles.select} value={form.gender} onChange={set('gender')}>
                  {GENDER_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Idade</label>
                <input
                  className={styles.input}
                  value={form.age}
                  onChange={set('age')}
                  placeholder="Ex: 5 meses"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Telefone de contato <span style={{ fontWeight: 400, opacity: 0.6 }}>(opcional)</span></label>
              <input
                className={styles.input}
                value={form.phoneNumber}
                onChange={set('phoneNumber')}
                placeholder="Ex: (88) 99999-9999"
                inputMode="tel"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Foto</label>
              <div className={styles.photoUpload}>
                {form.photoPreview && (
                  <img
                    src={form.photoPreview}
                    alt="Prévia"
                    className={styles.photoPreviewImg}
                  />
                )}
                <label className={styles.photoBtn}>
                  <Upload size={15} />
                  {form.photoPreview ? 'Trocar foto' : 'Enviar foto'}
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.photoInput}
                    onChange={handlePhotoChange}
                    required={modal.type === 'add'}
                  />
                </label>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tags</label>
              <TagSelect
                available={availableTags}
                selected={form.tags}
                onChange={handleTagsChange}
                onCreateTag={handleCreateTag}
              />
            </div>

            {formError && (
              <p style={{ color: '#c90008', fontSize: '0.83rem', margin: 0 }}>{formError}</p>
            )}

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={closeModal} disabled={saving}>
                Cancelar
              </button>
              <button type="submit" className={styles.saveBtn} disabled={saving}>
                {saving ? <Loader2 size={15} className={styles.spin} /> : null}
                Salvar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Adopt modal ── */}
      {modal?.type === 'adopt' && (
        <Modal title={`Registrar adoção — ${modal.animal.name}`} onClose={closeModal}>
          <div className={styles.deleteBody}>
            <p className={styles.deleteText}>
              Confirmar que <strong>{modal.animal.name}</strong> foi adotado?
              Esta ação marcará o animal como adotado no sistema.
            </p>
            {formError && (
              <p style={{ color: '#c90008', fontSize: '0.83rem', margin: 0 }}>{formError}</p>
            )}
            <div className={styles.formActions}>
              <button className={styles.cancelBtn} onClick={closeModal} disabled={saving}>Cancelar</button>
              <button className={styles.saveBtn} onClick={handleAdopt} disabled={saving}>
                {saving ? <Loader2 size={15} className={styles.spin} /> : null}
                Confirmar adoção
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Delete modal ── */}
      {modal?.type === 'delete' && (
        <Modal title="Remover animal" onClose={closeModal}>
          <div className={styles.deleteBody}>
            <p className={styles.deleteText}>
              Tem certeza que deseja remover <strong>{modal.animal.name}</strong>? Essa ação não pode ser desfeita.
            </p>
            {formError && (
              <p style={{ color: '#c90008', fontSize: '0.83rem', margin: 0 }}>{formError}</p>
            )}
            <div className={styles.formActions}>
              <button className={styles.cancelBtn} onClick={closeModal} disabled={saving}>Cancelar</button>
              <button className={styles.deleteBtn} onClick={handleDelete} disabled={saving}>
                {saving ? <Loader2 size={15} className={styles.spin} /> : null}
                Remover
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Create post modal ── */}
      {modal?.type === 'createPost' && (
        <CreatePostModal animal={modal.animal} onClose={closeModal} />
      )}
    </div>
  );
};

export default Animals;

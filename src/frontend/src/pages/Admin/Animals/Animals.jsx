import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Heart, X, Upload, ChevronDown } from 'lucide-react';
import { getAnimals } from '../../../services/animals';
import { getTags, createTag } from '../../../services/tags';
import styles from './Animals.module.css';

const STATUS_CONFIG = {
  disponivel:    { label: 'Disponível para adoção', color: '#9EB89C' },
  em_tratamento: { label: 'Em tratamento',          color: '#E8B86A' },
  adotado:       { label: 'Adotado',                color: '#7AACBF' },
};

const ANIMAL_TYPES = ['Cão', 'Gato', 'Outro'];

const EMPTY_FORM = {
  name: '', tipo: 'Cão', age: '',
  photoFile: null, photoPreview: '',
  tags: [],
  status: 'disponivel',
  adopterName: '', adopterContact: '', adoptionDate: '',
};

const today = () => new Date().toISOString().split('T')[0];

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
const TagSelect = ({ available, selected, onChange, onCreateTag }) => {
  const [open, setOpen] = useState(false);
  const [newTag, setNewTag] = useState('');
  const wrapRef = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const toggle = (tag) =>
    onChange(selected.includes(tag) ? selected.filter(t => t !== tag) : [...selected, tag]);

  const handleCreate = async () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    await onCreateTag(trimmed);
    if (!selected.includes(trimmed)) onChange([...selected, trimmed]);
    setNewTag('');
  };

  return (
    <div className={styles.tagSelectWrap} ref={wrapRef}>
      <div className={styles.selectedChips}>
        {selected.map(tag => (
          <span key={tag} className={styles.chip}>
            {tag}
            <button
              type="button"
              className={styles.chipRemove}
              onClick={() => toggle(tag)}
              aria-label={`Remover ${tag}`}
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
              <label key={tag} className={styles.tagOption}>
                <input
                  type="checkbox"
                  checked={selected.includes(tag)}
                  onChange={() => toggle(tag)}
                />
                {tag}
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
const AnimalCard = ({ animal, onEdit, onAdopt, onDelete }) => {
  const status = STATUS_CONFIG[animal.status];

  return (
    <div className={styles.card}>
      {animal.photo && (
        <img src={animal.photo} alt={animal.name} className={styles.cardPhoto} />
      )}
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <div>
            <p className={styles.cardName}>{animal.name}</p>
            <p className={styles.cardAge}>
              {animal.tipo && <span className={styles.cardTipo}>{animal.tipo}</span>}
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
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}

        {animal.status === 'adotado' && animal.adopter && (
          <p className={styles.adopterInfo}>
            Adotado por <strong>{animal.adopter.name}</strong>
            {animal.adopter.date && ` em ${new Date(animal.adopter.date).toLocaleDateString('pt-BR')}`}
          </p>
        )}

        <div className={styles.cardActions}>
          <button className={styles.actionBtn} onClick={() => onEdit(animal)} aria-label="Editar">
            <Pencil size={15} />
            Editar
          </button>
          {animal.status !== 'adotado' && (
            <button
              className={`${styles.actionBtn} ${styles.actionAdopt}`}
              onClick={() => onAdopt(animal)}
              aria-label="Registrar adoção"
            >
              <Heart size={15} />
              Registrar adoção
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
  const [animals, setAnimals] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    Promise.all([getAnimals(), getTags()]).then(([data, tags]) => {
      setAnimals(data);
      setAvailableTags(tags);
      setLoading(false);
    });
  }, []);

  const closeModal = () => setModal(null);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setModal({ type: 'add' });
  };

  const openEdit = (animal) => {
    setForm({
      name: animal.name,
      tipo: animal.tipo ?? 'Cão',
      age: animal.age,
      photoFile: null,
      photoPreview: animal.photo ?? '',
      tags: animal.tags ?? [],
      status: animal.status,
      adopterName: animal.adopter?.name ?? '',
      adopterContact: animal.adopter?.contact ?? '',
      adoptionDate: animal.adopter?.date ?? '',
    });
    setModal({ type: 'edit', animal });
  };

  const openAdopt = (animal) => {
    setForm({ ...EMPTY_FORM, adoptionDate: today() });
    setModal({ type: 'adopt', animal });
  };

  const openDelete = (animal) => setModal({ type: 'delete', animal });

  const set = (field) => (e) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(prev => ({
      ...prev,
      photoFile: file,
      photoPreview: URL.createObjectURL(file),
    }));
  };

  const handleTagsChange = (tags) =>
    setForm(prev => ({ ...prev, tags }));

  const handleCreateTag = async (label) => {
    await createTag(label);
    setAvailableTags(prev => prev.includes(label) ? prev : [...prev, label]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const adopter = form.status === 'adotado' && form.adopterName
      ? { name: form.adopterName, contact: form.adopterContact, date: form.adoptionDate }
      : undefined;

    const updated = {
      name: form.name,
      tipo: form.tipo,
      age: form.age,
      photo: form.photoPreview,
      tags: form.tags,
      status: form.status,
      adopter,
    };

    if (modal.type === 'add') {
      setAnimals(prev => [...prev, { id: Date.now(), ...updated }]);
    } else {
      setAnimals(prev => prev.map(a =>
        a.id === modal.animal.id ? { ...a, ...updated } : a
      ));
    }
    closeModal();
  };

  const handleAdopt = (e) => {
    e.preventDefault();
    setAnimals(prev => prev.map(a =>
      a.id === modal.animal.id
        ? { ...a, status: 'adotado', adopter: { name: form.adopterName, contact: form.adopterContact, date: form.adoptionDate } }
        : a
    ));
    closeModal();
  };

  const handleDelete = () => {
    setAnimals(prev => prev.filter(a => a.id !== modal.animal.id));
    closeModal();
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
                <label className={styles.label}>Tipo</label>
                <select className={styles.select} value={form.tipo} onChange={set('tipo')}>
                  {ANIMAL_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
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

            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <select className={styles.select} value={form.status} onChange={set('status')}>
                <option value="disponivel">Disponível para adoção</option>
                <option value="em_tratamento">Em tratamento</option>
                <option value="adotado">Adotado</option>
              </select>
            </div>

            {form.status === 'adotado' && (
              <div className={styles.adopterSection}>
                <p className={styles.adopterLabel}>Informações da adoção</p>
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label className={styles.label}>Nome do adotante</label>
                    <input
                      className={styles.input}
                      value={form.adopterName}
                      onChange={set('adopterName')}
                      placeholder="Ex: Maria Silva"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Contato</label>
                    <input
                      className={styles.input}
                      value={form.adopterContact}
                      onChange={set('adopterContact')}
                      placeholder="Telefone ou email"
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Data da adoção</label>
                  <input
                    className={styles.input}
                    type="date"
                    value={form.adoptionDate}
                    onChange={set('adoptionDate')}
                  />
                </div>
              </div>
            )}

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit" className={styles.saveBtn}>Salvar</button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Adopt modal ── */}
      {modal?.type === 'adopt' && (
        <Modal title={`Registrar adoção — ${modal.animal.name}`} onClose={closeModal}>
          <form className={styles.form} onSubmit={handleAdopt}>
            <div className={styles.field}>
              <label className={styles.label}>Nome do adotante</label>
              <input
                className={styles.input}
                value={form.adopterName}
                onChange={set('adopterName')}
                placeholder="Ex: Maria Silva"
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Contato</label>
              <input
                className={styles.input}
                value={form.adopterContact}
                onChange={set('adopterContact')}
                placeholder="Telefone ou email"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Data da adoção</label>
              <input
                className={styles.input}
                type="date"
                value={form.adoptionDate}
                onChange={set('adoptionDate')}
              />
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit" className={styles.saveBtn}>Confirmar adoção</button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Delete modal ── */}
      {modal?.type === 'delete' && (
        <Modal title="Remover animal" onClose={closeModal}>
          <div className={styles.deleteBody}>
            <p className={styles.deleteText}>
              Tem certeza que deseja remover <strong>{modal.animal.name}</strong>? Essa ação não pode ser desfeita.
            </p>
            <div className={styles.formActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>Cancelar</button>
              <button className={styles.deleteBtn} onClick={handleDelete}>Remover</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Animals;

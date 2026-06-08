import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, AlertTriangle } from 'lucide-react';
import {
  INVENTORY_CATEGORIES, INVENTORY_CATEGORY_COLORS, UNITS,
  getInventory, addItem, updateItem, deleteItem,
} from '../../../services/inventory';
import styles from './Inventory.module.css';

const EMPTY_FORM = { name: '', category: 'medicamentos', quantity: '', unit: 'unidade', expiry: '' };

const fmtDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR');

const isExpiringSoon = (expiry) => {
  if (!expiry) return false;
  const diff = (new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 30;
};

const isExpired = (expiry) => {
  if (!expiry) return false;
  return new Date(expiry) < new Date();
};

// ── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.modal} onClick={e => e.stopPropagation()}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar"><X size={20} /></button>
      </div>
      {children}
    </div>
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
const Inventory = () => {
  const [items,   setItems]  = useState([]);
  const [loading, setLoading]= useState(true);
  const [modal,   setModal]  = useState(null);
  const [form,    setForm]   = useState(EMPTY_FORM);
  const [saving,  setSaving] = useState(false);

  useEffect(() => {
    getInventory().then(data => { setItems(data); setLoading(false); });
  }, []);

  const closeModal = () => { setModal(null); setSaving(false); };

  const openAdd  = ()     => { setForm(EMPTY_FORM); setModal({ type: 'add' }); };
  const openEdit = (item) => {
    setForm({ name: item.name, category: item.category, quantity: String(item.quantity), unit: item.unit, expiry: item.expiry ?? '' });
    setModal({ type: 'edit', item });
  };
  const openDelete = (item) => setModal({ type: 'delete', item });

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = { ...form, quantity: parseInt(form.quantity, 10) || 0, expiry: form.expiry || null };
    if (modal.type === 'add') {
      const entry = await addItem(data);
      setItems(prev => [...prev, entry]);
    } else {
      await updateItem(modal.item.id, data);
      setItems(prev => prev.map(i => i.id === modal.item.id ? { ...i, ...data } : i));
    }
    closeModal();
  };

  const handleDelete = async () => {
    setSaving(true);
    await deleteItem(modal.item.id);
    setItems(prev => prev.filter(i => i.id !== modal.item.id));
    closeModal();
  };

  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.heading}>Estoque</h1>
        <button className={styles.addBtn} onClick={openAdd}>
          <Plus size={18} /> Adicionar item
        </button>
      </div>

      {loading ? (
        <div className={styles.list}>{[1,2,3].map(i => <div key={i} className={styles.skeleton} />)}</div>
      ) : items.length === 0 ? (
        <p className={styles.empty}>Nenhum item no estoque.</p>
      ) : (
        <div className={styles.list}>
          {sorted.map(item => {
            const expired   = isExpired(item.expiry);
            const expiring  = isExpiringSoon(item.expiry);
            return (
              <div key={item.id} className={`${styles.card} ${expired ? styles.cardExpired : ''}`}>
                <span
                  className={styles.categoryBadge}
                  style={{ background: INVENTORY_CATEGORY_COLORS[item.category] ?? '#ccc' }}
                >
                  {INVENTORY_CATEGORIES[item.category] ?? item.category}
                </span>

                <div className={styles.cardBody}>
                  <p className={styles.itemName}>{item.name}</p>
                  {item.expiry && (
                    <p className={`${styles.expiry} ${expired ? styles.expiryExpired : expiring ? styles.expiryWarning : ''}`}>
                      {expired && <AlertTriangle size={12} />}
                      {expiring && !expired && <AlertTriangle size={12} />}
                      Validade: {fmtDate(item.expiry)}
                      {expired  && ' — Vencido'}
                      {expiring && !expired && ' — Vence em breve'}
                    </p>
                  )}
                </div>

                <div className={styles.cardRight}>
                  <span className={styles.qty}>
                    <strong>{item.quantity}</strong>
                    <span className={styles.unit}>{item.unit}</span>
                  </span>
                  <div className={styles.cardActions}>
                    <button className={styles.actionBtn} onClick={() => openEdit(item)} aria-label="Editar"><Pencil size={15} /></button>
                    <button className={`${styles.actionBtn} ${styles.actionDelete}`} onClick={() => openDelete(item)} aria-label="Remover"><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Add / Edit modal ── */}
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <Modal title={modal.type === 'add' ? 'Novo item' : 'Editar item'} onClose={closeModal}>
          <form className={styles.form} onSubmit={handleSave}>
            <div className={styles.field}>
              <label className={styles.label}>Nome do item</label>
              <input className={styles.input} value={form.name} onChange={set('name')} placeholder="Ex: Vermífugo Drontal" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Categoria</label>
              <select className={styles.select} value={form.category} onChange={set('category')}>
                {Object.entries(INVENTORY_CATEGORIES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Quantidade</label>
                <input className={styles.input} value={form.quantity} onChange={set('quantity')} type="number" min="0" placeholder="0" required />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Unidade</label>
                <select className={styles.select} value={form.unit} onChange={set('unit')}>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Validade <span className={styles.hint}>(opcional)</span></label>
              <input className={styles.input} value={form.expiry} onChange={set('expiry')} type="date" />
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancelar</button>
              <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Delete modal ── */}
      {modal?.type === 'delete' && (
        <Modal title="Remover item" onClose={closeModal}>
          <div className={styles.deleteBody}>
            <p className={styles.deleteText}>Remover <strong>{modal.item.name}</strong> do estoque? Essa ação não pode ser desfeita.</p>
            <div className={styles.formActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>Cancelar</button>
              <button className={styles.deleteBtn} onClick={handleDelete} disabled={saving}>{saving ? 'Removendo...' : 'Remover'}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Inventory;

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Clock } from 'lucide-react';
import {
  EVENT_CATEGORIES, EVENT_CATEGORY_COLORS,
  getEvents, addEvent, updateEvent, deleteEvent,
} from '../../../services/calendarEvents';
import styles from './CalendarPage.module.css';

const EMPTY_FORM = { title: '', category: 'evento', date: '', notes: '' };

const todayStr = new Date().toISOString().split('T')[0];

const fmtDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', {
  weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
});

const daysLabel = (dateStr) => {
  const diff = Math.round((new Date(`${dateStr}T00:00:00`) - new Date(todayStr)) / 86400000);
  if (diff === 0) return { text: 'Hoje', className: 'today' };
  if (diff === 1) return { text: 'Amanhã', className: 'soon' };
  if (diff < 0)  return { text: `Há ${Math.abs(diff)} dia${Math.abs(diff) > 1 ? 's' : ''}`, className: 'past' };
  if (diff <= 7) return { text: `Em ${diff} dias`, className: 'soon' };
  return { text: `Em ${diff} dias`, className: 'future' };
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
const CalendarPage = () => {
  useEffect(() => {
    document.title = 'Calendário | ONG Coração Valente';
  }, []);

  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(null);
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    getEvents().then(data => { setEvents(data); setLoading(false); });
  }, []);

  const closeModal = () => { setModal(null); setSaving(false); };
  const openAdd    = ()      => { setForm(EMPTY_FORM); setModal({ type: 'add' }); };
  const openEdit   = (event) => {
    setForm({ title: event.title, category: event.category, date: event.date, notes: event.notes ?? '' });
    setModal({ type: 'edit', event });
  };
  const openDelete = (event) => setModal({ type: 'delete', event });

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (modal.type === 'add') {
      const entry = await addEvent(form);
      setEvents(prev => [...prev, entry]);
    } else {
      await updateEvent(modal.event.id, form);
      setEvents(prev => prev.map(ev => ev.id === modal.event.id ? { ...ev, ...form } : ev));
    }
    closeModal();
  };

  const handleDelete = async () => {
    setSaving(true);
    await deleteEvent(modal.event.id);
    setEvents(prev => prev.filter(ev => ev.id !== modal.event.id));
    closeModal();
  };

  const upcoming = [...events].filter(e => e.date >= todayStr).sort((a, b) => a.date.localeCompare(b.date));
  const past     = [...events].filter(e => e.date < todayStr).sort((a, b) => b.date.localeCompare(a.date));

  const EventCard = ({ event }) => {
    const { text, className } = daysLabel(event.date);
    return (
      <div className={`${styles.card} ${event.date < todayStr ? styles.cardPast : ''}`}>
        <div className={styles.cardLeft}>
          <span
            className={styles.categoryDot}
            style={{ background: EVENT_CATEGORY_COLORS[event.category] ?? '#ccc' }}
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardTop}>
            <p className={styles.eventTitle}>{event.title}</p>
            <span className={`${styles.daysChip} ${styles[className]}`}>{text}</span>
          </div>
          <p className={styles.eventDate}>
            <Clock size={12} />
            {fmtDate(event.date)}
            <span className={styles.catLabel}>{EVENT_CATEGORIES[event.category]}</span>
          </p>
          {event.notes && <p className={styles.notes}>{event.notes}</p>}
        </div>
        <div className={styles.cardActions}>
          <button className={styles.actionBtn} onClick={() => openEdit(event)} aria-label="Editar"><Pencil size={15} /></button>
          <button className={`${styles.actionBtn} ${styles.actionDelete}`} onClick={() => openDelete(event)} aria-label="Remover"><Trash2 size={15} /></button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.heading}>Calendário</h1>
        <button className={styles.addBtn} onClick={openAdd}>
          <Plus size={18} /> Novo lembrete
        </button>
      </div>

      {loading ? (
        <div className={styles.list}>{[1,2,3].map(i => <div key={i} className={styles.skeleton} />)}</div>
      ) : events.length === 0 ? (
        <p className={styles.empty}>Nenhum lembrete cadastrado.</p>
      ) : (
        <>
          {upcoming.length > 0 && (
            <section>
              <h2 className={styles.sectionLabel}>Próximos</h2>
              <div className={styles.list}>
                {upcoming.map(ev => <EventCard key={ev.id} event={ev} />)}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className={styles.sectionLabel}>Passados</h2>
              <div className={styles.list}>
                {past.map(ev => <EventCard key={ev.id} event={ev} />)}
              </div>
            </section>
          )}
        </>
      )}

      {/* ── Add / Edit modal ── */}
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <Modal title={modal.type === 'add' ? 'Novo lembrete' : 'Editar lembrete'} onClose={closeModal}>
          <form className={styles.form} onSubmit={handleSave}>
            <div className={styles.field}>
              <label className={styles.label}>Título</label>
              <input className={styles.input} value={form.title} onChange={set('title')} placeholder="Ex: Campanha antirrábica" required />
            </div>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Categoria</label>
                <select className={styles.select} value={form.category} onChange={set('category')}>
                  {Object.entries(EVENT_CATEGORIES).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Data</label>
                <input className={styles.input} value={form.date} onChange={set('date')} type="date" required />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Observações <span className={styles.hint}>(opcional)</span></label>
              <textarea className={styles.textarea} value={form.notes} onChange={set('notes')} placeholder="Detalhes, local, horário..." rows={3} />
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
        <Modal title="Remover lembrete" onClose={closeModal}>
          <div className={styles.deleteBody}>
            <p className={styles.deleteText}>Remover <strong>"{modal.event.title}"</strong>? Essa ação não pode ser desfeita.</p>
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

export default CalendarPage;

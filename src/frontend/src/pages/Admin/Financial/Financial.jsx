import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  EXPENSE_CATEGORIES, EXPENSE_COLORS,
  getExpenses, addExpense, updateExpense, deleteExpense,
  DONATION_TYPES, DONATION_TYPE_COLORS,
  getDonations, addDonation, updateDonation, deleteDonation,
} from '../../../services/donations';
import { getOngInfo } from '../../../services/ong';
import styles from './Financial.module.css';

const today = () => new Date().toISOString().split('T')[0];

const fmt = (value) =>
  Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const fmtDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR');

const EMPTY_EXPENSE  = { category: 'alimentacao', description: '', value: '', date: today() };
const EMPTY_DONATION = { donor: '', type: 'dinheiro', description: '', value: '', date: today() };

// ── PDF ─────────────────────────────────────────────────────────────────────
const buildPDF = (expenses, ong) => {
  const doc   = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const total = expenses.reduce((acc, e) => acc + e.value, 0);

  doc.setFillColor(201, 0, 8);
  doc.rect(0, 0, pageW, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Extrato de Gastos', 14, 10);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Gerado em ${new Date().toLocaleDateString('pt-BR')}`, 14, 17);

  let y = 32;
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(ong?.name ?? 'ONG', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  if (ong?.cnpj) {
    doc.setFont('helvetica', 'bold'); doc.text('CNPJ:', 14, y);
    doc.setFont('helvetica', 'normal'); doc.text(ong.cnpj, 30, y); y += 4.5;
  }
  if (ong?.responsibleName) {
    doc.setFont('helvetica', 'bold'); doc.text('Responsável:', 14, y);
    doc.setFont('helvetica', 'normal'); doc.text(ong.responsibleName, 40, y); y += 4.5;
  }

  const addressParts = [ong?.address, ong?.number, ong?.neighborhood,
    ong?.city && ong?.state ? `${ong.city} — ${ong.state}` : (ong?.city || ong?.state), ong?.cep,
  ].filter(Boolean);
  if (addressParts.length > 0) {
    doc.setFont('helvetica', 'bold'); doc.text('Endereço:', 14, y);
    doc.setFont('helvetica', 'normal'); doc.text(addressParts.join(', '), 36, y); y += 4.5;
  }

  const contactParts = [];
  if (ong?.instagramHandle) contactParts.push(`Instagram: ${ong.instagramHandle}`);
  if (contactParts.length > 0) {
    doc.setFont('helvetica', 'bold'); doc.text('Contato:', 14, y);
    doc.setFont('helvetica', 'normal'); doc.text(contactParts.join('   '), 32, y); y += 4.5;
  }

  y += 3;
  doc.setDrawColor(220, 220, 220);
  doc.line(14, y, pageW - 14, y);
  y += 5;

  autoTable(doc, {
    startY: y,
    margin: { left: 14, right: 14 },
    head: [['Data', 'Categoria', 'Descrição', 'Valor (R$)']],
    body: expenses.map(e => [fmtDate(e.date), EXPENSE_CATEGORIES[e.category] ?? e.category, e.description || '—', fmt(e.value)]),
    foot: [['', '', 'Total', fmt(total)]],
    theme: 'striped',
    headStyles:          { fillColor: [201, 0, 8], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    footStyles:          { fillColor: [248, 246, 242], textColor: [30, 30, 30], fontStyle: 'bold', fontSize: 9 },
    bodyStyles:          { fontSize: 9, textColor: [60, 60, 60] },
    alternateRowStyles:  { fillColor: [252, 251, 249] },
    columnStyles: { 0: { cellWidth: 24 }, 1: { cellWidth: 42 }, 2: { cellWidth: 80 }, 3: { cellWidth: 34, halign: 'right' } },
    showFoot: 'lastPage',
  });

  const pages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8); doc.setTextColor(180);
    doc.text(`Página ${i} de ${pages}`, pageW - 14, doc.internal.pageSize.getHeight() - 8, { align: 'right' });
  }
  doc.save(`extrato-gastos-${new Date().toISOString().split('T')[0]}.pdf`);
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
const Financial = () => {
  useEffect(() => {
    document.title = 'Financeiro | ONG Coração Valente';
  }, []);

  const [tab,       setTab]      = useState('gastos');
  const [expenses,  setExpenses] = useState([]);
  const [donations, setDonations]= useState([]);
  const [ongInfo,   setOngInfo]  = useState(null);
  const [loading,   setLoading]  = useState(true);
  const [modal,     setModal]    = useState(null);
  const [form,      setForm]     = useState(EMPTY_EXPENSE);
  const [saving,    setSaving]   = useState(false);

  useEffect(() => {
    Promise.all([getExpenses(), getDonations(), getOngInfo()]).then(([exp, don, ong]) => {
      setExpenses(exp);
      setDonations(don);
      setOngInfo(ong);
      setLoading(false);
    });
  }, []);

  const closeModal = () => { setModal(null); setSaving(false); };

  const openAdd = () => {
    setForm(tab === 'gastos' ? EMPTY_EXPENSE : EMPTY_DONATION);
    setModal({ type: 'add' });
  };
  const openEdit = (item) => {
    setForm({
      ...(tab === 'gastos'
        ? { category: item.category, description: item.description, value: String(item.value), date: item.date }
        : { donor: item.donor, type: item.type, description: item.description, value: String(item.value), date: item.date }
      ),
    });
    setModal({ type: 'edit', item });
  };
  const openDelete = (item) => setModal({ type: 'delete', item });

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = { ...form, value: parseFloat(form.value) || 0 };

    if (tab === 'gastos') {
      if (modal.type === 'add') {
        const entry = await addExpense(data);
        setExpenses(prev => [entry, ...prev]);
      } else {
        await updateExpense(modal.item.id, data);
        setExpenses(prev => prev.map(ex => ex.id === modal.item.id ? { ...ex, ...data } : ex));
      }
    } else {
      if (modal.type === 'add') {
        const entry = await addDonation(data);
        setDonations(prev => [entry, ...prev]);
      } else {
        await updateDonation(modal.item.id, data);
        setDonations(prev => prev.map(d => d.id === modal.item.id ? { ...d, ...data } : d));
      }
    }
    closeModal();
  };

  const handleDelete = async () => {
    setSaving(true);
    if (tab === 'gastos') {
      await deleteExpense(modal.item.id);
      setExpenses(prev => prev.filter(ex => ex.id !== modal.item.id));
    } else {
      await deleteDonation(modal.item.id);
      setDonations(prev => prev.filter(d => d.id !== modal.item.id));
    }
    closeModal();
  };

  const totalExpenses  = expenses.reduce((acc, e) => acc + e.value, 0);
  const totalDonations = donations.reduce((acc, d) => acc + d.value, 0);
  const isGastos = tab === 'gastos';
  const items = isGastos ? expenses : donations;
  const total = isGastos ? totalExpenses : totalDonations;

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <div className={styles.pageHeader}>
        <h1 className={styles.heading}>Financeiro</h1>
        <div className={styles.headerActions}>
          {isGastos && (
            <button
              type="button"
              className={styles.downloadBtn}
              onClick={() => buildPDF(expenses, ongInfo)}
              disabled={loading || expenses.length === 0}
            >
              <FileDown size={17} />
              Baixar extrato
            </button>
          )}
          <button className={styles.addBtn} onClick={openAdd}>
            <Plus size={18} />
            {isGastos ? 'Adicionar gasto' : 'Registrar doação'}
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${isGastos ? styles.tabActive : ''}`}
          onClick={() => setTab('gastos')}
        >
          Gastos
        </button>
        <button
          className={`${styles.tab} ${!isGastos ? styles.tabActive : ''}`}
          onClick={() => setTab('doacoes')}
        >
          Doações recebidas
        </button>
      </div>

      {/* ── Summary ── */}
      <div className={styles.summary}>
        <span className={styles.summaryLabel}>
          {isGastos ? 'Total de gastos' : 'Total recebido em doações'}
        </span>
        <span className={styles.summaryValue}>{fmt(total)}</span>
      </div>

      {/* ── List ── */}
      {loading ? (
        <div className={styles.list}>
          {[1, 2, 3].map(i => <div key={i} className={styles.skeleton} />)}
        </div>
      ) : items.length === 0 ? (
        <p className={styles.empty}>
          {isGastos ? 'Nenhum gasto registrado ainda.' : 'Nenhuma doação registrada ainda.'}
        </p>
      ) : (
        <div className={styles.list}>
          {items.map(item => (
            <div key={item.id} className={styles.card}>
              <span
                className={styles.categoryBadge}
                style={{
                  background: isGastos
                    ? (EXPENSE_COLORS[item.category] ?? '#ccc')
                    : (DONATION_TYPE_COLORS[item.type] ?? '#ccc'),
                }}
              >
                {isGastos
                  ? (EXPENSE_CATEGORIES[item.category] ?? item.category)
                  : (DONATION_TYPES[item.type] ?? item.type)
                }
              </span>

              <div className={styles.cardBody}>
                <p className={styles.description}>
                  {isGastos ? (item.description || '—') : item.donor}
                </p>
                {!isGastos && item.description && (
                  <p className={styles.subDescription}>{item.description}</p>
                )}
                <p className={styles.cardDate}>{fmtDate(item.date)}</p>
              </div>

              <div className={styles.cardRight}>
                <span className={styles.value}>{fmt(item.value)}</span>
                <div className={styles.cardActions}>
                  <button className={styles.actionBtn} onClick={() => openEdit(item)} aria-label="Editar">
                    <Pencil size={15} />
                  </button>
                  <button className={`${styles.actionBtn} ${styles.actionDelete}`} onClick={() => openDelete(item)} aria-label="Remover">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit modal ── */}
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <Modal title={modal.type === 'add' ? (isGastos ? 'Novo gasto' : 'Registrar doação') : (isGastos ? 'Editar gasto' : 'Editar doação')} onClose={closeModal}>
          <form className={styles.form} onSubmit={handleSave}>
            {isGastos ? (
              <div className={styles.field}>
                <label className={styles.label}>Categoria</label>
                <select className={styles.select} value={form.category} onChange={set('category')}>
                  {Object.entries(EXPENSE_CATEGORIES).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            ) : (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>Doador / Empresa</label>
                  <input className={styles.input} value={form.donor} onChange={set('donor')} placeholder="Ex: Petshop Tianguá" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Tipo</label>
                  <select className={styles.select} value={form.type} onChange={set('type')}>
                    {Object.entries(DONATION_TYPES).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className={styles.field}>
              <label className={styles.label}>Descrição <span className={styles.hint}>(opcional)</span></label>
              <input
                className={styles.input}
                value={form.description}
                onChange={set('description')}
                placeholder={isGastos ? 'Ex: Campanha castramóvel — junho' : 'Ex: Ração e medicamentos'}
              />
            </div>

            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Valor (R$)</label>
                <input className={styles.input} value={form.value} onChange={set('value')} type="number" min="0" step="0.01" placeholder="0,00" required />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Data</label>
                <input className={styles.input} value={form.date} onChange={set('date')} type="date" required />
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancelar</button>
              <button type="submit" className={styles.saveBtn} disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── Delete modal ── */}
      {modal?.type === 'delete' && (
        <Modal title={isGastos ? 'Remover gasto' : 'Remover doação'} onClose={closeModal}>
          <div className={styles.deleteBody}>
            <p className={styles.deleteText}>
              Tem certeza? Essa ação não pode ser desfeita.
            </p>
            <div className={styles.formActions}>
              <button className={styles.cancelBtn} onClick={closeModal}>Cancelar</button>
              <button className={styles.deleteBtn} onClick={handleDelete} disabled={saving}>
                {saving ? 'Removendo...' : 'Remover'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Financial;

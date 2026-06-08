import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Users, HandCoins, Cat, Wallet, Building2, Package, CalendarDays, FolderOpen, ChevronRight } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ONG_INFO } from '../../../services/ong';
import { getAnimals } from '../../../services/animals';
import { getExpenseBreakdown } from '../../../services/donations';
import styles from './Dashboard.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const EXPENSE_COLORS = {
  food:    '#E8B86A',
  vet:     '#7AACBF',
  vaccine: '#9EB89C',
  shelter: '#C4A8A0',
};

const STATUS_META = {
  disponivel:    { label: 'Disponíveis',    color: '#9EB89C' },
  adotado:       { label: 'Adotados',       color: '#7AACBF' },
  em_tratamento: { label: 'Em tratamento',  color: '#E8B86A' },
};

const DOUGHNUT_OPTIONS = {
  cutout: '70%',
  plugins: { legend: { display: false } },
  maintainAspectRatio: true,
};

const Dashboard = () => {
  const [animals, setAnimals]   = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getAnimals().then(setAnimals);
    getExpenseBreakdown().then(setExpenses);
  }, []);

  const totalArrecadado = expenses.reduce((acc, e) => acc + e.value, 0);

  const statusGroups = animals.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const expenseChart = {
    labels: expenses.map(e => e.title),
    datasets: [{
      data: expenses.map(e => e.value),
      backgroundColor: expenses.map(e => EXPENSE_COLORS[e.id] ?? '#ccc'),
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  const animalChart = {
    labels: Object.keys(statusGroups).map(k => STATUS_META[k]?.label ?? k),
    datasets: [{
      data: Object.values(statusGroups),
      backgroundColor: Object.keys(statusGroups).map(k => STATUS_META[k]?.color ?? '#ccc'),
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Painel</h1>

      <div className={styles.quickActions}>
        <Link to="/admin/painel/animais" className={styles.quickAction}>
          <Cat size={18} aria-hidden="true" />
          <span>Animais</span>
          <ChevronRight size={16} className={styles.quickArrow} aria-hidden="true" />
        </Link>
        <Link to="/admin/painel/financeiro" className={styles.quickAction}>
          <Wallet size={18} aria-hidden="true" />
          <span>Financeiro</span>
          <ChevronRight size={16} className={styles.quickArrow} aria-hidden="true" />
        </Link>
        <Link to="/admin/painel/estoque" className={styles.quickAction}>
          <Package size={18} aria-hidden="true" />
          <span>Estoque</span>
          <ChevronRight size={16} className={styles.quickArrow} aria-hidden="true" />
        </Link>
        <Link to="/admin/painel/calendario" className={styles.quickAction}>
          <CalendarDays size={18} aria-hidden="true" />
          <span>Calendário</span>
          <ChevronRight size={16} className={styles.quickArrow} aria-hidden="true" />
        </Link>
        <Link to="/admin/painel/documentos" className={styles.quickAction}>
          <FolderOpen size={18} aria-hidden="true" />
          <span>Documentos</span>
          <ChevronRight size={16} className={styles.quickArrow} aria-hidden="true" />
        </Link>
        <Link to="/admin/painel/ong" className={styles.quickAction}>
          <Building2 size={18} aria-hidden="true" />
          <span>Informações da ONG</span>
          <ChevronRight size={16} className={styles.quickArrow} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <PawPrint size={20} className={styles.metricIcon} aria-hidden="true" />
          <span className={styles.metricValue}>{animals.length}</span>
          <span className={styles.metricLabel}>Animais cadastrados</span>
        </div>
        <div className={styles.metricCard}>
          <Users size={20} className={styles.metricIcon} aria-hidden="true" />
          <span className={styles.metricValue}>{ONG_INFO.volunteers}</span>
          <span className={styles.metricLabel}>Voluntários</span>
        </div>
        <div className={styles.metricCard}>
          <HandCoins size={20} className={styles.metricIcon} aria-hidden="true" />
          <span className={styles.metricValue}>
            {totalArrecadado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span className={styles.metricLabel}>Total arrecadado</span>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Destino das doações</h2>
          <div className={styles.chartWrap}>
            {expenses.length > 0 && <Doughnut data={expenseChart} options={DOUGHNUT_OPTIONS} />}
          </div>
          <ul className={styles.legend}>
            {expenses.map(e => (
              <li key={e.id} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: EXPENSE_COLORS[e.id] }} />
                <span className={styles.legendLabel}>{e.title}</span>
                <span className={styles.legendValue}>
                  {totalArrecadado > 0
                    ? `${Math.round((e.value / totalArrecadado) * 100)}%`
                    : '—'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Status dos animais</h2>
          <div className={styles.chartWrap}>
            {animals.length > 0 && <Doughnut data={animalChart} options={DOUGHNUT_OPTIONS} />}
          </div>
          <ul className={styles.legend}>
            {Object.entries(statusGroups).map(([status, count]) => (
              <li key={status} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: STATUS_META[status]?.color }} />
                <span className={styles.legendLabel}>{STATUS_META[status]?.label}</span>
                <span className={styles.legendValue}>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, CalendarDays, HandCoins } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getAnimals } from '../../../services/animals';
import { getExpenseBreakdown, EXPENSE_COLORS } from '../../../services/donations';
import { getEvents } from '../../../services/calendarEvents';
import styles from './Dashboard.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const [events, setEvents]     = useState([]);

  useEffect(() => {
    document.title = 'Painel | ONG Coração Valente';
  }, []);

  useEffect(() => {
    getAnimals().then(setAnimals);
    getExpenseBreakdown().then(setExpenses);
    getEvents().then(setEvents).catch(() => {});
  }, []);

  const totalArrecadado = expenses.reduce((acc, e) => acc + e.value, 0);
  const today = new Date().toISOString().split('T')[0];
  const upcomingCount = events.filter(ev => ev.date >= today).length;

  const statusGroups = animals.reduce((acc, a) => {
    const key = a.isAdopted ? 'adotado' : 'disponivel';
    acc[key] = (acc[key] || 0) + 1;
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

      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <PawPrint size={20} className={styles.metricIcon} aria-hidden="true" />
          <span className={styles.metricValue}>{animals.length}</span>
          <span className={styles.metricLabel}>Animais cadastrados</span>
        </div>
        <div className={styles.metricCard}>
          <CalendarDays size={20} className={styles.metricIcon} aria-hidden="true" />
          <span className={styles.metricValue}>{upcomingCount}</span>
          <span className={styles.metricLabel}>Próximos eventos</span>
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
          {expenses.length > 0 ? (
            <>
              <div className={styles.chartWrap}>
                <Doughnut data={expenseChart} options={DOUGHNUT_OPTIONS} />
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
            </>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyMsg}>Nenhum dado financeiro registrado ainda.</p>
              <Link to="/admin/painel/financeiro" className={styles.emptyLink}>
                Preencher dados financeiros →
              </Link>
            </div>
          )}
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Status dos animais</h2>
          {animals.length > 0 ? (
            <>
              <div className={styles.chartWrap}>
                <Doughnut data={animalChart} options={DOUGHNUT_OPTIONS} />
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
            </>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyMsg}>Nenhum animal cadastrado ainda.</p>
              <Link to="/admin/painel/animais" className={styles.emptyLink}>
                Cadastrar animais →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

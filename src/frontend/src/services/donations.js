// ── Doações recebidas ────────────────────────────────────────────────────────

export const DONATION_TYPES = {
  dinheiro: 'Dinheiro',
  itens:    'Itens',
  servico:  'Serviço',
};

export const DONATION_TYPE_COLORS = {
  dinheiro: '#9EB89C',
  itens:    '#E8B86A',
  servico:  '#7AACBF',
};

let _mockDonations = [
  { id: 1, donor: 'Petshop Tianguá',    type: 'itens',    description: 'Ração e medicamentos',           value: 500.00,  date: '2026-05-20' },
  { id: 2, donor: 'Farmácia Central',   type: 'dinheiro', description: 'Apoio à campanha castramóvel',   value: 1000.00, date: '2026-06-01' },
  { id: 3, donor: 'Clínica VetLife',    type: 'servico',  description: 'Consultas e vacinas gratuitas',  value: 350.00,  date: '2026-06-05' },
];

export async function getDonations() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [..._mockDonations].sort((a, b) => b.date.localeCompare(a.date));
}

export async function addDonation(d) {
  await new Promise(resolve => setTimeout(resolve, 300));
  const entry = { ...d, id: Date.now() };
  _mockDonations.push(entry);
  return entry;
}

export async function updateDonation(id, d) {
  await new Promise(resolve => setTimeout(resolve, 300));
  _mockDonations = _mockDonations.map(e => e.id === id ? { ...e, ...d } : e);
  return _mockDonations.find(e => e.id === id);
}

export async function deleteDonation(id) {
  await new Promise(resolve => setTimeout(resolve, 300));
  _mockDonations = _mockDonations.filter(e => e.id !== id);
}

// ── Gastos ───────────────────────────────────────────────────────────────────

export const EXPENSE_CATEGORIES = {
  castramovei: 'Castramóvel',
  alimentacao: 'Alimentação',
  veterinario: 'Veterinário',
  vacinas:     'Vacinas e medicamentos',
  abrigo:      'Manutenção do abrigo',
  transporte:  'Transporte',
  outros:      'Outros',
};

export const EXPENSE_COLORS = {
  castramovei: '#C4A8A0',
  alimentacao: '#E8B86A',
  veterinario: '#7AACBF',
  vacinas:     '#9EB89C',
  abrigo:      '#B5A8D4',
  transporte:  '#A8C4D4',
  outros:      '#C8C4BA',
};

// Formato legado usado pelo gráfico do Dashboard
const _mockBreakdown = [
  { id: 'food',    title: 'Alimentação',          value: 189980 },
  { id: 'vet',     title: 'Atendimento veterinário', value: 162840 },
  { id: 'vaccine', title: 'Vacinas e medicamentos', value: 108560 },
  { id: 'shelter', title: 'Manutenção do abrigo',  value:  81420 },
];

let _mockExpenses = [
  { id: 1, category: 'castramovei', description: 'Campanha castramóvel — maio', value: 320.00, date: '2026-05-15' },
  { id: 2, category: 'alimentacao', description: 'Ração e mantimentos — junho', value: 189.98, date: '2026-06-01' },
  { id: 3, category: 'veterinario', description: 'Consultas e exames',           value: 162.84, date: '2026-06-03' },
  { id: 4, category: 'vacinas',     description: 'Campanha de vacinação',        value: 108.56, date: '2026-05-28' },
  { id: 5, category: 'abrigo',      description: 'Reforma da estrutura',         value:  81.42, date: '2026-05-20' },
];

export async function getExpenseBreakdown() {
  await new Promise(resolve => setTimeout(resolve, 600));
  return _mockBreakdown;
}

export async function getExpenses() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [..._mockExpenses].sort((a, b) => b.date.localeCompare(a.date));
}

export async function addExpense(expense) {
  await new Promise(resolve => setTimeout(resolve, 300));
  const entry = { ...expense, id: Date.now() };
  _mockExpenses.push(entry);
  return entry;
}

export async function updateExpense(id, expense) {
  await new Promise(resolve => setTimeout(resolve, 300));
  _mockExpenses = _mockExpenses.map(e => e.id === id ? { ...e, ...expense } : e);
  return _mockExpenses.find(e => e.id === id);
}

export async function deleteExpense(id) {
  await new Promise(resolve => setTimeout(resolve, 300));
  _mockExpenses = _mockExpenses.filter(e => e.id !== id);
}

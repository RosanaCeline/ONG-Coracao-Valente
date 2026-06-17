import { apiFetch } from './api';

// ── Doações recebidas ────────────────────────────────────────────────────────

export const DONATION_TYPES = {
  DINHEIRO: 'Dinheiro',
  ITENS:    'Itens',
  SERVICO:  'Serviço',
};

export const DONATION_TYPE_COLORS = {
  DINHEIRO: '#9EB89C',
  ITENS:    '#E8B86A',
  SERVICO:  '#7AACBF',
};

export async function getDonations() {
  return apiFetch('/api/donation');
}

export async function addDonation(data) {
  return apiFetch('/api/donation', { method: 'POST', body: data });
}

export async function updateDonation(id, data) {
  return apiFetch(`/api/donation/${id}`, { method: 'PUT', body: data });
}

export async function deleteDonation(id) {
  return apiFetch(`/api/donation/${id}`, { method: 'DELETE' });
}

// ── Gastos ───────────────────────────────────────────────────────────────────

export const EXPENSE_CATEGORIES = {
  CASTRAMOVEL: 'Castramóvel',
  ALIMENTACAO: 'Alimentação',
  VETERINARIO: 'Veterinário',
  VACINAS:     'Vacinas e medicamentos',
  ABRIGO:      'Manutenção do abrigo',
  TRANSPORTE:  'Transporte',
  OUTROS:      'Outros',
};

export const EXPENSE_COLORS = {
  CASTRAMOVEL: '#B5A8D4',
  ALIMENTACAO: '#E8B86A',
  VETERINARIO: '#7AACBF',
  VACINAS:     '#9EB89C',
  ABRIGO:      '#C4A8A0',
  TRANSPORTE:  '#A8C4D4',
  OUTROS:      '#C8C4BA',
};

export async function getExpenseBreakdown() {
  return apiFetch('/api/expense/breakdown');
}

export async function getExpenses() {
  return apiFetch('/api/expense');
}

export async function addExpense(data) {
  return apiFetch('/api/expense', { method: 'POST', body: data });
}

export async function updateExpense(id, data) {
  return apiFetch(`/api/expense/${id}`, { method: 'PUT', body: data });
}

export async function deleteExpense(id) {
  return apiFetch(`/api/expense/${id}`, { method: 'DELETE' });
}

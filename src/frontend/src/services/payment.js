import { apiFetch } from './api';

export async function getPixConfig() {
  return apiFetch('/api/payment');
}

export async function savePixConfig(data) {
  return apiFetch('/api/payment/pix', { method: 'PUT', body: data });
}

export async function deletePixConfig() {
  return apiFetch('/api/payment/pix', { method: 'DELETE' });
}

export async function getQrCode(amount, descricao) {
  const params = new URLSearchParams();
  if (amount != null) params.set('amount', amount);
  if (descricao) params.set('descricao', descricao);
  const qs = params.toString();
  return apiFetch(`/api/payment/qrcode${qs ? `?${qs}` : ''}`);
}

import { apiFetch } from './api';

export async function sendRating(data) {
  return apiFetch(`/api/sus`, { method: 'POST', body: data });
}

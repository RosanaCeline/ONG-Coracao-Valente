import { apiFetch } from './api';

export async function sendRating(data) {
  return apiFetch(`/sus`, { method: 'POST', body: data });
}

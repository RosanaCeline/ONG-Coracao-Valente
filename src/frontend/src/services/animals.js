import { apiFetch } from './api';

export async function getAnimals(filters = {}) {
  const params = new URLSearchParams();
  if (filters.isAdopted !== undefined) params.set('isAdopted', filters.isAdopted);
  if (filters.race)   params.set('race', filters.race);
  if (filters.gender) params.set('gender', filters.gender);
  const qs = params.toString();
  return apiFetch(`/api/animal${qs ? `?${qs}` : ''}`);
}

export async function createAnimal(formData) {
  return apiFetch('/api/animal', { method: 'POST', body: formData });
}

export async function updateAnimal(id, formData) {
  return apiFetch(`/api/animal/${id}`, { method: 'PUT', body: formData });
}

export async function deleteAnimal(id) {
  return apiFetch(`/api/animal/${id}`, { method: 'DELETE' });
}

export async function adoptAnimal(id) {
  return apiFetch(`/api/animal/${id}/adopt`, { method: 'PATCH' });
}

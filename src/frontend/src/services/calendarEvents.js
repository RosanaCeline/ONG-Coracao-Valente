import { apiFetch } from './api';

export const EVENT_CATEGORIES = {
  vacinacao:  'Vacinação',
  castracao:  'Castração',
  prazo:      'Prazo / Documento',
  evento:     'Evento',
  reuniao:    'Reunião',
};

export const EVENT_CATEGORY_COLORS = {
  vacinacao:  '#9EB89C',
  castracao:  '#7AACBF',
  prazo:      '#E8B86A',
  evento:     '#C4A8A0',
  reuniao:    '#B5A8D4',
};

export async function getEvents() {
  return apiFetch('/api/event');
}

export async function addEvent(event) {
  return apiFetch('/api/event', { method: 'POST', body: event });
}

export async function updateEvent(id, event) {
  return apiFetch(`/api/event/${id}`, { method: 'PUT', body: event });
}

export async function deleteEvent(id) {
  return apiFetch(`/api/event/${id}`, { method: 'DELETE' });
}

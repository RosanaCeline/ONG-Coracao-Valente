import { apiFetch } from './api';

export async function getTags() {
  return apiFetch('/api/tag');
}

export async function createTag(name) {
  return apiFetch(`/api/tag?name=${encodeURIComponent(name)}`, { method: 'POST' });
}

export async function deleteTag(id) {
  return apiFetch(`/api/tag/${id}`, { method: 'DELETE' });
}

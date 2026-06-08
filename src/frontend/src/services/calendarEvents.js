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

let _mockEvents = [
  { id: 1, title: 'Campanha antirrábica',          category: 'vacinacao', date: '2026-07-15', notes: 'Praça central, das 8h às 12h' },
  { id: 2, title: 'Renovar CND Federal',            category: 'prazo',     date: '2026-07-30', notes: 'Certidão vence em 30/07' },
  { id: 3, title: 'Castramóvel — Bairro São Pedro', category: 'castracao', date: '2026-08-10', notes: '20 fichas disponíveis' },
  { id: 4, title: 'Reunião no Conselho Municipal',  category: 'reuniao',   date: '2026-08-20', notes: 'Secretaria de Meio Ambiente, 14h' },
  { id: 5, title: 'Bazar beneficente',              category: 'evento',    date: '2026-09-05', notes: 'Arrecadação para ração' },
  { id: 6, title: 'Renovar CRF — FGTS',            category: 'prazo',     date: '2026-06-30', notes: 'Prazo curto — prioridade' },
];

export async function getEvents() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [..._mockEvents];
}

export async function addEvent(event) {
  await new Promise(resolve => setTimeout(resolve, 300));
  const entry = { ...event, id: Date.now() };
  _mockEvents.push(entry);
  return entry;
}

export async function updateEvent(id, event) {
  await new Promise(resolve => setTimeout(resolve, 300));
  _mockEvents = _mockEvents.map(e => e.id === id ? { ...e, ...event } : e);
  return _mockEvents.find(e => e.id === id);
}

export async function deleteEvent(id) {
  await new Promise(resolve => setTimeout(resolve, 300));
  _mockEvents = _mockEvents.filter(e => e.id !== id);
}

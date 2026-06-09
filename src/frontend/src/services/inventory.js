export const INVENTORY_CATEGORIES = {
  medicamentos: 'Medicamentos',
  alimentos:    'Alimentos',
  higiene:      'Higiene',
  roupas:       'Roupas / Mantos',
  equipamentos: 'Equipamentos',
  outros:       'Outros',
};

export const INVENTORY_CATEGORY_COLORS = {
  medicamentos: '#7AACBF',
  alimentos:    '#E8B86A',
  higiene:      '#9EB89C',
  roupas:       '#C4A8A0',
  equipamentos: '#B5A8D4',
  outros:       '#C8C4BA',
};

export const UNITS = ['unidade', 'kg', 'g', 'cx', 'ml', 'L', 'par', 'rolo'];

let _mockItems = [
  { id: 1, name: 'Vermífugo Drontal',    category: 'medicamentos', quantity: 24,  unit: 'unidade', expiry: '2027-03-01' },
  { id: 2, name: 'Ração adulto 15kg',    category: 'alimentos',    quantity: 8,   unit: 'cx',      expiry: null },
  { id: 3, name: 'Shampoo antisséptico', category: 'higiene',      quantity: 12,  unit: 'unidade', expiry: '2026-11-15' },
  { id: 4, name: 'Manto de lã P',        category: 'roupas',       quantity: 30,  unit: 'unidade', expiry: null },
  { id: 5, name: 'Seringa 5ml',          category: 'medicamentos', quantity: 200, unit: 'unidade', expiry: null },
  { id: 6, name: 'Coleira antipulgas',   category: 'equipamentos', quantity: 15,  unit: 'unidade', expiry: '2027-01-01' },
];

export async function getInventory() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [..._mockItems];
}

export async function addItem(item) {
  await new Promise(resolve => setTimeout(resolve, 300));
  const entry = { ...item, id: Date.now() };
  _mockItems.push(entry);
  return entry;
}

export async function updateItem(id, item) {
  await new Promise(resolve => setTimeout(resolve, 300));
  _mockItems = _mockItems.map(i => i.id === id ? { ...i, ...item } : i);
  return _mockItems.find(i => i.id === id);
}

export async function deleteItem(id) {
  await new Promise(resolve => setTimeout(resolve, 300));
  _mockItems = _mockItems.filter(i => i.id !== id);
}

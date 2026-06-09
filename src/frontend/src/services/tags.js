let _mockTags = [
  'Fêmea', 'Macho',
  'Filhote', 'Vacinado', 'Castrado',
  'Dócil', 'Brincalhão', 'Ativo', 'Tranquilo',
  'Carinhoso', 'Sociável', 'Tímido',
];

export async function getTags() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [..._mockTags];
}

export async function createTag(label) {
  await new Promise(resolve => setTimeout(resolve, 200));
  if (!_mockTags.includes(label)) _mockTags.push(label);
  return label;
}

const RACE_LABELS = { DOG: 'cãozinho', CAT: 'gatinho' };
const GENDER_LABELS = { MALE: 'Ele', FEMALE: 'Ela' };

export function buildCaption(animal, instagramHandle) {
  const raceWord   = RACE_LABELS[animal.race] ?? 'animal';
  const genderWord = GENDER_LABELS[animal.gender] ?? 'Ele(a)';
  const tagsLine    = animal.tags?.length
    ? `Características: ${animal.tags.map(t => t.name).join(', ')}.`
    : '';

  if (animal.isAdopted) {
    return [
      `💙 ${animal.name} já encontrou um lar! 💙`,
      '',
      `Esse ${raceWord} de ${animal.age} foi adotado e agora vive um novo capítulo cheio de amor.`,
      tagsLine,
      '',
      'Obrigado a todos que tornam esses finais felizes possíveis. 🐾',
      '',
      instagramHandle ? `Siga ${instagramHandle} e acompanhe mais histórias como essa.` : '',
      '',
      '#adoção #AdoteUmAnimal #ONGCoraçãoValente',
    ].filter(Boolean).join('\n');
  }

  return [
    `🐾 ${animal.name} está esperando por um lar! 🐾`,
    '',
    `${genderWord} é um ${raceWord} de ${animal.age}, e está disponível para adoção responsável.`,
    tagsLine,
    '',
    'Quer adotar ou conhecer mais sobre ' + animal.name + '? Entre em contato com a gente!',
    instagramHandle ? `📷 Instagram: ${instagramHandle}` : '',
    '',
    '#adoção #AdoteUmAnimal #ONGCoraçãoValente',
  ].filter(Boolean).join('\n');
}

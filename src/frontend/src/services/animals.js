import dogHero from '../assets/landingpage/HOME_cachorro_hero.png';
import dogBall from '../assets/landingpage/HOME_bola_cachorro.png';
import dogsTogether from '../assets/landingpage/HOME_cachorros_unidos.png';

const _mockAnimals = [
  {
    id: 1,
    name: 'Luna',
    tipo: 'Cão',
    age: '5 meses',
    photo: dogHero,
    tags: ['Fêmea', 'Dócil', 'Carinhoso'],
    status: 'disponivel',
  },
  {
    id: 2,
    name: 'Thor',
    tipo: 'Cão',
    age: '8 meses',
    photo: dogBall,
    tags: ['Macho', 'Brincalhão', 'Ativo'],
    status: 'em_tratamento',
  },
  {
    id: 3,
    name: 'Mel',
    tipo: 'Cão',
    age: '2 anos',
    photo: dogsTogether,
    tags: ['Fêmea', 'Tranquilo', 'Vacinado'],
    status: 'adotado',
  },
];

export async function getAnimals() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return _mockAnimals;
}

import dogHero from '../assets/landingpage/HOME_cachorro_hero.png';
import dogBall from '../assets/landingpage/HOME_bola_cachorro.png';
import dogsTogether from '../assets/landingpage/HOME_cachorros_unidos.png';

const _mockAnimals = [
  {
    id: 1,
    name: 'Luna',
    age: '5 meses',
    photo: dogHero,
    tags: ['Cão', 'Fêmea', 'Dócil', 'Carinhosa'],
  },
  {
    id: 2,
    name: 'Thor',
    age: '8 meses',
    photo: dogBall,
    tags: ['Cão', 'Macho', 'Brincalhão', 'Ativo'],
  },
  {
    id: 3,
    name: 'Mel',
    age: '2 anos',
    photo: dogsTogether,
    tags: ['Cão', 'Fêmea', 'Tranquila', 'Vacinada'],
  },
];

export async function getAnimals() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return _mockAnimals;
}

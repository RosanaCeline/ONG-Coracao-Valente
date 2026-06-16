import { apiFetch } from './api';

// Valores estáticos usados por componentes públicos (Navbar, Footer, HeroSection).
// Estes componentes lêem de forma síncrona — continuam usando este objeto como fallback.
export const ONG_INFO = {
  name:            'ONG Coração Valente',
  cnpj:            '31.571.472/0001-28',
  responsibleName: '',
  logoUrl:         null,
  address:         'Rua Lair Félix Nunes',
  number:          '',
  neighborhood:    'Cruzeiro',
  city:            'Tianguá',
  state:           'CE',
  cep:             '62320-000',
  phone:           '(88) 3249-9824',
  volunteers:      4,
  whatsappNumber:  import.meta.env.VITE_WHATSAPP_NUMBER,
  instagramUrl:    import.meta.env.VITE_INSTAGRAM_URL    ?? 'https://www.instagram.com/ong.coracaovalente/',
  instagramHandle: import.meta.env.VITE_INSTAGRAM_HANDLE ?? '@ong.coracaovalente',
  socials: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL ?? 'https://www.instagram.com/ong.coracaovalente/',
    facebook:  import.meta.env.VITE_FACEBOOK_URL  ?? null,
    whatsapp:  import.meta.env.VITE_WHATSAPP_NUMBER ?? `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`,
  },
};

export async function getOngInfo() {
  return apiFetch('/api/ong');
}

export async function updateOngInfo(data) {
  return apiFetch('/api/ong', { method: 'PUT', body: data });
}

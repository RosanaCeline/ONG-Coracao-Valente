import { apiFetch } from './api';

// Valores estáticos usados por componentes públicos (Navbar, Footer, HeroSection).
// Estes componentes lêem de forma síncrona — continuam usando este objeto como fallback.
export const ONG_INFO = {
  name:            'ONG Coração Valente',
  cnpj:            '',
  responsibleName: '',
  logoUrl:         null,
  address:         'Av. Manoel da Custódia',
  number:          'nº 1.111 / 1.119',
  neighborhood:    'Bairro São Geraldo',
  city:            'Tianguá',
  state:           'CE',
  cep:             '62320-000',
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

const _whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? null;

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
  cep:             '',
  volunteers:      12,
  pix:             null,
  pixType:         'cpf',
  whatsappNumber:  _whatsappNumber ?? '5588994852867',
  instagramUrl:    import.meta.env.VITE_INSTAGRAM_URL    ?? 'https://www.instagram.com/ong.coracaovalente/',
  instagramHandle: import.meta.env.VITE_INSTAGRAM_HANDLE ?? '@ong.coracaovalente',
  socials: {
    instagram: import.meta.env.VITE_INSTAGRAM_URL ?? 'https://www.instagram.com/ong.coracaovalente/',
    facebook:  import.meta.env.VITE_FACEBOOK_URL  ?? null,
    whatsapp:  _whatsappNumber ? `https://wa.me/${_whatsappNumber}` : 'https://wa.me/5588994852867',
  },
};

export async function getOngInfo() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return { ...ONG_INFO };
}

export async function updateOngInfo(data) {
  await new Promise(resolve => setTimeout(resolve, 500));
  Object.assign(ONG_INFO, data);
  ONG_INFO.socials.whatsapp  = data.whatsappNumber ? `https://wa.me/${data.whatsappNumber}` : null;
  ONG_INFO.socials.instagram = data.instagramUrl ?? ONG_INFO.socials.instagram;
  return { ...ONG_INFO };
}

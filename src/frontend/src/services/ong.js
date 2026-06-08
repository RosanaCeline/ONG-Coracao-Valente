const _whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? null;

export const ONG_INFO = {
    name:    'ONG Coração Valente',
    city:    'Tianguá',
    state:   'Ceará',
    address: 'Av. Manoel da Custódia, nº 1.111 / 1.119, Bairro São Geraldo',
    socials: {
        instagram: import.meta.env.VITE_INSTAGRAM_URL  ?? 'https://www.instagram.com/ong.coracaovalente/',
        facebook:  import.meta.env.VITE_FACEBOOK_URL   ?? null,
        whatsapp:  _whatsappNumber ? `https://wa.me/${_whatsappNumber}` : null,
    },
};

// Trocar pelo fetch real quando o backend estiver pronto
export async function getOngInfo() {
    await new Promise(resolve => setTimeout(resolve, 0));
    return ONG_INFO;
}

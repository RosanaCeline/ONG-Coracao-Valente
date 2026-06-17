const _areas = [
    { id: 1, titulo: 'Limpeza' },
    { id: 2, titulo: 'Organização' },
    { id: 3, titulo: 'Divulgação' },
    { id: 4, titulo: 'Cuidados básicos' },
];

export async function getVolunteerAreas() {
    return _areas;
}

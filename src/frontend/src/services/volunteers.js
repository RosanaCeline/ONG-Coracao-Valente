const _mockAreas = [
    { id: 1, titulo: 'Limpeza' },
    { id: 2, titulo: 'Organização' },
    { id: 3, titulo: 'Divulgação' },
    { id: 4, titulo: 'Cuidados básicos' },
];

export async function getVolunteerAreas() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return _mockAreas;
}

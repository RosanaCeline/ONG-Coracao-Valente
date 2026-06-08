const _mockExpenses = [
    { id: 'food',    title: 'ALIMENTAÇÃO DOS ANIMAIS', value: 189980 },
    { id: 'vet',     title: 'ATENDIMENTO VETERINÁRIO', value: 162840 },
    { id: 'vaccine', title: 'VACINAS E MEDICAMENTOS',  value: 108560 },
    { id: 'shelter', title: 'MANUTENÇÃO DO ABRIGO',    value:  81420 },
];

export async function getExpenseBreakdown() {
    await new Promise(resolve => setTimeout(resolve, 600));
    return _mockExpenses;
}

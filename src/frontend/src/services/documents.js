export const DOCUMENT_SLOTS = [
  {
    id: 'cnpj',
    label: 'Cartão CNPJ',
    description: 'Comprovante de inscrição no Cadastro Nacional de Pessoas Jurídicas (Receita Federal)',
    required: true,
  },
  {
    id: 'estatuto',
    label: 'Estatuto Social',
    description: 'Documento constitutivo da ONG, registrado em cartório — define finalidade e estrutura',
    required: true,
  },
  {
    id: 'ata_fundacao',
    label: 'Ata de Fundação',
    description: 'Ata da assembleia de constituição da organização, com assinaturas dos fundadores',
    required: true,
  },
  {
    id: 'ata_diretoria',
    label: 'Ata de Eleição da Diretoria',
    description: 'Ata mais recente de eleição e posse da diretoria vigente, registrada em cartório',
    required: true,
  },
  {
    id: 'cnd_federal',
    label: 'CND Federal',
    description: 'Certidão Negativa de Débitos da Receita Federal e PGFN (validade 6 meses)',
    required: true,
  },
  {
    id: 'cnd_estadual',
    label: 'CND Estadual',
    description: 'Certidão Negativa de Débitos do Estado do Ceará (SEFAZ-CE)',
    required: false,
  },
  {
    id: 'cnd_municipal',
    label: 'CND Municipal',
    description: 'Certidão Negativa de Débitos da Prefeitura de Tianguá (validade 6 meses)',
    required: true,
  },
  {
    id: 'balanco',
    label: 'Balanço Patrimonial',
    description: 'Demonstrativo financeiro do último exercício fiscal, assinado por contador',
    required: false,
  },
  {
    id: 'relatorio',
    label: 'Relatório de Atividades',
    description: 'Relatório anual das atividades desenvolvidas pela ONG',
    required: false,
  },
  {
    id: 'utilidade_publica',
    label: 'Declaração de Utilidade Pública',
    description: 'Decreto municipal ou estadual reconhecendo a ONG como de utilidade pública',
    required: false,
  },
  {
    id: 'rg_responsavel',
    label: 'RG/CPF do Responsável',
    description: 'Documento de identidade do responsável legal pela ONG',
    required: true,
  },
];

// In-memory store: slotId → { fileName, fileType, dataUrl, uploadedAt }
const _store = {};

export async function getDocuments() {
  return new Promise(resolve => setTimeout(() => resolve({ ..._store }), 200));
}

export async function uploadDocument(slotId, file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const entry = {
        fileName:   file.name,
        fileType:   file.type,
        dataUrl:    reader.result,
        uploadedAt: new Date().toISOString(),
      };
      _store[slotId] = entry;
      setTimeout(() => resolve(entry), 200);
    };
    reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
    reader.readAsDataURL(file);
  });
}

export async function removeDocument(slotId) {
  return new Promise(resolve => setTimeout(() => { delete _store[slotId]; resolve(); }, 200));
}

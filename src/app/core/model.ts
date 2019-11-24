export class Pessoa {
  codigo: number;
  nome: string;
  rg: string;
  cpf: string;
}

export class VeterinarioTipoPet {
  codigoVeterinario: number;
  codigoTipoPet: number;
}

export class Veterinario {
  codigo: number;
  registroConselho: string;
  pessoa: Pessoa;
  veterinarioTipoPet: VeterinarioTipoPet;
}

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Categoria {
  codigo: number;
}


export class Lancamento {
  codigo: number;
  tipoLancamento = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}

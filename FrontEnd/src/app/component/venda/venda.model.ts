export interface VendaItem {
  proId: number;
  quantidade: number;
  precoUnitario: number;
}

export interface Venda {
  venId?: number;
  venData: string;
  vendaCodigo: string;
  cliId: number;
  fpgId: number;
  valorTotal: number;
  itens: VendaItem[];
}

export interface VendaSemana {
  ano: number;
  semana: number;
  totalVendas: number;
}
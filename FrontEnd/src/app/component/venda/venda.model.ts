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
  
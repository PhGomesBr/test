export interface FormaPagamento {
    fpgId?: number;
    fpgTipo: string;
    fpgDescricao: string;
    fpgPermiteParcelamento: boolean;
    fpgNumMaxParcelas: number;
    fpgTaxaAdicional: number;
}

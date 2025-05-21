export interface FormaPagamento {
    fpgId?: number; // ID da forma de pagamento (opcional, mapeia 'id: Long')
    fpgDescricao: string; // Descrição da forma de pagamento (obrigatório, mapeia 'descricao: String')
    fpgAtivo?: boolean; // Status ativo (mapeia 'ativo: String' como booleano, assumindo que 'ativo' representa true/false)
    fpgPermiteParcelamento?: boolean; // Indica se permite parcelamento (mapeia 'permiteParcelamento: Boolean')
    fpgNumeroMaximoParcelas?: number; // Número máximo de parcelas (mapeia 'numeroMaximoParcelas: Integer')
    fpgTaxaAdicional?: number; // Taxa adicional em percentual (mapeia 'taxaAdicional: BigDecimal' como number para simplificar)
}
// Define uma interface chamada Cliente
export interface Cliente {
    // Propriedade opcional para o ID do cliente (número)
    cliId?: number; 
    // Propriedade obrigatória para o nome do cliente (string)
    cliNome: string; 
    // Propriedade obrigatória para o CPF do cliente (string)
    cliCpf: string; 
    // Propriedade obrigatória para o e-mail do cliente (string)
    cliEmail: string; 
    // Propriedade obrigatória para o telefone do cliente (string)
    cliTelefone: string; 
}
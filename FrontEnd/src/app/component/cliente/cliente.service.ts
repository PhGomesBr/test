// Importações essenciais para o funcionamento do serviço
import { HttpClient } from "@angular/common/http"; 
import { Injectable } from "@angular/core"; 
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs"; 
import { Cliente } from './cliente.model'; 

// Decorador que define o serviço como disponível em toda a aplicação
@Injectable({
    providedIn: 'root' // O serviço será injetado na raiz do projeto
})
export class ClienteService {

    // URL base para as requisições HTTP relacionadas ao cliente
    baseUrl = "http://localhost:8080/clientes";

    // Construtor que injeta dependências necessárias
    constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

    // Método para exibir mensagens de notificação
    showMessage(msg: string): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000, // Duração da mensagem em milissegundos
            horizontalPosition: "right", // Posição horizontal
            verticalPosition: "top" // Posição vertical
        });
    }

    // Método para criar um novo cliente
    create(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.baseUrl, cliente); 
    }

    // Método para obter a lista de clientes
    read(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.baseUrl); 
    }

    // Método para obter um cliente pelo ID
    readById(id: string): Observable<Cliente> {
        const url = `${this.baseUrl}/${id}`; // Concatena o ID na URL
        return this.http.get<Cliente>(url);
    }

    // Método para atualizar os dados de um cliente
    update(cliente: Cliente): Observable<Cliente> {
        const url = `${this.baseUrl}/${cliente.cliId}`; // Concatena o ID do cliente na URL
        return this.http.put<Cliente>(url, cliente); // Envia uma requisição PUT
    }

    // Método para deletar um cliente pelo ID
    delete(id: number): Observable<Cliente> {
        const url = `${this.baseUrl}/${id}`; // Concatena o ID na URL
        return this.http.delete<Cliente>(url); // Envia uma requisição DELETE
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Fornecedor } from './fornecedor.model';

@Injectable({
  providedIn: 'root' // Define o serviço como singleton no root module
})
export class FornecedorService {

  baseUrl = "http://localhost:8080/fornecedores"; // URL base da API

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  // Exibe uma mensagem de notificação
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000, // Duração da mensagem em milissegundos
      horizontalPosition: "right", // Posição horizontal
      verticalPosition: "top" // Posição vertical
    });
  }

  // Cria um novo fornecedor
  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.baseUrl, fornecedor);
  }

  // Obtém a lista de fornecedores
  read(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.baseUrl);
  }

  // Obtém um fornecedor pelo ID
  readById(id: string): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Fornecedor>(url);
  }

  // Atualiza um fornecedor existente
  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${fornecedor.forId}`;
    return this.http.put<Fornecedor>(url, fornecedor);
  }

  // Exclui um fornecedor pelo ID
  delete(id: number): Observable<Fornecedor> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Fornecedor>(url);
  }
}
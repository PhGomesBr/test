import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs'; // Adicionei catchError e throwError
import { Contato } from '../contato/contato-read.model';
import { Endereco } from 'src/app/models/endereco.model';
import { Fornecedor } from '../fornecedor/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  readById(arg0: number){
    throw new Error('Method not implemented.');
  }

  private fornecedorBaseUrl = 'http://localhost:8080/fornecedores';
  private contatoBaseUrl = 'http://localhost:8080/contatos';
  private enderecoBaseUrl = 'http://localhost:8080/enderecos';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  // ===== FORNECEDOR =====
  createFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.fornecedorBaseUrl, fornecedor);
  }

  readFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.fornecedorBaseUrl);
  }

  readFornecedorById(id: string): Observable<Fornecedor> {
    const url = `${this.fornecedorBaseUrl}/${id}`;
    return this.http.get<Fornecedor>(url);
  }

  updateFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.fornecedorBaseUrl}/${fornecedor.forId}`;
    return this.http.put<Fornecedor>(url, fornecedor);
  }

  deleteFornecedor(id: number): Observable<Fornecedor> {
    const url = `${this.fornecedorBaseUrl}/${id}`;
    return this.http.delete<Fornecedor>(url);
  }

  // ===== CONTATOS =====
  createContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.contatoBaseUrl, contato);
  }

  readContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.contatoBaseUrl);
  }

  readContatoById(id: string): Observable<Contato> {
    const url = `${this.contatoBaseUrl}/${id}`;
    return this.http.get<Contato>(url);
  }

  updateContato(contato: Contato): Observable<Contato> {
    const url = `${this.contatoBaseUrl}/${contato.conId}`;
    return this.http.put<Contato>(url, contato);
  }

  deleteContato(id: number): Observable<Fornecedor> {
    const url = `${this.contatoBaseUrl}/${id}`;
    return this.http.delete<Fornecedor>(url);
  }

  // ===== ENDEREÇOS =====
  createEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.enderecoBaseUrl, endereco);
  }

  readEnderecos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.enderecoBaseUrl);
  }

  readEnderecoById(id: string): Observable<Endereco> {
    const url = `${this.enderecoBaseUrl}/${id}`;
    return this.http.get<Endereco>(url);
  }

  updateEndereco(endereco: Endereco): Observable<Endereco> {
    const url = `${this.enderecoBaseUrl}/${endereco.endId}`;
    return this.http.put<Endereco>(url, endereco);
  }

  deleteEndereco(id: number): Observable<Endereco> {
    const url = `${this.enderecoBaseUrl}/${id}`;
    return this.http.delete<Endereco>(url)
  }
}
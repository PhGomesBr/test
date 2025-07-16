import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs'; // Adicionei catchError e throwError
import { Contato } from '../contato/contato-read.model';
import { Endereco } from 'src/app/models/endereco.model';
import { Fornecedor } from '../fornecedor/fornecedor.model';

// Removi a vírgula extra após as importações

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
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
    return this.http.post<Fornecedor>(this.fornecedorBaseUrl, fornecedor).pipe(
      catchError(error => {
        this.showMessage('Erro ao criar fornecedor!');
        return throwError(() => new Error('Erro na criação do fornecedor: ' + error.message));
      })
    );
  }

  readFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.fornecedorBaseUrl).pipe(
      catchError(error => {
        this.showMessage('Erro ao carregar fornecedores!');
        return throwError(() => new Error('Erro ao carregar fornecedores: ' + error.message));
      })
    );
  }

  readFornecedorById(id: string): Observable<Fornecedor> {
    const url = `${this.fornecedorBaseUrl}/${id}`;
    return this.http.get<Fornecedor>(url).pipe(
      catchError(error => {
        this.showMessage('Erro ao carregar fornecedor!');
        return throwError(() => new Error('Erro ao carregar fornecedor: ' + error.message));
      })
    );
  }

  updateFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.fornecedorBaseUrl}/${fornecedor.forId}`;
    return this.http.put<Fornecedor>(url, fornecedor).pipe(
      catchError(error => {
        this.showMessage('Erro ao atualizar fornecedor!');
        return throwError(() => new Error('Erro na atualização do fornecedor: ' + error.message));
      })
    );
  }

  deleteFornecedor(id: number): Observable<void> {
    const url = `${this.fornecedorBaseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        this.showMessage('Erro ao deletar fornecedor!');
        return throwError(() => new Error('Erro ao deletar fornecedor: ' + error.message));
      })
    );
  }

  // ===== CONTATOS =====
  createContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.contatoBaseUrl, contato).pipe(
      catchError(error => {
        this.showMessage('Erro ao criar contato!');
        return throwError(() => new Error('Erro na criação do contato: ' + error.message));
      })
    );
  }

  readContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.contatoBaseUrl).pipe(
      catchError(error => {
        this.showMessage('Erro ao carregar contatos!');
        return throwError(() => new Error('Erro ao carregar contatos: ' + error.message));
      })
    );
  }

  readContatoById(id: string): Observable<Contato> {
    const url = `${this.contatoBaseUrl}/${id}`;
    return this.http.get<Contato>(url).pipe(
      catchError(error => {
        this.showMessage('Erro ao carregar contato!');
        return throwError(() => new Error('Erro ao carregar contato: ' + error.message));
      })
    );
  }

  updateContato(contato: Contato): Observable<Contato> {
    const url = `${this.contatoBaseUrl}/${contato.conId}`;
    return this.http.put<Contato>(url, contato).pipe(
      catchError(error => {
        this.showMessage('Erro ao atualizar contato!');
        return throwError(() => new Error('Erro na atualização do contato: ' + error.message));
      })
    );
  }

  deleteContato(id: number): Observable<void> {
    const url = `${this.contatoBaseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        this.showMessage('Erro ao deletar contato!');
        return throwError(() => new Error('Erro ao deletar contato: ' + error.message));
      })
    );
  }

  // ===== ENDEREÇOS =====
  createEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.enderecoBaseUrl, endereco).pipe(
      catchError(error => {
        this.showMessage('Erro ao criar endereço!');
        return throwError(() => new Error('Erro na criação do endereço: ' + error.message));
      })
    );
  }

  readEnderecos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.enderecoBaseUrl).pipe(
      catchError(error => {
        this.showMessage('Erro ao carregar endereços!');
        return throwError(() => new Error('Erro ao carregar endereços: ' + error.message));
      })
    );
  }

  readEnderecoById(id: string): Observable<Endereco> {
    const url = `${this.enderecoBaseUrl}/${id}`;
    return this.http.get<Endereco>(url).pipe(
      catchError(error => {
        this.showMessage('Erro ao carregar endereço!');
        return throwError(() => new Error('Erro ao carregar endereço: ' + error.message));
      })
    );
  }

  updateEndereco(endereco: Endereco): Observable<Endereco> {
    const url = `${this.enderecoBaseUrl}/${endereco.endId}`;
    return this.http.put<Endereco>(url, endereco).pipe(
      catchError(error => {
        this.showMessage('Erro ao atualizar endereço!');
        return throwError(() => new Error('Erro na atualização do endereço: ' + error.message));
      })
    );
  }

  deleteEndereco(id: number): Observable<void> {
    const url = `${this.enderecoBaseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        this.showMessage('Erro ao deletar endereço!');
        return throwError(() => new Error('Erro ao deletar endereço: ' + error.message));
      })
    );
  }
}
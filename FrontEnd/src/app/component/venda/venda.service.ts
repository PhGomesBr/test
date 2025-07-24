import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from './venda.model'; // Importa o modelo Venda

export interface VendaSemana {
  ano: number;
  semana: number;
  totalVendas: number;
}

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private apiUrl = 'http://localhost:8080/vendas/semana'; 
  baseUrl = 'http://localhost:8080/vendas';

  constructor(private http: HttpClient) {}

  getVendasPorSemana(): Observable<VendaSemana[]> {
    return this.http.get<VendaSemana[]>(this.apiUrl);
  }

  create(sale: Venda): Observable<Venda> {
    return this.http.post<Venda>(this.baseUrl, sale);
  }

  read(): Observable<Venda[]>{
    return this.http.get<Venda[]>(this.baseUrl);
  }

  readById(id: string): Observable<Venda>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Venda>(url);
  }
}

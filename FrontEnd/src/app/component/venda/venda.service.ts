import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTO vindo do backend
export interface VendaSemana {
  ano: number;
  semana: number;
  totalVendas: number;
}

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private baseUrl = 'http://localhost:8080/vendas'; // ajuste se sua API for diferente

  constructor(private http: HttpClient) {}

  getVendasPorSemana(): Observable<VendaSemana[]> {
    return this.http.get<VendaSemana[]>(`${this.baseUrl}/vendas-semanais`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getVendasPorSemana(): Observable<VendaSemana[]> {
    return this.http.get<VendaSemana[]>(this.apiUrl);
  }
}

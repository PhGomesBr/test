import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Serviço para notificar mudanças (ex.: nova venda)
@Injectable({
  providedIn: 'root'
})
export class VendaNotificacaoService {
  // Subject para emitir eventos quando uma venda é criada
  private vendaCriada = new Subject<void>();

  // Observable que outros componentes podem assinar para receber notificações
  vendaCriada$ = this.vendaCriada.asObservable();

  // Método para notificar que uma nova venda foi criada
  notificarVendaCriada(): void {
    this.vendaCriada.next();
  }
}
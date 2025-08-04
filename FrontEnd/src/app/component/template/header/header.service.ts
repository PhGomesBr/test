import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private tituloSource = new BehaviorSubject<string>('Dashboard');
  private iconeSource = new BehaviorSubject<string>('fa fa-home');

  titulo$ = this.tituloSource.asObservable();
  icone$ = this.iconeSource.asObservable();

  setTitulo(titulo: string) {
    this.tituloSource.next(titulo);
  }

  setIcone(icone: string) {
    this.iconeSource.next(icone);
  }
}
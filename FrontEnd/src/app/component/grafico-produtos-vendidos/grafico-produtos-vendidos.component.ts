// src/app/component/grafico-produtos-vendidos/grafico-produtos-vendidos.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';
import { Observable, interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VendaService } from '../venda/venda.service';
import { VendaNotificacaoService } from '../venda/vendaNotificacaoService.ts/VendaNotificacaoService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataResponse } from '../venda/venda.model';

@Component({
  selector: 'app-grafico-produtos-vendidos',
  templateUrl: './grafico-produtos-vendidos.component.html',
  styleUrls: ['./grafico-produtos-vendidos.component.css']
})
export class GraficoProdutosVendidosComponent implements OnInit, OnDestroy {
  private vendaSubscription: Subscription = new Subscription();

  public lineChartType: 'line' = 'line';

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff'
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `${context.dataset.label}: ${value} unidades`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Semanas',
          color: '#fff'
        },
        ticks: { color: '#fff' },
        grid: { color: '#333' }
      },
      y: {
        title: {
          display: true,
          text: 'Quantidade Vendida',
          color: '#fff'
        },
        ticks: { color: '#fff' },
        grid: { color: '#333' },
        beginAtZero: true
      }
    }
  };

  constructor(
    private vendaService: VendaService,
    private vendaNotificacaoService: VendaNotificacaoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.atualizarGrafico();
    this.vendaSubscription = interval(30000)
      .pipe(switchMap(() => this.vendaService.getProdutosMaisVendidos()))
      .subscribe({
        next: (data: ChartDataResponse) => this.processarDadosGrafico(data),
        error: (err: any) => {
          console.error('Erro ao atualizar gráfico:', err);
          this.snackBar.open('Erro ao carregar dados do gráfico', 'X', { duration: 3000 });
        }
      });

    this.vendaNotificacaoService.vendaCriada$.subscribe(() => {
      console.log('Nova venda detectada, atualizando gráfico...');
      this.atualizarGrafico();
    });
  }

  ngOnDestroy(): void {
    if (this.vendaSubscription) {
      this.vendaSubscription.unsubscribe();
    }
  }

  private atualizarGrafico(): void {
    this.vendaService.getProdutosMaisVendidos().subscribe({
      next: (data: ChartDataResponse) => this.processarDadosGrafico(data),
      error: (err: any) => {
        console.error('Erro ao carregar dados do gráfico:', err);
        this.snackBar.open('Erro ao carregar dados do gráfico', 'X', { duration: 3000 });
      }
    });
  }

  private processarDadosGrafico(data: ChartDataResponse): void {
    this.lineChartData.labels = data.labels;
    this.lineChartData.datasets = data.datasets;
  }
}
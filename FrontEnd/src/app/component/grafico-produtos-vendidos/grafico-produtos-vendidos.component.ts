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
    // Carregar dados fictícios inicialmente
    this.carregarDadosFicticios();
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

  private carregarDadosFicticios(): void {
    const dadosFicticios: ChartDataResponse = {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
      datasets: [
        {
          label: 'Produto A',
          data: [20, 35, 15, 40, 30],
          borderColor: '#FF6384',
          fill: true
        },
        {
          label: 'Produto B',
          data: [10, 25, 30, 20, 35],
          borderColor: '#36A2EB',
          fill: true
        },
        {
          label: 'Produto C',
          data: [15, 20, 25, 10, 15],
          borderColor: '#FFCE56',
          fill: true
        }
      ]
    };
    this.processarDadosGrafico(dadosFicticios);
  }

  private processarDadosGrafico(data: ChartDataResponse): void {
    this.lineChartData.labels = data.labels;
    this.lineChartData.datasets = data.datasets;
  }
}
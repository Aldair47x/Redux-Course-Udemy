import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso-model';
import { ChartType } from 'chart.js';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  public doughnutChartData;
  public doughnutChartType: ChartType = 'doughnut';

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription =  new Subscription();

  constructor(private store: Store<fromIngresoEgreso.IngresoEgresoStateAppState> ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
                                  .subscribe( ingresoEgreso => {
                                    this.contarIngresoEgreso( Object.values(ingresoEgreso.items));
                                  } );
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( item => {
      if (item.tipo === 'ingreso') {
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [ this.ingresos, this.egresos ];
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}

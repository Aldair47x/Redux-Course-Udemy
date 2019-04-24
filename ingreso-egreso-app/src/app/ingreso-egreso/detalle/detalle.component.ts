import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso-model';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  items: IngresoEgreso[];
  constructor( private store: Store<AppState>,
                public ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {

    this.store.select('ingresoEgreso')
    .subscribe( ingresoEgreso => {
      console.log(ingresoEgreso.items);
      this.items = Object.values(ingresoEgreso.items);
    });

  }

  BorrarIngresoEgreso(uid: string){
    this.ingresoEgresoService.borrarIngresoEgreso(uid);
  }

}

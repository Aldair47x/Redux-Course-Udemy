import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  cargando: boolean;

  constructor(public authService: AuthService,
              public store: Store<AppState> ) { }

  ngOnInit() {
    this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading );
  }

  onSubmit(data: any) {
    this.authService.crearUsuario(data.email, data.nombre, data.password);
  }

}

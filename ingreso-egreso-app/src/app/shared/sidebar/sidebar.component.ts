import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public authService: AuthService,
              public ingresoEresoService: IngresoEgresoService) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut();
    this.ingresoEresoService.cancelarSubscriptions();
  }

}

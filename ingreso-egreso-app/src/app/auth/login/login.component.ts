import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitLogin(data: any) {
    this.authService.ingresarUsuario(data.email, data.nombre, data.password);
  }

}

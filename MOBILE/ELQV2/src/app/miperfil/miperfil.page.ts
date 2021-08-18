import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatosUsuario } from '../modelm/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  id: string;
  usuario:DatosUsuario;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.id = res.uid;
        this.cargarUsuario();
      } 
    }, err => {
      console.log('err', err);
    })
  }

  cargarUsuario(){
    this.authService.getUserData(this.id).subscribe(usuarioData => {
      this.usuario = usuarioData;
      console.log(this.usuario);
    });
  }




}

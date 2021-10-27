import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  constructor(
    private router: Router, 
    private service: FirebaseauthService
  ) { }

  ngOnInit(): void {
  }
  
  salir(){
    this.service.logout();
    this.router.navigate(['login']);
  }

}

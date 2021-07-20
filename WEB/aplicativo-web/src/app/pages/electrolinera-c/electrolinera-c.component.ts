import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';

@Component({
  selector: 'app-electrolinera-c',
  templateUrl: './electrolinera-c.component.html',
  styleUrls: ['./electrolinera-c.component.scss'],
})
export class ElectrolineraCComponent implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  mensaje:string;
  id: string;
  public image: any;
  
  constructor(
    private serviceStore: FirebasestorageService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController, 
    public nav: NavController,
    private router:Router, 
    private serviceAuth : FirebaseauthService,
  ) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(5)])],
      direcion: ['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(20)])],
      phone: ['',Validators.compose([Validators.required,Validators.pattern('^[0-9]+$'),Validators.minLength(9), , Validators.maxLength(10)])],
      pass: ['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
   });
  }

  async submitForm(){
    this.isSubmitted = true;
    //console.log(this.ionicForm.value);
    //console.log(this.ionicForm.valid);
    if(this.ionicForm.valid)
    {
      let {email,pass,phone,direcion,name} = this.ionicForm.value;
      //console.log(emailF,passwordF,nombresF,apellidosF,direccionF,telefonoF);

      const user = await this.serviceAuth.register(email,pass,'','','',phone,'Electro',this.image);
      if (user) {
        console.log(user.uid);
        const electro = this.serviceStore.CrearElectrolinera(name,direcion,'','','','','','','','','','','','','','',user.uid,this.image).then(() => {
          this.mensaje="Se registro la Electrolinera en el sistema";
          this.presentAlertConfirm(this.mensaje);
        });

        const isVerified = this.serviceAuth.isEmailVerified(user);
      }else{
        if(this.serviceAuth.errores=="The email address is already in use by another account."){
          //console.log(this.authSvc.errores);}
          this.mensaje="El correo ya esta usado por otro usuario.";
          this.presentAlertConfirm(this.mensaje);
        }
        
      }
      this.router.navigate(['panel/electro1'])
    }
    else
    {
      console.log("error");
      this.mensaje="Valida que los campos esten completos y correctos";
      this.presentAlertConfirm(this.mensaje);
      return false;
    }
  }

  async presentAlertConfirm(mensajetxt :string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: mensajetxt,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
  
    await alert.present();
  }

  private redirectUser(isVerified: boolean): void {
    
    this.router.navigate(['panel/electro1']);
     
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestorageService } from '../../services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';
import {Subscription } from 'rxjs';
import { disableDebugTools } from '@angular/platform-browser';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario : Usuario={
    uid: '',
    correo: '',
    contra: '',
    nombre: '',
    celular: '',
    referencia: '',
    foto: '',
};
newFile : any;
loading: any;
toast: any;
handlerMessage: any;
uid = '';
suscriberUserInfo: Subscription | undefined;
  constructor(  public menu : MenuController,
    public firebaseauthService : FirebaseauthService,
    public firestorageService : FirestorageService,
    public firestoreService : FirestoreService,
    public toastController: ToastController,
    public alertController : AlertController,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController
              
    ) {
      
      this.firebaseauthService.stateAuth().subscribe(res =>{
        console.log(res);
        if(res!=null){
this.uid = res.uid;
this.getUserInfo(this.uid);
        }else{
         this.initUsuario();
        }
      });
     }

  async ngOnInit() {
    this.menu.enable(false);
    this.initUsuario();
  
  }

  handleRefresh(event: any) {
     
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };
 
  initUsuario(): void{

    this.uid = '';
    this.usuario ={
      uid: '',
      correo: '',
      contra: '',
      nombre: '',
      celular: '',
      referencia: '',
      foto: '', 
    };
console.log(this.usuario);
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }



 
    async salir(){
   /* const uid = await this.firebaseauthService.getUid();
    console.log(uid);*/ 
    this.firebaseauthService.logout();
    this.suscriberUserInfo?.unsubscribe();
  }

  getUserInfo(uid: string){
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestoreService.getDoc<Usuario>(path, uid).subscribe(res => {

this.usuario = res!;
    });
    }

    ingresar(){
    
      this.presentLoading();
    
      const credenciales ={
        correo: this.usuario.correo,
        contra: this.usuario.contra,
      };
      this.firebaseauthService.login(credenciales.correo , credenciales.contra).then(
        res => {
        console.log('ingreso con exito');
        this.loading.dismiss();
        this.presentToast('Bienvenido '+ credenciales.correo);
        this.goToHome();
        this.menu.enable(true);
            }).catch(error => {
              this.presentToast(' el Correo o Contrasenha son incorrectos');
            
            });
        
      }
      
      async presentToast(msg: string) {
        this.toast= await this.toastController.create({
          message: msg,
          duration: 5000});
          this.toast.present();
      }

      async presentLoading() {
        this.loading = await this.loadingCtrl.create({
          message: 'Aguarde unos segundos...',
          duration: 2000,
        });
    
        this.loading.present();
      }
goToHome(){
  this.navCtrl.navigateForward('/home');
}
    }

import { Component } from '@angular/core';
import { Usuario } from './models/usuario.models';
import { FirebaseauthService } from './services/firebaseauth.service';
import { FirestoreService } from './services/firestore.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
usuarios : Usuario [] = [];
usuario : Usuario  ={
  uid: '',
  correo: '',
  contra: '',
  nombre: '',
  celular: '',
  referencia: '',
  foto: '',
};
  suscriberUserInfo: any;
  uid = '';
  toast: any;
loading: any;

  constructor(
    private  firebaseauthService : FirebaseauthService,
    public firestoreService: FirestoreService,
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController
  
  ) {
    this.firebaseauthService.stateAuth().subscribe(res =>{
      console.log(res);
      if(res!=null){
  this.uid = res.uid;
  this.getUserInfo(this.uid);
      }
    });
  }
  
  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log(uid);
   }

   async salir(){
    /* const uid = await this.firebaseauthService.getUid();
     console.log(uid);*/ 
     this.firebaseauthService.logout();
     this.suscriberUserInfo?.unsubscribe();
     this.presentToast('Saliste De Sesion');
     this.navCtrl.navigateForward('/login');
   }

   async presentToast(msg: string) {
    this.toast= await this.toastController.create({
      message: msg,
      duration: 2000});
      this.toast.present();
  }

  async getUserInfo(uid: string){
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestoreService.getDoc<Usuario>(path, uid).subscribe(async res => {

this.usuario = res!;

    });
    }
}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { MenuController, LoadingController, ToastController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestorageService } from '../../services/firestorage.service';
import { FirestoreService } from '../../services/firestore.service';
import {Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario : Usuario={
    uid: '',
    correo: '',
    contra: '',
    nombre: '',
    celular: '',
    referencia: '',
    foto: '',
};
newFile : ' '| undefined;
toast: any;
uid = '';
loading: any;
suscriberUserInfo: Subscription | undefined;
  constructor(  public menu : MenuController,
    public firebaseauthService : FirebaseauthService,
    public firestorageService : FirestorageService,
    public firestoreService : FirestoreService,
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController
           
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
   const uid = await this.firebaseauthService.getUid();
   console.log(uid);
  }

  initUsuario(){

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

  async presentToast(msg: string) {
    this.toast= await this.toastController.create({
      message: msg,
      duration: 2000});
      this.toast.present();
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



  async newImageUpload( event : any){

    if (event.target.files && event.target.files[0]){
    this.newFile = event.target.files[0];
    
        const reader = new FileReader();
        reader.onload =((image) => {
          this.usuario.foto = image.target!.result as string;
    
        });
        reader.readAsDataURL(event.target.files[0]);
    
    }
    }
   async registrarse(){
      const credenciales ={
        correo: this.usuario.correo,
        contra: this.usuario.contra,
      };
   const res = await  this.firebaseauthService.registrar(credenciales.correo , credenciales.contra).catch(err => {
    console.log('error -> ',err);
   });
   const uid = await this.firebaseauthService.getUid();
   this.usuario.uid = uid!;
   this.guardarUser();
   this.goToHome();
   //console.log(uid);



  }

 async guardarUser(){
   // this.presentLoading();
    
    const path = 'Usuarios';
    const name = this.usuario.nombre;
  if(this.newFile !== undefined){
    const res = await this.firestorageService.uploadImage(this.newFile, path, name);
  console.log('recibi res de la promesa',res);
    console.log('Fin de la funcion -> newImageUpload');
      this.usuario.foto = res;
  }
  
    this.firestoreService.creatDoc(this.usuario, path, this.usuario.uid).then(res =>{
      
  console.log('Guardado con exitos');
      // this.loading.dismiss();
//this.presentToast('Guardado con exito');
    }).catch(error => { 
   //   this.presentToast('No se pudo guardar');
    }); 
   /* this.usuario ={
      uid: '',
      correo: '',
      contra: '',
      nombre: '',
      celular: '',
      referencia: '',
      foto: '',
    };*/
  }
   async salir(){
   /* const uid = await this.firebaseauthService.getUid();
    console.log(uid);*/ 
    this.firebaseauthService.logout();
    this.suscriberUserInfo?.unsubscribe();
    this.presentToast('Saliste De Sesion');
    this.navCtrl.navigateForward('/login');
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cerrando Sesion...',
      duration: 3000,
    });

    this.loading.present();
  }

  getUserInfo(uid: string){
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestoreService.getDoc<Usuario>(path, uid).subscribe(res => {

this.usuario = res!;
    });
    }

    ingresar(){
      const credenciales ={
        correo: this.usuario.correo,
        contra: this.usuario.contra,
      };
      this.firebaseauthService.login(credenciales.correo , credenciales.contra).then(
        res => {
        console.log('ingreso con exito');
        
        }
      );
    }
    goToHome(){
      this.navCtrl.navigateForward('/home');
    }   
}

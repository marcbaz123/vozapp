import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css']
})
export class PoliticasComponent implements OnInit {
  
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
  constructor(   
    private  firebaseauthService : FirebaseauthService,
    public firestoreService: FirestoreService,
    public menu : MenuController,
    private navCtrl: NavController
  ) {
    this.firebaseauthService.stateAuth().subscribe(res =>{
      console.log(res);
      if(res!=null){
  this.uid = res.uid;
  this.getUserInfo(this.uid);
      }
    });
   }

  ngOnInit() {

    this.menu.enable(false);
  }
  async getUserInfo(uid: string){
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestoreService.getDoc<Usuario>(path, uid).subscribe(async res => {

this.usuario = res!;

    });
    }
    goToHome(){
      this.menu.enable(true);
      this.navCtrl.navigateForward('/home');
    }
}

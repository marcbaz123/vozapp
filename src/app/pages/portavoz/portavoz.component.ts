import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-portavoz',
  templateUrl: './portavoz.component.html',
  styleUrls: ['./portavoz.component.scss'],
})
export class PortavozComponent implements OnInit {
  
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
      public firestoreService: FirestoreService
    
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

  openWhatsapp() {
    window.open('https://api.whatsapp.com/send?phone='+992730124,'_system');
    
  }
  async getUserInfo(uid: string){
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestoreService.getDoc<Usuario>(path, uid).subscribe(async res => {

this.usuario = res!;

    });
    }

}

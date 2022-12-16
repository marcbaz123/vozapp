import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Portavoz } from 'src/app/models/portavoz.models';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirestorageService } from '../../services/firestorage.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Usuario } from 'src/app/models/usuario.models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  portavoces: Portavoz[] = [];
  newPortavoz: Portavoz ={
  nombre : '',
  correo: '',
  descripcion: '',
  edad: null,  
  foto: '',
  id: this.firestoreService.getId(),
  fecha: new Date(),
  celular:'',
};

enableNewPortavoz = false;
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
private pathh = 'Usuarios/';
private path = 'Portavoces/';
uid = '';
loading: any;
toast: any;
handlerMessage: any;
newImage= '';
newFile: '' | undefined;
  suscriberUserInfo: any;
  
  constructor(public menu : MenuController,
    public firestoreService: FirestoreService,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public alertController : AlertController,
    public firestorageService : FirestorageService,
    public firebaseauthService : FirebaseauthService
) {
  this.loadUsuario();
    
  this.firebaseauthService.stateAuth().subscribe(res =>{
    console.log(res);
    if(res!=null){
this.uid = res.uid;
this.getUserInfo(this.uid);
    }
  });
 }

async ngOnInit() {
this.getPortavoces();
const uid = await this.firebaseauthService.getUid();
console.log(uid);
}


async guardarPortavoces(){
this.presentLoading();

const path = 'Portavoces';
const name = this.newPortavoz.nombre;

const res = await this.firestorageService.uploadImage(this.newFile, path, name);
/*  console.log('recibi res de la promesa',res);
console.log('Fin de la funcion -> newImageUpload');*/
this.newPortavoz.foto = res;

this.firestoreService.creatDoc(this.newPortavoz, this.path, this.newPortavoz.id).then(res =>{
this.loading.dismiss();
this.presentToast('Guardado con exito');
}).catch(error => {
this.presentToast('No se pudo guardar');
}); 
this.newPortavoz ={
nombre : '',
correo: '',
descripcion: '',
edad: null,  
foto: '',
id: this.firestoreService.getId(),
fecha: new Date(),
celular:'',
};
}

getPortavoces(){
this.firestoreService.getCollection<Portavoz>(this.path).subscribe( res=>{
this.portavoces = res;
} );
}


async deletePortavoz(portavoz: Portavoz){
const alert = await this.alertController.create({
header: 'Advertencia',
message:'Seguro desea <strong>eliminar</strong> a este portavoz',
buttons: [
{
text: 'Cancelar',
role: 'cancel',
handler: () => {
  this.handlerMessage = 'Alert canceled';
  //this.alertController.dismiss();
},
},
{
text: 'OK',
role: 'confirm',
handler: () => {
  this.handlerMessage = 'Alert confirmed';
  this.firestoreService.deleteDoc(this.path, portavoz.id).then(res =>{
    this.presentToast('Eliminado con exito');
    this.alertController.dismiss();
  }).catch(error=> {
  this.presentToast('No se pudo eliminar a este portavoz');
  });
},
},
],
});

await alert.present();


}

nuevo(){
this.enableNewPortavoz = true;
this.newPortavoz ={
nombre : '',
correo: '',
descripcion: '',
edad: null,  
foto: '',
id: this.firestoreService.getId(),
fecha: new Date(),
celular:'',
};

}
async presentLoading() {
this.loading = await this.loadingCtrl.create({
message: 'Aguarde 3 segundos...',
duration: 3000,
});

this.loading.present();
}
async presentToast(msg: string) {
this.toast= await this.toastController.create({
message: msg,
duration: 2000});
this.toast.present();
}

async newImageUpload( event : any){

if (event.target.files && event.target.files[0]){
this.newFile = event.target.files[0];

const reader = new FileReader();
reader.onload =((image) => {
this.newPortavoz.foto = image.target?.result as string;

});
reader.readAsDataURL(event.target.files[0]);

}
}
openWhatsapp() {
  this.getPortavoces();
  window.open('https://api.whatsapp.com/send?phone='+this.newPortavoz.celular,'_system');
  
}

  loadUsuario(){
   this.firestoreService.getCollection<Usuario>(this.pathh).subscribe(res => {
    console.log(res);
     this.usuarios = res;
        }); 
  }
  getUserInfo(uid: string){
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestoreService.getDoc<Usuario>(path, uid).subscribe(res => {

this.usuario = res!;
    });
    } 
}
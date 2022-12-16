import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { RegistroComponent } from './registro/registro.component';
import { PortavozComponent } from './portavoz/portavoz.component';


@NgModule({
  declarations: [
HomeComponent,
PerfilComponent,
LoginComponent,
PoliticasComponent,
RegistroComponent,
PortavozComponent

  ],
  imports: [
    CommonModule,
    IonicModule, 
    RouterModule,
    FormsModule,
    
  ]
})
export class PagesModule { }

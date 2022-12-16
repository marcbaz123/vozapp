import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPortavocesComponent } from './set-portavoces/set-portavoces.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SetPortavocesComponent
  ],
  imports: [
    CommonModule,
     IonicModule,
     FormsModule,
     RouterModule
  ]
})
export class BackendModule { }

import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetPortavocesComponent } from './backend/set-portavoces/set-portavoces.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './pages/login/login.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PortavozComponent } from './pages/portavoz/portavoz.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
   {path: 'home', component: HomeComponent},
   {path: 'set-portavoces', component: SetPortavocesComponent},
   {path: 'perfil', component: PerfilComponent},
   {path: 'registro', component: RegistroComponent},
   {path: 'politicas', component: PoliticasComponent},
   {path: 'portavoz', component: PortavozComponent},
   {path: '', component: LoginComponent },
   {path: '**' , redirectTo: 'login', pathMatch: 'full' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

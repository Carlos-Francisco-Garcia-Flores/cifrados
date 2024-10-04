import { Routes } from '@angular/router';
import { CesarComponent } from './cesar/cesar.component';
import { EscitalaComponent } from './escitala/escitala.component';
import { FormularioComponent } from './formulario/formulario.component';
import { HomeComponent } from './home/home.component';
import { ElgamalComponent } from './elgamal/elgamal.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal
  { path: 'cesar', component: CesarComponent }, // Página para Cifrado César
  { path: 'escitala', component: EscitalaComponent }, // Página para Cifrado Escítala
  { path: 'formulario', component: FormularioComponent }, // Página para el formulario de cifrado
  { path: 'formularioelgamal', component: ElgamalComponent } // Página para el formulario de cifrado

];

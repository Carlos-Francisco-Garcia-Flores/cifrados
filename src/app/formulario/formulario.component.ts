import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule], 
})
export class FormularioComponent {
  cifradoForm: FormGroup;
  datosCifrados: any = null;
  datosDescifrados: any = null;
  mostrarClave: boolean = false;

  constructor(private fb: FormBuilder) {
    this.cifradoForm = this.fb.group({
      metodo: ['blowfish', Validators.required], // Campo obligatorio
      nombre: ['', [Validators.required, Validators.minLength(2)]],  // Validar nombre con mínimo 2 caracteres
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],  // Validar formato de email
      password: ['', [Validators.required, Validators.minLength(6)]],  // Validar contraseña con mínimo 6 caracteres
      tcredito: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],  // Validar que la tarjeta sea de 16 dígitos
      clave: [''] // Clave requerida para Blowfish, se añadirá validación condicionalmente
    });

    this.onCifradoChange();  // Detectar si hay cambios en el método seleccionado
  }

  onCifradoChange() {
    const metodo = this.cifradoForm.get('metodo')?.value;

    // Si el método es Blowfish, hacer que la clave sea obligatoria
    if (metodo === 'blowfish') {
      this.cifradoForm.get('clave')?.setValidators([Validators.required, Validators.minLength(8)]);
      this.mostrarClave = true;
    } else {
      this.cifradoForm.get('clave')?.clearValidators();
      this.mostrarClave = false;
    }
    this.cifradoForm.get('clave')?.updateValueAndValidity();  // Actualizar validación
  }

  onSubmit() {
    // Verificar si el formulario es válido antes de cifrar
    if (this.cifradoForm.invalid) {
      alert('Por favor, complete el formulario correctamente.');
      return;
    }

    const metodo = this.cifradoForm.get('metodo')?.value;
    const clave = this.cifradoForm.get('clave')?.value;
    const nombre = this.cifradoForm.get('nombre')?.value;
    const apellido = this.cifradoForm.get('apellido')?.value;
    const email = this.cifradoForm.get('email')?.value;
    const password = this.cifradoForm.get('password')?.value;
    const tcredito = this.cifradoForm.get('tcredito')?.value;

    // Cifrado de los datos
    this.datosCifrados = {
      nombre: this.cifrarDato(metodo, nombre, clave),
      apellido: this.cifrarDato(metodo, apellido, clave),
      email: this.cifrarDato(metodo, email, clave),
      password: this.cifrarDato(metodo, password, clave),
      tcredito: this.cifrarDato(metodo, tcredito, clave)
    };

    // Resetear los datos descifrados al cifrar
    this.datosDescifrados = null;
  }

  // Método para cifrar los datos en base al método seleccionado
  cifrarDato(metodo: string, mensaje: string, clave: string): string {
    switch (metodo) {
      case 'blowfish':
        return this.cifrarBlowfish(mensaje, clave);
      case 'sha3-224':
        return CryptoJS.SHA3(mensaje, { outputLength: 224 }).toString();
      case 'sha3-256':
        return CryptoJS.SHA3(mensaje, { outputLength: 256 }).toString();
      case 'sha3-384':
        return CryptoJS.SHA3(mensaje, { outputLength: 384 }).toString();
      case 'sha3-512':
        return CryptoJS.SHA3(mensaje, { outputLength: 512 }).toString();
      default:
        return 'Método de cifrado no válido';
    }
  }

  cifrarBlowfish(mensaje: string, clave: string): string {
    return CryptoJS.Blowfish.encrypt(mensaje, clave).toString();
  }

  descifrarBlowfish(ciphertext: string, clave: string): string {
    const bytes = CryptoJS.Blowfish.decrypt(ciphertext, clave);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Método para descifrar los datos cifrados (solo Blowfish)
  onDescifrar() {
    const metodo = this.cifradoForm.get('metodo')?.value;
    const clave = this.cifradoForm.get('clave')?.value;

    if (metodo === 'blowfish' && this.datosCifrados) {
      this.datosDescifrados = {
        nombre: this.descifrarBlowfish(this.datosCifrados.nombre, clave),
        apellido: this.descifrarBlowfish(this.datosCifrados.apellido, clave),
        email: this.descifrarBlowfish(this.datosCifrados.email, clave),
        password: this.descifrarBlowfish(this.datosCifrados.password, clave),
        tcredito: this.descifrarBlowfish(this.datosCifrados.tcredito, clave)
      };
    }
  }
}

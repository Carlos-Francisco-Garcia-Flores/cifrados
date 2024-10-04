import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ElGamal } from './elgamal'; 
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-elgamal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule], 
  templateUrl: './elgamal.component.html',
  styleUrls: ['./elgamal.component.css'],

})
export class ElgamalComponent {
  elgamalForm: FormGroup;
  encryptedMessage: { c1: number; c2: number } | null = null;
  decryptedMessage: string = '';

  p: number = 23;  // Número primo grande
  g: number = 5;   // Número base
  publicKey: number = 7;   // Clave pública
  privateKey: number = 15;  // Clave privada

  constructor(private fb: FormBuilder) {
    this.elgamalForm = this.fb.group({
      message: [''],
    });
  }

  // Cifrar el mensaje
  encryptMessage() {
    const message = this.elgamalForm.get('message')?.value;
    const messageAsNumber = this.stringToNumber(message); // Convertir el mensaje en número
    const k = this.getRandomInt(1, this.p - 2); // Valor aleatorio k
    const c1 = this.modPow(this.g, k, this.p); // c1 = g^k mod p
    const s = this.modPow(this.publicKey, k, this.p); // s = publicKey^k mod p
    const c2 = (messageAsNumber * s) % this.p; // c2 = mensaje * s mod p
    this.encryptedMessage = { c1, c2 };
  }

  // Descifrar el mensaje
  decryptMessage() {
    if (this.encryptedMessage) {
      const { c1, c2 } = this.encryptedMessage;
      const s = this.modPow(c1, this.privateKey, this.p); // s = c1^privateKey mod p
      const sInverse = this.modInverse(s, this.p); // s^-1 mod p
      const decryptedNumber = (c2 * sInverse) % this.p; // mensaje = c2 * s^-1 mod p
      this.decryptedMessage = this.numberToString(decryptedNumber); // Convertir número en cadena
    }
  }

  // Convertir un string a número
  stringToNumber(str: string): number {
    return str.split('').reduce((acc, char) => acc * 256 + char.charCodeAt(0), 0);
  }

  // Convertir número a string
  numberToString(num: number): string {
    let result = '';
    while (num > 0) {
      result = String.fromCharCode(num % 256) + result;
      num = Math.floor(num / 256);
    }
    return result;
  }

  // Calcular (base^exp) % mod
  modPow(base: number, exp: number, mod: number): number {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  }

  // Calcular el inverso modular
  modInverse(a: number, m: number): number {
    const m0 = m;
    let y = 0,
      x = 1;
    if (m === 1) return 0;
    while (a > 1) {
      const q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0) x += m0;
    return x;
  }

  // Generar un número aleatorio entre min y max
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

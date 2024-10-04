import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cesar',
  standalone: true,
  templateUrl: './cesar.component.html',
  styleUrls: ['./cesar.component.css'],
  imports: [FormsModule, CommonModule, RouterModule] 
})
export class CesarComponent {
  message: string = '';
  shift: number = 0;
  operation: string = 'encrypt';
  result: string = '';
  messageError: string | null = null;
  shiftError: string | null = null;

  onSubmit() {
    if (!this.message) {
      this.messageError = 'El mensaje no puede estar vacío';
      return;
    }

    if (!this.shift || this.shift < 0) {
      this.shiftError = 'El desplazamiento debe ser un número positivo';
      return;
    }

    this.messageError = null;
    this.shiftError = null;
    this.result = this.operation === 'encrypt' ? this.encrypt(this.message, this.shift) : this.decrypt(this.message, this.shift);
  }

  encrypt(message: string, shift: number): string {
    return message.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65); // Mayúsculas
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97); // Minúsculas
      }
      return char; // Deja los caracteres especiales sin cambios
    }).join('');
  }

  decrypt(message: string, shift: number): string {
    return this.encrypt(message, 26 - (shift % 26)); // Usa el mismo método de encriptación pero con u
  }
}
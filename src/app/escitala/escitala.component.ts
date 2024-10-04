import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-escitala',
  templateUrl: './escitala.component.html',
  styleUrls: ['./escitala.component.css'],
  imports: [FormsModule, RouterModule] // Añadir FormsModule a los imports
})
export class EscitalaComponent {
  message: string = '';
  columns: number = 0;
  operation: string = 'encrypt';
  result: string = '';

  // Función para cifrar y descifrar usando el Cifrado Escítala
  escitalaCipher(text: string, columns: number, encrypt: boolean = true): string {
    const rows = Math.ceil(text.length / columns);
    const grid = Array.from({ length: rows }, () => Array(columns).fill(''));

    if (encrypt) {
      let index = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns && index < text.length; c++) {
          grid[r][c] = text[index++];
        }
      }
      return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]).join('')).join('');
    } else {
      let decrypted = '';
      const charsPerColumn = Math.ceil(text.length / columns);
      let index = 0;

      for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows && index < text.length; r++) {
          grid[r][c] = text[index++];
        }
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          if (grid[r][c]) decrypted += grid[r][c];
        }
      }

      return decrypted;
    }
  }

  onSubmit() {
    if (this.operation === 'encrypt') {
      this.result = this.escitalaCipher(this.message, this.columns, true);
    } else {
      this.result = this.escitalaCipher(this.message, this.columns, false);
    }
  }
}

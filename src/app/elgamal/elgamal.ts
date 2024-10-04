export class ElGamal {
  p: number;
  g: number;
  publicKey: number;
  privateKey: number;

  constructor() {
    this.p = this.getLargePrime(); // Generar un número primo grande
    this.g = this.getRandomInt(2, this.p - 2); // Generar un número g aleatorio
    this.privateKey = this.getRandomInt(1, this.p - 2); // Clave privada
    this.publicKey = this.modPow(this.g, this.privateKey, this.p); // Clave pública
  }

  // Cifrar un mensaje
  encrypt(message: number): { c1: number; c2: number } {
    const k = this.getRandomInt(1, this.p - 2);
    const c1 = this.modPow(this.g, k, this.p); // c1 = g^k mod p
    const s = this.modPow(this.publicKey, k, this.p); // s = y^k mod p
    const c2 = (message * s) % this.p; // c2 = m * s mod p
    return { c1, c2 };
  }

  // Descifrar un mensaje
  decrypt(ciphertext: { c1: number; c2: number }): number {
    const { c1, c2 } = ciphertext;
    const s = this.modPow(c1, this.privateKey, this.p); // s = c1^x mod p
    const sInverse = this.modInverse(s, this.p); // s^-1 mod p
    return (c2 * sInverse) % this.p; // m = c2 * s^-1 mod p
  }

  // Convertir una cadena a número
  stringToNumber(str: string): number {
    return str.split('').reduce((acc, char) => acc * 256 + char.charCodeAt(0), 0);
  }

  // Convertir un número a cadena
  numberToString(num: number): string {
    let result = '';
    while (num > 0) {
      result = String.fromCharCode(num % 256) + result;
      num = Math.floor(num / 256);
    }
    return result;
  }

  // Obtener un número primo grande (simplificado para pruebas)
  getLargePrime(): number {
    return 23; // En un caso real, debería ser un número primo grande
  }

  // Calcular base^exp % mod
  modPow(base: number, exp: number, mod: number): number {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return result;
  }

  // Calcular inverso modular
  modInverse(a: number, m: number): number {
    const m0 = m;
    let y = 0, x = 1;
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

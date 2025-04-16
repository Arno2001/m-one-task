import { compare, hashSync } from 'bcryptjs';

export class GeneratorProvider {
  // Generates a bcrypt hash from a text password
  static generateHash(password: string): string {
    return hashSync(password, 10);
  }

  // Validates a text password against a bcrypt hash
  static validateHash(password: string, hash: string | null): Promise<boolean> {
    if (!hash) {
      return Promise.resolve(false);
    }

    return compare(password, hash);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { isNil } from 'lodash';

config();

// Service to centralize and strongly type access to environment-based configuration
@Injectable()
export class ApiConfigService {
  constructor(private nestConfigService: NestConfigService) {}

  // Retrieves a config value and parses it as a number
  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  // Retrieves a config value and processes escaped newlines
  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  // Returns JWT-related config values (used in auth)
  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      expirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
    };
  }

  // Returns basic app-level config values
  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  // Retrieves the raw config value or throws if it's missing
  private get(key: string): string {
    const value = this.nestConfigService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}

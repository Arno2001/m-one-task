import { getValue, setValue } from 'express-ctx';
import type { UserType } from '../modules/user/user.type';

// Stores and retrieves request-scoped data using a namespaced key
export class ContextProvider {
  private static readonly nameSpace = 'request';

  private static readonly authUserKey = 'user_key';

  // Retrieves a value from the context by key
  private static get<T>(key: string): T | undefined {
    return getValue<T>(ContextProvider.getKeyWithNamespace(key));
  }

  // Stores a value in the context by key
  private static set(key: string, value: any): void {
    setValue(ContextProvider.getKeyWithNamespace(key), value);
  }

  // Prepends namespace to the given key
  private static getKeyWithNamespace(key: string): string {
    return `${ContextProvider.nameSpace}.${key}`;
  }

  // Stores the authenticated user in the context
  static setAuthUser(user: UserType): void {
    ContextProvider.set(ContextProvider.authUserKey, user);
  }

  // Retrieves the authenticated user from the context
  static getAuthUser(): UserType {
    return ContextProvider.get<UserType>(ContextProvider.authUserKey)!;
  }
}

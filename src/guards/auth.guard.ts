import type { IAuthGuard, Type } from '@nestjs/passport';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

// Wrapper for NestJS AuthGuard using the 'jwt' strategy
export function AuthGuard(): Type<IAuthGuard> {
  const strategies = ['jwt'];

  return NestAuthGuard(strategies);
}

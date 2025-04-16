import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UserType } from '../modules/user/user.type';
import { ContextProvider } from '../providers';

// Interceptor to set the authenticated user in the ContextProvider for global access
@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();

    const user = <UserType>request.user;
    ContextProvider.setAuthUser(user);

    return next.handle();
  }
}

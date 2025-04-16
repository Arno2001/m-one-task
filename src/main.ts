import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { setupSwagger } from './setup-swagger';
import { middleware } from 'express-ctx';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';

async function bootstrap() {
  // Create the NestJS app with Express and enable CORS
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const reflector = app.get(Reflector);

  // Globally apply ClassSerializerInterceptor to control object serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // Apply a global validation pipe to handle DTO validation and formatting errors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove any unexpected fields from the request
      transform: true, // Convert request data to the correct types (based on DTOs)
      dismissDefaultMessages: true, // Don't show default error messages
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // Return 422 on validation errors
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints ?? {}).join(', '),
        }));

        return new UnprocessableEntityException({
          statusCode: 422,
          error: 'Validation Failed',
          message: formattedErrors,
        });
      },
    }),
  );

  // Setup Swagger API docs
  setupSwagger(app);

  app.use(middleware);

  // Get app config values (like port) from the shared config service
  const configService = app.select(SharedModule).get(ApiConfigService);
  const port = configService.appConfig.port || 3000;
  await app.listen(port);

  console.info(`server running on port ${port}`);
}
void bootstrap();

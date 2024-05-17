import { ArticleModule } from '@modules/article/article.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpStatus, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (errors) => {
        //handle error when graphQL validation failed
        if (errors.extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
          return {
            message: errors.message,
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'BAD_REQUEST',
          };
        }

        //handle error when class-validator throw error
        if (errors.extensions.originalError) {
          const originalError = errors.extensions.originalError;
          return {
            message: originalError['message'],
            statusCode: originalError['statusCode'],
            error: originalError['error'],
          };
        }

        //handle others error
        return {
          message: errors.message,
          statusCode:
            errors.extensions.code || HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'INTERNAL_SERVER_ERROR',
        };
      },
    }),
    ArticleModule,
  ],
})
export class AppModule {}

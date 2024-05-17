import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

@ObjectType()
export class Article {
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  author: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  topic: string;

  @IsString()
  @MinLength(10, {
    message:
      'Content is too short, minimal length is $constraint1 characters, but actual is $value',
  })
  @Field()
  body: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @IsOptional()
  deletedAt?: Date;
}

@InputType()
export class FindArticleInput {
  @IsUUID()
  @IsNotEmpty()
  @Field()
  id: string;
}

@InputType()
export class ArticleInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  author: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  topic: string;

  @IsString()
  @MinLength(10, {
    message:
      'Content is too short, minimal length is $constraint1 characters, but actual is $value',
  })
  @Field()
  body: string;
}

@InputType()
export class UpdateArticleInput {
  @IsUUID()
  @Field()
  id: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  title?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  author?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  topic?: string;

  @IsString()
  @MinLength(10, {
    message:
      'Content is too short, minimal length is $constraint1 characters, but actual is $value',
  })
  @IsOptional()
  @Field({ nullable: true })
  body?: string;
}

@InputType()
export class FilterInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  title?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  author?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  topic?: string;

  @IsString()
  @MinLength(10, {
    message:
      'Content is too short, minimal length is $constraint1 characters, but actual is $value',
  })
  @IsOptional()
  @Field({ nullable: true })
  body?: string;
}

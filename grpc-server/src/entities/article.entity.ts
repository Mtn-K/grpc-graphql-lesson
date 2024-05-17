import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'articles' })
export class Article {
  @IsUUID('4', { message: 'Invalid UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'title', nullable: false })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'author', nullable: false })
  author: string;

  @IsString()
  @IsNotEmpty()
  @Column({ name: 'topic', nullable: false })
  topic: string;

  @IsString()
  @MinLength(10, {
    message:
      'Content is too short, minimal length is $constraint1 characters, but actual is $value',
  })
  @Column({ name: 'content', type: 'text' })
  body: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', default: null })
  deletedAt?: Date;
}

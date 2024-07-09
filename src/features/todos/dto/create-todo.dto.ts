import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class Extra {
  @IsArray()
  readonly tags: string[];

  @IsString()
  readonly description: string;
}

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly completed: boolean;

  @IsString()
  @IsNotEmpty()
  readonly priority: string;

  @IsOptional()
  readonly extra: Extra;
}

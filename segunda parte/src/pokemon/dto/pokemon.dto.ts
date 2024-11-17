import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  skills: string;
}

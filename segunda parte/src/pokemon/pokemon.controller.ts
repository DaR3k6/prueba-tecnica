import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';

@ApiTags('Pokémon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('json')
  @ApiOperation({ summary: 'Obtener todos los Pokémon desde un archivo JSON' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Pokémon leída exitosamente desde el archivo',
    schema: {
      example: [
        { name: 'bulbasaur', type: ['grass', 'poison'] },
        { name: 'charmander', type: ['fire'] },
      ],
    },
  })
  getPokemonJSON() {
    return this.pokemonService.readPokemonsFromFile();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Obtener un Pokémon por nombre' })
  @ApiParam({
    name: 'name',
    description: 'El nombre del Pokémon',
    example: 'pikachu',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles del Pokémon encontrado',
    schema: {
      example: { name: 'pikachu', type: ['electric'] },
    },
  })
  @ApiResponse({ status: 404, description: 'Pokémon no encontrado' })
  async getPokemon(@Param('name') name: string) {
    return this.pokemonService.getByNamePokemon(name);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los Pokémon registrados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los Pokémon registrados',
    schema: {
      example: [
        { name: 'bulbasaur', type: ['Grass', 'Poison'] },
        { name: 'charmander', type: ['Fire'] },
      ],
    },
  })
  async getAllPokemon() {
    return this.pokemonService.getAllPokemon();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo Pokémon' })
  @ApiBody({
    description: 'El nombre del Pokémon a registrar',
    schema: { example: { name: 'squirtle' } },
  })
  @ApiResponse({ status: 201, description: 'Pokémon registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  async registerPokemon(@Body('name') name: string) {
    return this.pokemonService.createPokemon(name);
  }

  @Delete(':name')
  @ApiOperation({ summary: 'Eliminar un Pokémon por nombre' })
  @ApiParam({
    name: 'name',
    description: 'El nombre del Pokémon a eliminar',
    example: 'charmander',
  })
  @ApiResponse({ status: 200, description: 'Pokémon eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Pokémon no encontrado' })
  async deletePokemon(@Param('name') name: string) {
    return this.pokemonService.deletePokemon(name);
  }
}

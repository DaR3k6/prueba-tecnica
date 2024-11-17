import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('json')
  getPokemonJSON() {
    return this.pokemonService.readPokemonsFromFile();
  }

  @Get(':name')
  async getPokemon(@Param('name') name: string) {
    return this.pokemonService.getByNamePokemon(name);
  }

  @Get()
  async getAllPokemon() {
    return this.pokemonService.getAllPokemon();
  }

  @Post()
  async registerPokemon(@Body('name') name: string) {
    return this.pokemonService.createPokemon(name);
  }

  @Delete(':name')
  async deletePokemon(@Param('name') name: string) {
    return this.pokemonService.deletePokemon(name);
  }
}

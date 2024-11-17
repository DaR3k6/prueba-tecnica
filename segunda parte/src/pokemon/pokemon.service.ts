import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PokemonDTO } from './dto/pokemon.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Pokemon } from '@prisma/client';
import { Response } from './type/response.type';
import { DatabaseService } from 'src/database/database.service';
import { AxiosError } from 'axios';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

const FILE_PATH = './json/pokemon.json';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('POKEAPI_URL');
  }

  /**
   * Obtiene un Pokémon por su nombre (de base de datos o API).
   * @param name Nombre del Pokémon
   * @returns Pokémon encontrado
   */
  async getByNamePokemon(name: string): Promise<Response<PokemonDTO>> {
    const pokemonExistente = await this.databaseService.pokemon.findUnique({
      where: { name },
    });

    if (pokemonExistente) {
      return {
        response: true,
        message: 'Pokémon obtenido desde la base de datos',
        data: pokemonExistente,
      };
    }

    const pokemonDesdeApi = await this.fetchPokemonFromApi(name);

    if (!pokemonDesdeApi) throw new NotFoundException('Pokémon no encontrado');

    return {
      response: true,
      message: 'Pokémon obtenido desde la PokeAPI',
      data: pokemonDesdeApi,
    };
  }

  /**
   * Crea un nuevo Pokémon en la base de datos.
   * @param name Nombre del Pokémon
   * @returns Pokémon creado
   */
  async createPokemon(name: string): Promise<Response<PokemonDTO>> {
    const pokemonDesdeApi = await this.fetchPokemonFromApi(name);

    // Verifica si el Pokémon ya existe en la base de datos
    const pokemonExistente = await this.databaseService.pokemon.findUnique({
      where: { name },
    });

    if (pokemonExistente) {
      throw new NotFoundException(
        'El Pokémon ya está registrado en la base de datos',
      );
    }

    // Guardar en el archivo JSON
    await this.savePokemonToJSON(pokemonDesdeApi);

    const nuevoPokemon = await this.databaseService.pokemon.create({
      data: {
        name: pokemonDesdeApi.name,
        type: pokemonDesdeApi.type,
        skills: pokemonDesdeApi.skills,
      },
    });

    return {
      response: true,
      message: 'Pokémon registrado con éxito',
      data: nuevoPokemon,
    };
  }

  /**
   * Obtiene todos los Pokémon registrados.
   * @returns Lista de Pokémon
   */
  async getAllPokemon(): Promise<Response<Pokemon[]>> {
    const pokemons = await this.databaseService.pokemon.findMany();
    return {
      response: true,
      message: 'Pokémons obtenidos con éxito',
      data: pokemons,
    };
  }

  /**
   * Elimina un Pokémon de la base de datos.
   * @param name Nombre del Pokémon
   * @returns Pokémon eliminado
   */
  async deletePokemon(name: string): Promise<Response<Pokemon>> {
    const pokemonExistente = await this.databaseService.pokemon.findUnique({
      where: { name },
    });

    if (!pokemonExistente) {
      throw new NotFoundException('Pokémon no encontrado en la base de datos');
    }

    const pokemonEliminado = await this.databaseService.pokemon.delete({
      where: { name },
    });

    // Actualizar el archivo JSON
    await this.updatePokemonJSONAfterDelete(name);

    return {
      response: true,
      message: 'Pokémon eliminado con éxito',
      data: pokemonEliminado,
    };
  }

  /**
   * Guarda un Pokémon en el archivo JSON.
   * @param pokemonDTO Información del Pokémon
   */
  private async savePokemonToJSON(pokemonDTO: PokemonDTO): Promise<void> {
    let pokemons = this.readPokemonsFromFile();

    pokemons.push(pokemonDTO);

    this.writePokemonsToFile(pokemons);
  }

  /**
   * Lee los Pokémon desde el archivo JSON.
   * @returns Lista de Pokémon
   */
   readPokemonsFromFile(): PokemonDTO[] {
    const dirPath = path.dirname(FILE_PATH);

    if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });

    if (!existsSync(FILE_PATH)) {
      this.writePokemonsToFile([]);
      return [];
    }

    const fileData = readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(fileData);
  }

  /**
   * Escribe los Pokémon en el archivo JSON.
   * @param pokemons Lista de Pokémon
   */
  private writePokemonsToFile(pokemons: PokemonDTO[]): void {
    writeFileSync(FILE_PATH, JSON.stringify(pokemons, null, 2), 'utf8');
  }

  /**
   * Actualiza el archivo JSON después de eliminar un Pokémon.
   * @param name Nombre del Pokémon eliminado
   */
  private async updatePokemonJSONAfterDelete(name: string): Promise<void> {
    let pokemons = this.readPokemonsFromFile();

    // Filtrar el Pokémon eliminado
    pokemons = pokemons.filter((pokemon: PokemonDTO) => pokemon.name !== name);

    this.writePokemonsToFile(pokemons);
  }

  /**
   * Consulta la información de un Pokémon desde la PokeAPI.
   * @param name Nombre del Pokémon
   * @returns Información del Pokémon
   */
  private async fetchPokemonFromApi(name: string): Promise<PokemonDTO> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.apiUrl}/pokemon/${name}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data || error.message);
          throw new NotFoundException(
            'No se pudo obtener el Pokémon con el nombre proporcionado.',
          );
        }),
      ),
    );

    const { data } = response;

    if (Array.isArray(data))
      throw new NotFoundException(
        'Se esperaba un Pokémon único, pero se obtuvo una lista.',
      );

    return {
      name: data.name,
      type: data.types.map((type: any) => type.type.name).join(', '),
      skills: data.abilities
        .map((ability: any) => ability.ability.name)
        .join(', '),
    };
  }
}

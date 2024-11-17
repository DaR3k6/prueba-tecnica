import { Module } from '@nestjs/common';
import { configModule } from './config/config-module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonController } from './pokemon/pokemon.controller';
import { DataModule } from './database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [configModule, PokemonModule, HttpModule],
  controllers: [PokemonController],
  providers: [DataModule],
})
export class AppModule {}

const Pokemon = require("../model/pokemonModel");
const axios = require("axios");

const getPokemonAPI = async (name) => {
	try {
		// Llamo la api de pokemon
		const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

		if (!response || !response.data) throw new Error("Pokemon not found in the API");

		const { types, abilities } = response.data;

		console.log(response.data);

		// Traigo los tipos y habilidades
		const typesArr = types.map((type) => type.type.name);
		const skills = abilities.map((ability) => ability.ability.name);

		return {
			name: name,
			type: typesArr,
			skills: skills,
		};
	} catch (err) {
		throw new Error("Pokemon not found in the API", err.message);
	}
};

const createPokemon = async (pokemonData) => {
	const newPokemon = new Pokemon(pokemonData);
	return newPokemon.save();
};

const fillNamePokemon = async (name) => {
	return Pokemon.findOne({ name: name });
};

module.exports = { getPokemonAPI, createPokemon, fillNamePokemon };

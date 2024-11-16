const getPokemonFromAPI = require("../service/poke-service");

const getPokemonController = async (req, res) => {
	const { name } = req.params;
	try {
		const pokemonExists = await getPokemonFromAPI.fillNamePokemon(name);

		if (!pokemonExists) {
			const apiData = await getPokemonFromAPI.getPokemonAPI(name);

			const pokemonCreate = await getPokemonFromAPI.createPokemon(apiData);

			return res.status(201).json({
				response: true,
				data: pokemonCreate,
				message: "Pokémon creado exitosamente",
			});
		}
		return res.status(200).json({
			response: true,
			data: pokemonExists,
			message: "Pokémon encontrado",
		});
	} catch (err) {
		return res.status(500).json({
			response: false,
			message: "Error al procesar la solicitud",
			errorDetails: err.message,
		});
	}
};

module.exports = { getPokemonController };

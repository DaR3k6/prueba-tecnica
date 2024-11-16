const getPokemonFromAPI = require("../service/poke-service");

const getPokemonController = async (req, res) => {
	const { name } = req.params;

	try {
		// Validar si hay campos vacios
		if (!name || typeof name !== "string" || name.trim() === "") {
			return res.status(400).json({
				response: false,
				message: "El nombre del Pokémon es requerido.",
			});
		}

		// Validar si el Pokémon existe en la base de datos
		const pokemonExists = await getPokemonFromAPI.fillNamePokemon(name.toLowerCase());

		if (!pokemonExists) {
			// Validar la respuesta de la API
			const apiData = await getPokemonFromAPI.getPokemonAPI(name.toLowerCase());

			if (!apiData || !apiData.name) {
				return res.status(404).json({
					response: false,
					message: "No se pudo obtener información del Pokémon desde la API.",
				});
			}

			// Crear el Pokémon en la base de datos
			await getPokemonFromAPI.createPokemon(apiData);

			return res.status(201).json({
				response: true,
				message: "Pokémon creado exitosamente",
				data: apiData,
			});
		}

		return res.status(200).json({
			response: true,
			message: "Pokémon encontrado",
			data: pokemonExists,
		});
	} catch (err) {
		// Manejo de errores
		return res.status(500).json({
			response: false,
			message: "Error al procesar la solicitud",
			errorDetails: err.message,
		});
	}
};

module.exports = { getPokemonController };

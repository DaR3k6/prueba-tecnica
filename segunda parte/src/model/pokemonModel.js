const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		type: {
			type: [String],
			required: true,
		},
		skills: {
			type: [String],
			required: true,
		},
	},
	{
		collection: "pokemon",
	}
);

module.exports = mongoose.model("pokemon", pokemonSchema);

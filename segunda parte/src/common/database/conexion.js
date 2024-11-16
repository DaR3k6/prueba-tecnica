const mongoose = require("mongoose");
require("dotenv").config();

const conexion = async () => {
	const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_DB}`;

	try {
		await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log("Conexión a la base de datos MongoDB exitosa");
	} catch (error) {
		console.log("No se ha podido conectar a la base de datos", error);
	}
};

module.exports = conexion;

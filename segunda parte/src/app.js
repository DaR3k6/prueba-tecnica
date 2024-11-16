const express = require("express");
const cors = require("cors");
const conexion = require("./common/database/conexion");
const pokemonRoutes = require("./router/poke-router");
require("dotenv/config.js");

conexion();

const app = express();
const puerto = process.env.PORT || process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", pokemonRoutes);

app.listen(puerto, () => {
	console.log(`Servidor en funcionamiento en: http://localhost:${puerto}`);
});

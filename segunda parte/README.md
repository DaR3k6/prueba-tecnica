# Poke API Backend

Este proyecto es una API backend relacionada con la PokeAPI, creada con Node.js y NestJS. A continuación, se describen los pasos para levantar el proyecto localmente y desplegarlo en producción.

## Requisitos previos

- Node.js y npm instalados.
- Docker y Docker Compose instalados.
- PostgreSQL configurado.

## Instrucciones para levantar el proyecto localmente

### 1. Clonar el repositorio

Primero, clona este repositorio a tu máquina local:

```bash
git clone https://github.com/usuario/repositorio.git
cd repositorio
```

### 2. Instalar dependencias de Node.js

Instala todos los paquetes de Node.js necesarios:

```bash
npm i
```

### 3. Crear el archivo `.env`

En la raíz del proyecto, crea un archivo `.env` con la siguiente configuración. Asegúrate de reemplazar `yourUser`, `yourPassword`, y `yourDatabase` con las credenciales correspondientes.

```env
# Información de la base de datos PostgreSQL
DATABASE_URL="postgresql://yourUser:yourPassword@localhost:${DB_PORT}/yourDatabase?schema=public"

# Credenciales para acceder a la base de datos PostgreSQL en Docker
DB_PASSWORD="yourPassword"
DB_NAME="yourDatabase"
DB_USER="yourUser"

# Puerto para PostgreSQL
DB_PORT=5432

# Puerto para Adminer
ADMINER_PORT=8080

# URL base para las peticiones Axios en NestJS (puede ser el endpoint de la PokeAPI)
POKEAPI_URL="https://pokeapi.co/api/v2"

# Puerto para la aplicación
PORT=3000
HOST_API="http://localhost:3000/"
```

### 4. Levantar el contenedor de Docker

Usa Docker Compose para levantar el contenedor con la base de datos PostgreSQL:

```bash
docker-compose up -d
```

Esto iniciará un contenedor de PostgreSQL en segundo plano.

### 5. Acceder a la base de datos con Adminer

Abre el siguiente enlace en tu navegador:

```
http://localhost:8080/
```

Adminer debería abrirse en la interfaz web. Por defecto, seleccionará MySQL, pero deberás cambiar a PostgreSQL y completar los campos con las credenciales que configuraste en el archivo `.env`.

- **Sistema de base de datos:** PostgreSQL
- **Servidor:** `localhost`
- **Usuario:** `yourUser`
- **Contraseña:** `yourPassword`
- **Base de datos:** `yourDatabase`

![Captura de pantalla](https://github.com/user-attachments/assets/85d1d97c-22bf-4006-b26e-298b604cb942)

Una vez conectado, la base de datos se creará automáticamente.

![Base de datos PostgreSQL creada](https://github.com/user-attachments/assets/787c8b38-a6e7-4848-977e-b79f9fdcbb14)

### 6. Desplegar la API con Swagger

El proyecto incluye una documentación de la API desplegada con Swagger. Puedes acceder a la API de producción en la siguiente URL:

```
https://poke-api-production-32d6.up.railway.app/api#/
```

Este enlace te llevará a la interfaz de Swagger, donde podrás realizar peticiones a la API.

### 7. Documentación local

Si prefieres consultar la documentación localmente, ve a la carpeta `documentation` del proyecto, donde encontrarás la documentación tanto para el entorno local como para el despliegue.

---

### Notas

- El contenedor de Docker levanta automáticamente la base de datos PostgreSQL.
- El archivo `.env` debe ser configurado correctamente antes de levantar el contenedor.
- Puedes consultar la API localmente en `http://localhost:3000/`.

---

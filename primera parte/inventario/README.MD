# Primera Parte - Bases de Datos y Lógica

## Relación de Tablas

La relación de las tablas está hecha en **MySQL Workbench**. Puedes ver el diagrama de relaciones de las tablas a continuación:

![Diagrama de relaciones de tablas](https://github.com/user-attachments/assets/e2a42112-b362-4076-aec1-3af08eca9f6b)

Si deseas revisar las relaciones de las tablas, puedes dirigirte al archivo `inventario.mwb` de MySQL Workbench.

## Inicialización del Contenedor Docker

Para inicializar la base de datos, asegúrate de tener **Docker** instalado en tu máquina. Docker creará una imagen relacionada con MySQL con el siguiente comando:

```bash
docker-compose up -d
```

Este comando levantará el contenedor en segundo plano. Después de ejecutarlo, puedes cerrar el terminal (bash) sin interrumpir el contenedor, ya que continuará ejecutándose en segundo plano.

## Acceso a la Base de Datos

Una vez que el contenedor Docker esté en ejecución, abre tu navegador y dirígete a la siguiente URL para acceder a la interfaz de Adminer-Hydra:

[http://localhost:8080/](http://localhost:8080/)

Por defecto, el servidor será `db`. Selecciona la base de datos predeterminada, que es MySQL. El sistema creará automáticamente el nombre de la base de datos.

### Credenciales de Acceso:

- **Usuario**: `username`
- **Contraseña**: `123`

![Captura de pantalla - Credenciales de acceso](https://github.com/user-attachments/assets/c0ca1520-716f-427b-80b3-ec6de00ecb1d)

## Selección Automática de Base de Datos

Cuando accedas, automáticamente muestra el nombre de la base de datos en el panel de Adminer-Hydra.

![Captura de pantalla - Selección automática de base de datos](https://github.com/user-attachments/assets/34159e2c-2558-48e3-afd2-d50df2abc541)

## Ejecución del Script

Dentro del proyecto de la base de datos, se encuentra un archivo que contiene el script necesario para crear las tablas automáticamente.

Al ejecutar el script, las tablas se generarán de forma automática.

![Captura de pantalla - Ejecución del script](https://github.com/user-attachments/assets/a9fc0157-3553-47cd-a641-1afa8ec1dc99)

## Tablas Generadas

Una vez que se haya ejecutado el script, las tablas se crearán automáticamente en la base de datos. Puedes ver las tablas generadas a continuación:

![Captura de pantalla - Tablas generadas](https://github.com/user-attachments/assets/038bf1bb-7384-4a9b-b1ed-a5ff2f8133a7)

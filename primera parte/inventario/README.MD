# Primera Parte - Bases de Datos y Lógica

## Relación de Tablas

La relación de las tablas está hecha en **MySQL Workbench**. Puedes ver el diagrama de relaciones de las tablas a continuación:

![Captura de pantalla 2024-11-15 163807](https://github.com/user-attachments/assets/f0a0cdfb-0811-462d-b062-2e824e7976f7)

Si deseas revisar las relaciones de las tablas, puedes dirigirte al archivo `inventario.mwb` de MySQL Workbench.

## Inicialización del Contenedor Docker

Para inicializar la base de datos, asegúrate de tener **Docker** instalado en tu máquina. Docker creará una imagen relacionada con MySQL con el siguiente comando:

```bash
docker-compose up -d
```

Este comando levantará el contenedor en segundo plano. Después de ejecutarlo, puedes cerrar el terminal (bash) sin interrumpir el contenedor, ya que continuará ejecutándose en segundo plano.

## Acceso a la Base de Datos

Una vez que el contenedor Docker esté en ejecución, abre tu navegador y dirígete a la siguiente URL para acceder a la interfaz de MySQL Workbench:

[http://localhost:8080/](http://localhost:8080/)

Por defecto, el servidor será `db`. Selecciona la base de datos predeterminada, que es MySQL. El sistema creará automáticamente el nombre de la base de datos.

### Credenciales de Acceso:

- **Usuario**: `username`
- **Contraseña**: `123`

![Pantalla de Login MySQL](https://github.com/user-attachments/assets/3059b8c1-326c-4396-9881-5287e2a6e3ec)

## Selección Automática de Base de Datos

Cuando accedas, se seleccionará automáticamente el nombre de la base de datos en el panel de MySQL Workbench.

![Selección Automática de Base de Datos](https://github.com/user-attachments/assets/e19c03b4-0085-4aba-a342-75b418b0744f)

## Ejecución del Script

Dentro del proyecto de la base de datos, se encuentra un archivo que contiene el script necesario para crear las tablas automáticamente.

Al ejecutar el script, las tablas se generarán de forma automática.

![Generación Automática de Tablas](https://github.com/user-attachments/assets/3fcc5163-3f76-48b4-9349-98e69f7df3b4)

## Tablas Generadas

Una vez que se haya ejecutado el script, las tablas se crearán automáticamente en la base de datos. Puedes ver las tablas generadas a continuación:

![Tablas Generadas](https://github.com/user-attachments/assets/c6fc9cf6-f03a-477c-87b1-a7b5a34fbaf7)
```

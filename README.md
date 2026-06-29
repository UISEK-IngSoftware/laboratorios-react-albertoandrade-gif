# Pokédex React — integración con Django y OAuth2

Proyecto de **Alberto Sebastián Andrade Endara** para consumir la API REST de Pokédex desarrollada en Django.

## Funcionalidades

- Consulta pública de Pokémon y entrenadores mediante `GET`.
- Inicio de sesión OAuth2 mediante `/o/token/`.
- Token Bearer agregado automáticamente con un interceptor de Axios.
- Rutas protegidas para crear y editar.
- Creación, actualización y eliminación de Pokémon.
- Creación, actualización y eliminación de entrenadores.
- Carga opcional de imágenes y fotografías con `FormData`.
- Cierre de sesión y revocación del token.
- Colección importable en Thunder Client con las nueve peticiones mostradas en clase.

## Variables de entorno

Copia `.env.example` como `.env` y configura:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_AUTH_BASE_URL=http://localhost:8000/o
VITE_MEDIA_URL=http://localhost:8000/media
VITE_CLIENT_ID=TU_CLIENT_ID
VITE_CLIENT_SECRET=TU_CLIENT_SECRET
```

El archivo `.env` está ignorado por Git. Las variables que comienzan con `VITE_` se incluyen en el código del navegador; esta configuración es válida para el laboratorio local, pero un sistema real debe usar un flujo OAuth apropiado para clientes públicos, como Authorization Code con PKCE.

## Ejecución

Primero inicia Django en el puerto 8000. Luego, en este proyecto:

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Rutas de React

- `/`: lista de Pokémon.
- `/trainers`: lista de entrenadores.
- `/login`: autenticación OAuth2.
- `/pokemons/add`: crear Pokémon.
- `/pokemons/:id/edit`: editar Pokémon.
- `/trainers/add`: crear entrenador.
- `/trainers/:id/edit`: editar entrenador.

## Thunder Client

En `thunder-client/` se incluyen:

- `thunder-collection_Pokedex.json`: colección con Pokémon, entrenadores y login.
- `Pokedex.local.env`: ambiente local listo para importar. Cambia `password` por la contraseña real del usuario de Django.
- `Pokedex.example.env`: plantilla sin credenciales.

Importa primero el ambiente y después la colección. Ejecuta `LoginPokedex`; la prueba guarda automáticamente `json.access_token` en `{{access_token}}`. Después puedes ejecutar POST, PUT y DELETE con el encabezado Bearer ya configurado.

## Verificación

```bash
npm run lint
npm run build
```

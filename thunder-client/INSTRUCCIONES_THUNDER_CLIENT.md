# Configuración de Thunder Client — Pokédex

La colección debe quedar organizada como en la captura:

## Pokedex

1. **GET — Obtener un pokemon**
   - URL: `{{base_url}}/pokemons/1/`

2. **POST — Add Pokemon**
   - URL: `{{base_url}}/pokemons/`
   - Auth: Bearer `{{access_token}}`
   - Body JSON:

```json
{
  "name": "Pikachu",
  "type": "Eléctrico",
  "height": 0.4,
  "weight": 6.0,
  "trainer": null
}
```

3. **PUT — Edit Pokemon**
   - URL: `{{base_url}}/pokemons/1/`
   - Auth: Bearer `{{access_token}}`
   - Body JSON con todos los campos requeridos.

4. **DELETE — Delete pokemon**
   - URL: `{{base_url}}/pokemons/1/`
   - Auth: Bearer `{{access_token}}`

## Trainer

1. **GET — Trainers**
   - URL: `{{base_url}}/entrenadores/`

2. **POST — Add Trainer**
   - URL: `{{base_url}}/entrenadores/`
   - Auth: Bearer `{{access_token}}`
   - Body JSON:

```json
{
  "name": "Misty",
  "age": 18,
  "city": "Ciudad Celeste"
}
```

3. **PUT — Edit Trainer**
   - URL: `{{base_url}}/entrenadores/1/`
   - Auth: Bearer `{{access_token}}`

4. **DELETE — Delete Trainer**
   - URL: `{{base_url}}/entrenadores/1/`
   - Auth: Bearer `{{access_token}}`

## User Management

### POST — LoginPokedex

- URL: `{{auth_url}}/token/`
- Body: **Form-encoded**

| Campo | Valor |
|---|---|
| `grant_type` | `password` |
| `username` | `{{username}}` |
| `password` | `{{password}}` |
| `client_id` | `{{client_id}}` |
| `client_secret` | `{{client_secret}}` |
| `scope` | `read write` |

La respuesta contiene `access_token`. La colección incluye una prueba que intenta guardar `json.access_token` en la variable `{{access_token}}`. Si tu versión de Thunder Client no ejecuta esa prueba después de importar, copia manualmente el token en el ambiente.

## Archivos disponibles

- `thunder-collection_Pokedex.json`: exportación nativa de Thunder Client.
- `Pokedex.postman_collection.json`: alternativa en formato Postman 2.1 que Thunder Client puede importar.
- `Pokedex.local.env`: ambiente local con las URLs y credenciales proporcionadas; cambia la contraseña.
- `Pokedex.local.postman_environment.json`: el mismo ambiente en formato Postman.
- Los archivos `example` no contienen las credenciales reales y sí se pueden compartir.

## Orden de prueba

1. Ejecutar Django: `python manage.py runserver`.
2. Activar el ambiente de Pokédex en Thunder Client.
3. Cambiar `password` por la contraseña del usuario `admin`.
4. Ejecutar `LoginPokedex`.
5. Confirmar que `access_token` tenga valor.
6. Probar GET, POST, PUT y DELETE.

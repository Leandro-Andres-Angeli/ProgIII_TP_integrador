# TP Integrador Programacion III

### Facultad de Ciencias de la Administración - UNER

## Integrantes :

- Walter Aguirre
- Leandro Andres Angeli
- Debora Ibáñez
- Nahir Orellana Lopez
- Alan Iglesias

### Para testear la api :

Setear las variables de ambiente del proyecto en un archivo .env , ejemplo :

- SERVER_PORT = 3001
- DB_PORT = 3307
- DB_USER = root
- DB_HOST = localhost
- DB_NAME = reclamos

### Crear en la DB un usuario de tipo admin ejecutando la siguiente consulta

```
INSERT INTO `usuarios` (`idUsuario`, `nombre`, `apellido`, `correoElectronico`, `contrasenia`, `idUsuarioTipo`, `imagen`, `activo`) VALUES (NULL, 'admin', 'admin', 'admin@gmail.com', sha2('123',256), '1', NULL, '1');
```

#### Crear clientes mediante API

#### Login

```http
  POST api/login
```

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `email    | `string` | **Requerido**. email    |
| `password | `string` | **Requerido**. password |

#### Ejemplo Body de la peticion

```
{  "email":"admin@gmail.com", "password":123, "idTipoUsuario":3 }
```

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

## Documentación

http://localhost:3001/api-docs

Loguearse en /api/login y copiar el token, luego presionar en el botón 'Authorize' e ingresar 'Bearer' seguido del token. Ejemplo: 'Bearer abcde12345'

## Usuarios

#### Login

```http
  POST api/login
```

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| email     | `string` | **Requerido**. email    |
| password  | `string` | **Requerido**. password |

##### Ejemplo Body de la peticion

```
{  "email":"admin@gmail.com", "password":123 }
```

---

### Get Usuario Logueado

`http GET api/clientes/perfil`

| Parameter | Type           | Description          |
| :-------- | :------------- | :------------------- |
| token     | `bearer token` | **Requerido**. token |

##### Ejemplo Respuesta de la peticion

```
{
    "ok": true,
    "data": {
        "idUsuario": 51,
        "nombre": "otro",
        "apellido": "admin",
        "correoElectronico": "admin1@gmail.com",
        "idUsuarioTipo": 3,
        "imagen": null,
        "activo": 1
    }
}
```

---

#### Crear clientes mediante API

```http
POST api/registro
```

| Parameter         | Type     | Description                      |
| :---------------- | :------- | :------------------------------- |
| nombre            | `string` | **Requerido**. nombre            |
| apellido          | `string` | **Requerido**. apellido          |
| correoElectronico | `email`  | **Requerido**. correoElectronico |
| contrasenia       | `string` | **Requerido**. contrasenia       |

##### Ejemplo Body de la peticion

```
{ "nombre":"otro", "apellido":"admin", "correoElectronico":"admin1@gmail.com", "contrasenia":123 }
```

---

#### Actualizar clientes mediante API

`PUT api/clientes/perfil`

| Parameter     | Type                 | Description                  |
| :------------ | :------------------- | :--------------------------- |
| nombre        | `string`             | **Requerido**. nombre        |
| apellido      | `string`             | **Requerido**. apellido      |
| idUsuarioTipo | `number` OR `string` | **Requerido**. idUsuarioTipo |
| token         | `bearer token`       | **Requerido**. token         |

##### Ejemplo Body de la peticion

```
{ "nombre":"cliente updated 279" , "apellido":"updated 11"  , "idUsuarioTipo":3 }
```

---

#### Crear clientes mediante API

`POST api/clientes/perfil`

| Parameter         | Type     | Description                      |
| :---------------- | :------- | :------------------------------- |
| nombre            | `string` | **Requerido**. nombre            |
| apellido          | `string` | **Requerido**. apellido          |
| correoElectronico | `email`  | **Requerido**. correoElectronico |
| contrasenia       | `string` | **Requerido**. contrasenia       |

```
{ "nombre":"cliente", "apellido":"gutierrez", "correoElectronico":"cliente@gmail.com", "contrasenia":123456 }
```

---

#### Crear empleados mediante API

```http
POST api/admin/empleados
```

| Parameter         | Type           | Description                      |
| :---------------- | :------------- | :------------------------------- |
| nombre            | `string`       | **Requerido**. nombre            |
| apellido          | `string`       | **Requerido**. apellido          |
| correoElectronico | `email`        | **Requerido**. correoElectronico |
| contrasenia       | `string`       | **Requerido**. contrasenia       |
| token             | `bearer token` | **Requerido**. token             |

##### Ejemplo Body de la peticion

```
{ "nombre":"empleado", "apellido":"api", "correoElectronico":"empleado@gmail.com", "contrasenia":123}
```

---

### Reclamos

#### Reclamos Admin

```http
GET api/reclamos/admin/
```

| Parameter | Type           | Description          |
| :-------- | :------------- | :------------------- |
| token     | `bearer token` | **Requerido**. token |

Devuelve todos los reclamos.Debe estar logueado como administrador

##### Ejemplo respuesta de la peticion

{
"ok": true,
"res": [
{
"idReclamo": 5,
"asunto": "nodif ",
"descripcion": "modif from admin",
"fechaCreado": "2024-09-29T13:51:23.000Z",
"fechaFinalizado": null,
"fechaCancelado": "2024-10-21T23:46:01.000Z",
"idReclamoEstado": 3,
"idReclamoTipo": 1,
"idUsuarioCreador": 9,
"idUsuarioFinalizador": 64
},
{
"idReclamo": 6,
"asunto": "rotura de motor ",
"descripcion": null,
"fechaCreado": "2024-08-19T10:00:00.000Z",
"fechaFinalizado": null,
"fechaCancelado": "2024-10-18T00:01:24.000Z",
"idReclamoEstado": 3,
"idReclamoTipo": 1,
"idUsuarioCreador": 8,
"idUsuarioFinalizador": 64
},
{
"idReclamo": 7,
"asunto": "no frena 2",
"descripcion": "modif from admin",
"fechaCreado": "2024-08-15T10:15:00.000Z",
"fechaFinalizado": null,
"fechaCancelado": "2024-10-12T19:22:42.000Z",
"idReclamoEstado": 3,
"idReclamoTipo": 2,
"idUsuarioCreador": 8,
"idUsuarioFinalizador": 65
},
{
"idReclamo": 8,
"asunto": "ruidos extraños",
"descripcion": null,
"fechaCreado": "2024-08-15T11:00:00.000Z",
"fechaFinalizado": null,
"fechaCancelado": null,
"idReclamoEstado": 1,
"idReclamoTipo": 3,
"idUsuarioCreador": 7,
"idUsuarioFinalizador": null
},...]
}

```http
POST api/reclamos/admin/{idUsuario}
```

Postea un reclamo recibe el id del cliente por parametro debe estar logueado como admin

##### Ejemplo respuesta de la peticion

`{
"idReclamoEstado": 3,
"asunto": "reclamo creado por admin",
"descripcion": "descripcion",
"idReclamoTipo": 4
}`

#### Reclamos Cliente

`GET /api/reclamos/clientes/`
Obtiene reclamos asociados a un determinado cliente , debe estar logueado como cliente

##### Ejemplo respuesta de la peticion

```{
"ok": true,
"claims": [
{
"idReclamo": 90,
"asunto": "test",
"descripcion": "reclamo de cliente leandroandresangeli@gmail.com",
"fechaCreado": "2024-10-12T18:26:54.000Z",
"fechaFinalizado": null,
"fechaCancelado": "2024-10-18T00:39:05.000Z",
"idReclamoEstado": 3,
"idReclamoTipo": 1,
"idUsuarioCreador": 62,
"idUsuarioFinalizador": 49
},
{
"idReclamo": 91,
"asunto": "test",
"descripcion": "reclamo de cliente 2 de leandroandresangeli@gmail.com",
"fechaCreado": "2024-10-12T18:27:05.000Z",
"fechaFinalizado": null,
"fechaCancelado": null,
"idReclamoEstado": 1,
"idReclamoTipo": 1,
"idUsuarioCreador": 62,
"idUsuarioFinalizador": null
},
{
"idReclamo": 92,
"asunto": "test",
"descripcion": "reclamo de cliente 3 de leandroandresangeli@gmail.com",
"fechaCreado": "2024-10-12T18:27:12.000Z",
"fechaFinalizado": "2024-10-12T18:35:04.000Z",
"fechaCancelado": null,
"idReclamoEstado": 4,
"idReclamoTipo": 1,
"idUsuarioCreador": 62,
"idUsuarioFinalizador": 64
}
]
}
```

`POST /api/reclamos/clientes/`
Postea nuevo reclamo de cliente
Se debe estar logueado como cliente
| Parameter | Type | Description |
| :---------------- | :------------- | :------------------------------- |
| asunto | `string` | **Requerido**. asunto |
| descripcion | `string` | **Requerido**. descripcion |
| idReclamoTipo | `number` | **Requerido**. idReclamoTipo |
| token | `bearer token` | **Requerido**. token |

##### Ejemplo respuesta de la peticion

`{
"ok": true,
"message": "reclamo con id 107 creado por usuario 62"
}`

`PATCH /api/reclamos/clientes/{idReclamo}`

| Parameter          | Type           | Description                       |
| :----------------- | :------------- | :-------------------------------- |
| reclamoNuevoStatus | `number`       | **Requerido**. reclamoNuevoStatus |
| token              | `bearer token` | **Requerido**. token              |

Patch reclamos - clientes debe estar logueado como cliente cambia el estado del reclamo a cancelado , si el reclamo ya esta cancelado no ejecuta acción

Ejemplo respuesta peticion

`{
"ok": true,
"message": "reclamo 107 cancelado"
}`

#### Reclamos Empleado

`GET /api/reclamos/empleados/`

Obtiene reclamos debe estar logueado como empleado , devuelve los reclamos asociados a la oficina del empleado

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

| token | `bearer token` | **Requerido**. token |

ejemplo de respuesta
`PATCH /api/reclamos/empleados/{idReclamo}`

| Parameter | Type | Description |
| :-------- | :--- | :---------- |

| token | `bearer token` | **Requerido**. token |
| idReclamo | `numbre` | **Requerido**. idReclamo |

Patch reclamos - empleados .Debe estar logueado como empleado , cambia el estado del reclamo

Ejempo respuesta peticion

`{
  "ok": true,
  "message": "reclamo modificado con exito"
}`

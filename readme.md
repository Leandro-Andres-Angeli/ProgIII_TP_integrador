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

#### Crear reclamos

```http
POST api/reclamos/
```

| Parameter     | Type           | Description                  |
| :------------ | :------------- | :--------------------------- |
| token         | `bearer token` | **Requerido**. token         |
| asunto        | `string`       | **Requerido**. asunto        |
| descripcion   | `email`        | **Requerido**. descripcion   |
| idReclamoTipo | `string`       | **Requerido**. idReclamoTipo |

##### Ejemplo Body de la peticion

```

{"asunto":"test",
"descripcion":"reclamo de admin@gmail.com",
"idReclamoTipo":14}
```

---

### Get reclamos

`GET api/reclamos`

Si el usuario logueado es un cliente devolvera todos los reclamos asociados a
ese cliente , si el usuario logueado es un empleado devolvera los reclamos asociados
a la oficina de dicho empleado .Si el usuario es administrador devolvera todos los reclamos en la DB

| Parameter | Type           | Description          |
| :-------- | :------------- | :------------------- |
| token     | `bearer token` | **Requerido**. token |

##### Ejemplo Body de la respuesta

```{
"ok": true,
"claims": [
{
"idReclamo": 5,
"asunto": "nodif ",
"descripcion": "modif from admin",
"fechaCreado": "2024-09-29T13:51:23.000Z",
"fechaFinalizado": null,
"fechaCancelado": null,
"idReclamoEstado": 4,
"idReclamoTipo": 1,
"idUsuarioCreador": 9,
"idUsuarioFinalizador": null
},
{
"idReclamo": 6,
"asunto": "rotura de motor ",
"descripcion": null,
"fechaCreado": "2024-08-19T10:00:00.000Z",
"fechaFinalizado": null,
"fechaCancelado": null,
"idReclamoEstado": 2,
"idReclamoTipo": 1,
"idUsuarioCreador": 9,
"idUsuarioFinalizador": null
},
{
"idReclamo": 7,
"asunto": "no frena",
"descripcion": null,
"fechaCreado": "2024-08-15T10:15:00.000Z",
"fechaFinalizado": null,
"fechaCancelado": null,
"idReclamoEstado": 1,
"idReclamoTipo": 2,
"idUsuarioCreador": 9,
"idUsuarioFinalizador": 7
}
]
}
```

---

### Patch reclamos

`PATCH api/reclamos/`

Si el usuario logueado es un cliente podra cancelar su reclamos unicamente.
Si el usuario logueado es empleado podra unicamente cancelar o finalizar reclamos
que pertenezcan solamente a su oficina
El administrador puede realizar todo tipo de cambios

| Parameter      | Type           | Description               |
| :------------- | :------------- | :------------------------ |
| claimId        | `number`       | **Requerido**. claimId    |
| asunto         | `string`       | **Opcional**. asunto      |
| claimNewStatus | `number`       | **Requerido**. token      |
| descripcion    | `string`       | **Opcional**. descripcion |
| token          | `bearer token` | **Requerido**. token      |

##### Ejemplo Body de la peticion

```
{ "claimId":"78" ,"asunto":"no frena 2",  "claimNewStatus":"2" , "descripcion":"modif from empleado"  }
```

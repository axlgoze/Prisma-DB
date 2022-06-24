# API: Express + DB

# Conéxion a Base de Datos Postgresql

```
npm install express --save-dev
npm install prisma --save-dev
```

inicializar prisma:

```
npx prisma init
```

- crear base de datos
- modificar archivo .env con usuario y password

```
DATABASE_URL="postgresql://TUUSUARIO:PASSWORD@localhost:5432/explorers_api?schema=public"
```

# Agrega una nueva tabla y crea el API

| Campo | Tipo de Dato |
|---|---|
| id | Integer (autogenerado) |
| name | String |
| lang | String |
| missionCommander | String |
| enrollments | Integer |
| hasCertification | Boolean |

Forma de declarar una nuevo modelo Prisma (Tabla/Entidad) en la db. revisa la documentación de Prisma: https://www.prisma.io/docs/concepts/components/prisma-schema

`prisma/schema.prisma`

```
model explorador {
  id Int @id @default(autoincrement())
  name String @unique
  lang String @db.VarChar(255)
  missionCommander String @db.VarChar(255)
  enrollments String @db.VarChar(255)
  hasCertification Boolean @default(false)
//  dateCreated DateTime @default(now())
//  lastUpdated DateTime @updatedAt
}
```
- versionamiento de cambios en la db (migrations)

Ejecutar `npx prisma migrate dev --name init`

![newMigration](./images/secondMigration.JPG)

![sql](./images/secondMsql.JPG)


Crear un archivo para insertar datos de forma automatizada:
`prisma/seed.js`

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async function main() {
  try {
    const explorador = await prisma.explorador.upsert({
      where: { name: 'Explorador' },
      update: {},
      create: {
        name: 'Explorador',
				lang: 'Espaniol',
				missionCommander: 'Carlo',
				enrollments: 'node'
      },
    });
    const explorador1 = await prisma.explorador.upsert({
      where: { name: 'Explorador1' },
      update: {},
      create: {
        name: 'Explorardor1',
				name: 'Explorador1',
				lang: 'Ingles',
				missionCommander: 'Fer',
				enrollments: 'java'
      },
    });
    const explorador2 = await prisma.explorador.upsert({
      where: { name: 'Explorador2' },
      update: {},
      create: {
        name: 'Explorador2',
				name: 'Explorador2',
				lang: 'Frances'
				missionCommander: 'Luis',
				enrollments: 'frontEnd'
      },
    });
    console.log('Create 3 exploradores');
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
```
ejecutamos `node prisma/seed.js`
verificamos que se hayan creado nuestros nuevos registros:

![registros](./images/registrosSeed.JPG)

## CRUD

Creamos un servidor básico:

``` javascript
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.get('/', (req, res) => {
  res.json({message: 'ESTA VIVO !'});
});
app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
```
- Corre el server `node server2.js` y accede a `localhost:3000`, verifica que recibas un mensaje.

3. Crea un CRUD para esta tabla (explorador) en el archivo `server2.js`:
  - Crea un endpoint GET para regresar todos los registros.
![GETall](./images/endpointGetAll.JPG)
  - Crea un endpoint GET para regresar el registro dado el ID
![GETbyID](./images/endpointGetByID.JPG)
  - Crea un endpoint POST para crear un nuevo registro
![POSTman](./images/endpointPostman.JPG)
![POSTpos](./images/endpointPostPos.JPG)
  - Crea un endpoint PUT para actualizar un registro
![before](./images/beforePut.JPG)
![POSTpos](./images/afterPut.JPG)
  - Crea un endpoint DELETE para eliminar un registro
![POSTpos](./images/deleted.JPG)

---

# Actividad 

1. Revisa la app del front, es una app de Vue 3
2. La dependencia `Axios` nos permite realizar las peticiones HTTP al server, investiga cómo funciona. Lee el archivo `src/http-common.js`.
3. Ve al archivo `src/services/ExplorerService.js`
4. En la carpeta `components` están los componentes usados de Vue: template y script.
5. Realiza un diagrama de cómo funciona este proyecto de Vue JS, incluye cómo funciona el `router.js`, los templates, los services y los componentes. 
6. Este diagrama te servirá más adelante para comenzar a agregar nuevos features en este proyecto. Esta actividad tiene por propósito leer una app legada de frontend.
7. Incluye estos diagramas en tu fork. 

# Nuevo Feature Fullstack

`missionCommander`
| Campo | Tipo |
|---|---|
| id | Integer (autogenerado) |
| name | String |
| username | String |
| mainStack | String |
| currentEnrollment | Boolean |
| hasAzureCertification | Boolean |

1. Crea la tabla nueva anterior. Agrega unos registros por medio de los seeds.
2. Crea un CRUD expuesto en un API en el `server.js` (métodos GET, POST, PUT, DELETE, recuerda que el método GET deberá tener 2 endpoints, uno para traer todos los registros y otro para consultar solo el registro por ID).
3. En la pantalla inicial del front, consulta todos los registros en esta tabla y muéstralos. Tú decides el diseño.
4. Agrega la posibilidad de agregar uno nuevo.
5. Agrega la posibilidad de editar el `mainStack`.
6. Agrega la posibilidad de eliminar el registro.

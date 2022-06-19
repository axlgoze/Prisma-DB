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


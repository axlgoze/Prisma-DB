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
}
```
- versionamiento de cambios en la db (migrations)

ejecutar `npx prisma migrate dev --name init`



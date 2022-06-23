const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
app.get('/', (req, res) => {
  res.json({message: 'ESTA VIVO'});
});

//endpoint GET para regresar todos los exploradores
app.get('/exploradores', async (req,res)=>{
  const allExploradores = await prisma.explorador.findMany({});
  res.json(allExploradores);
});


app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

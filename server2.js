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

//GET para regresar el registro dado el ID
app.get('/exploradores/:id', async (req,res)=>{
  const id=req.params.id;
  const explorador = await prisma.explorador.findUnique({where:{id: parseInt(id)}});
  res.json(explorador);
});

//POST para crear nuevo registro
app.post('/exploradores', async (req,res)=>{
  const explorador = {
  name: req.body.name,
  lang: req.body.lang,
  missionCommander: req.body.missionCommander,
  enrollments: req.body.enrollments,
  hasCertification: true
  };
  const message = 'Explorador creado.';
  await prisma.explorador.create({data: explorador});
  return res.json({message});
});


app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

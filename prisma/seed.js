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
				lang: 'Frances',
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
/*
(async function main() {
  try {
    const woopa = await prisma.explorer.upsert({
      where: { name: 'Woopa' },
      update: {},
      create: {
        name: 'Woopa',
				username: 'ajolonauta',
				mission: 'Node'
      },
    });

    const woopa1 = await prisma.explorer.upsert({
      where: { name: 'Woopa1' },
      update: {},
      create: {
        name: 'Woopa1',
				username: 'ajolonauta1',
				mission: 'Node'
      },
    });

    const woopa2 = await prisma.explorer.upsert({
      where: { name: 'Woopa 2' },
      update: {},
      create: {
        name: 'Woopa 2',
				username: 'ajolonauta2',
				mission: 'Java'
      },
    });

    const woopa3 = await prisma.explorer.upsert({
      where: { name: 'Woopa 3' },
      update: {},
      create: {
        name: 'Woopa 3',
				username: 'ajolonauta3',
				mission: 'Node'
      },
    });

    console.log('Create 3 explorers');

    const woopaN = await prisma.explorer.upsert({
	where: {name: 'Woopa N'},
	update: {},
	create: {
		name: 'Woopa N',
		username: 'ajolonautaN',
		mission: 'Fullstack'
	},
    });

  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
*/

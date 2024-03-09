const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.users.create({
    data: {
      name,
      email,
    },
  });
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.users.update({
    where: { id },
    data: {
      name,
      email,
    },
  });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.users.delete({
    where: { id },
  });
  res.json({"msg":"User Deleted !!", "status":true});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

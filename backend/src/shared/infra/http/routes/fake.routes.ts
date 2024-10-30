import { Router } from 'express';

const routes = Router();

const USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@tattoo.com'
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@tattoo.com'
  }
];

routes.get('/usuarios', async (req, res) => {
  return res.json(USERS);
});

routes.post('/usuarios', async (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: USERS.length + 1, name, email };
  USERS.push(newUser);

  return res.status(201).json(newUser);
});

routes.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const userIndex = USERS.findIndex(user => user.id === Number(id));

  if (userIndex < 0)
    return res.status(404).json({ message: 'User not found!' });

  USERS[userIndex] = { id: Number(id), name, email };

  return res.json(USERS[userIndex]);
});

routes.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const userIndex = USERS.findIndex(user => user.id === Number(id));

  if (userIndex < 0) {
    return res.status(404).json({ message: 'User not found!' });
  }

  USERS.splice(userIndex, 1);

  return res.status(204).send();
});

export default routes;

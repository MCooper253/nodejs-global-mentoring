const express = require('express');
const requests = require('./helperFcuntions');

const app = express();
const port = 4000;

app.use(express.json());

app.param('id', (req, res, next, id) => {
  req.userId = id;
  next();
})

app.get('/user/:id', (req, res) => {
  const fetchedUser = requests.getUserById(req.userId);
  if (fetchedUser.error === null) {
    res.send(fetchedUser.user)
  } else {
    res.send(fetchedUser.error)
  };
});

app.use('/*', (req, res) => {
  throw new Error('The recource you are looking for does not exist here!');
})

app.use('/', (req, res) => {
  res.send('Welcome to my wonderful user database.');
});

app.post('/create-user', (req, res) => {

})

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
})
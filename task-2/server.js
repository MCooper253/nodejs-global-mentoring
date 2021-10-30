const express = require('express');
const requests = require('./databaseAndActions');

const app = express();
const port = 4000;

//id: string,
//login: string,
//password: string,
//age: number,
//isDeleted: boolean,

app.use(express.json());

app.param('id', (req, res, next, id) => {
  req.userId = id;
  next();
});

app.post('/user/create', (req, res) => {
 const addedUser = requests.addUser(req.body);
 res.send(addedUser.msg)
});

app.get('/user/:id', (req, res) => {
  //console.log(typeof req.userId);
  const fetchedUser = requests.getUserById(req.userId);
  if (fetchedUser.hasError) {
    res.send(fetchedUser.error);
  } else {
    res.send(fetchedUser.user);
  };
});

app.delete('/user/delete/:id', (req, res) => {
  const deleteStatus = requests.deleteUserById(req.userId)
  if (deleteStatus.hasError) {
    res.send(deleteStatus.error);
  } else {
    res.send(deleteStatus.msg);
  }
})

app.get('/database', (req, res) => {
  res.send(requests.showDatabase());
})

// app.use('/', (req, res) => {
//   res.send('Welcome to my wonderful user database.');
// });

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
})
const express = require('express');
const joiValidation = require('express-joi-validation').createValidator({});

const { userSchema } = require('./validationSchema');
const requests = require('./databaseAndActions');

const app = express();
const port = 4000;

app.use(express.json());

app.param('id', (req, res, next, id) => {
  req.userId = id;
  next();
});

app.post('/user/create', joiValidation.body(userSchema), (req, res) => {
  const addedUserResponse = requests.addUser(req.body);
  res.send(addedUserResponse.msg);
});

app.patch('/user/update/:id', joiValidation.body(userSchema), (req, res) => {
  const updateUserResponse = requests.updateUserById({
    id: req.userId,
    ...req.body
  });

  if (updateUserResponse.hasError) {
    res.status(400).send(updateUserResponse.error);
  } else {
    res.send(updateUserResponse.msg);
  }
})

app.get('/user/:id', (req, res) => {
  const fetchedUser = requests.getUserById(req.userId);
  if (fetchedUser.hasError) {
    res.status(400).send(fetchedUser.error);
  } else {
    res.send(fetchedUser.user);
  };
});

app.delete('/user/delete/:id', (req, res) => {
  const deleteStatus = requests.deleteUserById(req.userId)
  if (deleteStatus.hasError) {
    res.status(400).send(deleteStatus.error);
  } else {
    res.send(deleteStatus.msg);
  }
});


//This is a helper function for devleopment purposes
app.get('/database', (req, res) => {
  res.send(requests.showDatabase());
});

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Something broke!')
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
})
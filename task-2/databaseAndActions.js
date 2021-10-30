const { response } = require("express");

//TODO add this to express session
const userDatabase = {
  '101': {
    id: '101',
    login: 'default.user',
    password: 'password12345',
    age: '21',
    isDeleted: false
  }
}

const getUser = id => {
  const idString = id.toString();
  const response = {
    user: null,
    error: null,
    hasError: false,
  };

  if (userDatabase[idString]?.isDeleted) {
    response.error = `user with id '${id}' does not exist on the database`;
    response.hasError = true;
    return response;
  };

  if (userDatabase[idString]) {
    const userToSend = userDatabase[idString];
    delete userToSend.id;
    delete userToSend.isDeleted;

    response.user = userToSend;
  } else {
    response.user = null;
    response.hasError = true;
    response.error = `user with id '${id}' does not exist on the database`;
  };

  return response
};

const addUser = user => {
  //TODO: turn this generatedID into a funciton that generates ID
  const generatedID = '102';
  const userToAdd = user
  const response = {
    msg: null
  }

  userToAdd.isDeleted = false;
  userToAdd.id = generatedID;

  userDatabase[user.id] = user

  //TODO add some error handling
  response.msg = 'user Added';

  return response 
};

const deleteUser = id => {
  const idString = id.toString();
  const user = userDatabase[idString];
  const response = {
    msg: null,
    error: null,
    hasError: false,
  };

  if (!user.isDeleted) {
    user.isDeleted = true;
    response.msg = `user with id ${idString} has been delted from out database`;
  } else {
    response.hasError = true;
    response.error = `user with id ${idString} does not exist on the database`;
  }

  return response
}

//TODO add user validation
const addUserValidation = () => {};

const databaseSnapshot = () => {
  return userDatabase
};

module.exports = {
  getUserById: getUser,
  addUser: addUser,
  showDatabase: databaseSnapshot,
  deleteUserById: deleteUser
};
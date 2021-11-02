const { generateId } = require("./UUID");

const userDatabase = {};

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
    response.user = {
      login: userDatabase[idString].login,
      password: userDatabase[idString].password,
      age: userDatabase[idString].age
    };
    } else {
      response.user = null;
      response.hasError = true;
      response.error = `user with id '${id}' does not exist on the database`;
    };

  return response
};

const addUser = user => {
  const generatedID = generateId();
  const userToAdd = user
  const response = {
    msg: null
  }

  userToAdd.isDeleted = false;
  userToAdd.id = generatedID;

  userDatabase[user.id] = user

  response.msg = `user added sucessfully with id:"${generatedID}"`;

  return response 
};

const updateUser = ({ id, login, password, age }) => {
  const response = {
    msg: null,
    error: null,
    hasError: false,
    httpStatus: null,
  };

  const findUser = getUser(id)

  if (findUser.hasError) {
    response.hasError = true;
    response.error = findUser.error;
    return response

  } else {
    const updatedUserDetails = {
      login: login,
      password: password,
      age: age
    }
    userDatabase[id] = {
      id: userDatabase[id].id,
      login: updatedUserDetails.login,
      password: updatedUserDetails.password,
      age: updatedUserDetails.age,
      isDeleted: userDatabase[id].isDeleted
    }

    response.msg = `user with id:"${id}" has been updated successfully`;

    return response;
  }
};

const deleteUser = id => {
  const idString = id.toString();
  const user = userDatabase[idString];
  const response = {
    msg: null,
    error: null,
    hasError: false,
    httpStatus: null,
  };

  if (!user.isDeleted) {
    user.isDeleted = true;
    response.msg = `user with id ${idString} has been delted from the database`;
  } else {
    response.hasError = true;
    response.error = `user with id ${idString} does not exist on the database`;
    response.httpStatus = 400;
  }

  return response
}

const databaseSnapshot = () => {
  return userDatabase
};

module.exports = {
  getUserById: getUser,
  addUser: addUser,
  showDatabase: databaseSnapshot,
  deleteUserById: deleteUser,
  updateUserById: updateUser
};
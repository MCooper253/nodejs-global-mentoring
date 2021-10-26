const userDatabase = {
  '101': {
    id: '101',
    login: 'default.user',
    password: 'password12345',
    age: '21',
    isDeleted: false
  }
}

const getUser = (id) => {
  const idString = id.toString();
  const response = {};

  if (userDatabase[idString]) {
    const userToSend = userDatabase[idString]
    delete userToSend.id;
    delete userToSend.isDeleted;

    response.user = userToSend;
    response.error = null;
  } else {
    response.user = null;
    response.error = `user with id '${id}' does not exist on the database`;
  }

  return response
};

module.exports = {
  getUserById: getUser
};
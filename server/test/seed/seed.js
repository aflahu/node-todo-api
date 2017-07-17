const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../model/todo');
const {User} = require('./../../model/user');

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [{
  _id: userOneId,
  email: 'aa@aa.com',
  password: 'mypassss',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc12')
  }]
}, {
  _id: userTwoId,
  email: 'aa@aaaa.com',
  password: 'mypasssstwo'
}]

const todos = [{
  _id: new ObjectID(),
  text: 'Firs text todo'
}, {
  _id: new ObjectID(),
  text: 'Second text todo',
  completed: true,
  completedAt: 333
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos)
  }).then(() => done())
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save()
    var userTwo = new User(users[1]).save()

    return Promise.all([userOne, userTwo])
  }).then(() => done())
}


module.exports = {todos, populateTodos, users, populateUsers}

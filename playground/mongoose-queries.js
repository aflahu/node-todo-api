const {ObjectId} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/model/todo')
const {User} = require('./../server/model/user')

// var id = '596798f8face8a6a11d3d4ac'
//
// if (!ObjectId.isValid(id)) {
//   console.log('Id not found');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// })


// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by id', todo);
// }).catch((e) => console.log(e))

var idUser = '59660931d86dd42cd1bb462c'

User.findById(idUser).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
  console.log(e);
})

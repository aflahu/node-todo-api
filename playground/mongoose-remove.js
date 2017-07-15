const {ObjectId} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/model/todo')
const {User} = require('./../server/model/user')

// Todo.remove({}).then((result) => {
//   console.log(result);
// })

// Todo.findOneAndRemove({_id: '5969a47420bde488dcfe5a9f'}).then(() => {
// 
// })

Todo.findByIdAndRemove('5969a47420bde488dcfe5a9f').then((doc) => {
  console.log(doc);
})

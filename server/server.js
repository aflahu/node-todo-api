var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoAppMongoos', {useMongoClient: true})

// save new somthing
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
})

var newTodo = new Todo({
  text: 'Cook dinner'
})

newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
})

var otherTodo = new Todo({
  text: 'Cook lunch',
  completed: false,
  completedAt: 123
})

otherTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2))
}, (e) => {
  console.log('Unable to save todo', e);
})

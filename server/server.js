var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoAppMongoos', {useMongoClient: true})


var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

// var newTodo = new Todo({
//   text: 'Cook dinner'
// })
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// })

// var otherTodo = new Todo({
//   text: '  edit video2  ',
//   // completed: false,
//   // completedAt: 123
// })
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2))
// }, (e) => {
//   console.log('Unable to save todo', e);
// })

// user model
// email - require  it - trim it -type -minlength 1

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '{VALUE} is not email, Please fill a valid email address']
  }
})

var user = new User({
  email: 'as@as'
})

user.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2))
}, (e) => {
  console.log('Unable to save user', e);
})

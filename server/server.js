require('./config/config');

const _ = require('lodash');
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./model/todo')
var {User} = require('./model/user')
var {authenticate} = require('./middleware/authenticate');

var app = express()
const port = process.env.PORT

app.use(bodyParser.json())

app.post('/todos',authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e.message)
  })
})

app.get('/todos',authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos/:id',authenticate ,(req, res) => {
  var id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.status(200).send({todo})
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.delete('/todos/:id',authenticate ,(req,res) => {
  var id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send()
  })
})

app.patch('/todos/:id', authenticate ,(req, res) => {
  var id = req.params.id
  var body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }
  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send()
  })
})


app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
    // res.send(user)
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user)
    })
  }).catch((e)=> {
    res.status(400).send()
  })

})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log('Started up at port', port);
})

module.exports = {app}














// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// })

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
//
// var User = mongoose.model('User', {
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 1,
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '{VALUE} is not email, Please fill a valid email address']
//   }
// })

// var user = new User({
//   email: 'as@as'
// })
//
// user.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2))
// }, (e) => {
//   console.log('Unable to save user', e);
// })

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./model/todo');
var { User } = require('./model/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });

    try {
      const doc = yield todo.save();
      res.send(doc);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

app.get('/todos', authenticate, (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const todos = yield Todo.find({
        _creator: req.user._id
      });
      res.send({ todos });
    } catch (e) {
      res.status(400).send(e);
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

app.get('/todos/:id', authenticate, (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    try {
      const todo = yield Todo.findOne({
        _id: id,
        _creator: req.user._id
      });
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    } catch (e) {
      res.status(400).send(e);
    }
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());

app.delete('/todos/:id', authenticate, (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    try {
      const todo = yield Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
      });

      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    } catch (error) {
      res.status(400).send();
    }
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})());

app.patch('/todos/:id', authenticate, (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
    try {
      const todo = yield Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
      }, { $set: body }, { new: true });
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    } catch (e) {
      res.status(400).send();
    }
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})());

app.post('/users', (() => {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      const body = _.pick(req.body, ['email', 'password']);
      const user = new User(body);
      yield user.save();
      const token = yield user.generateAuthToken();
      res.header('x-auth', token).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})());

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (() => {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      const body = _.pick(req.body, ['email', 'password']);
      const user = yield User.findByCredentials(body.email, body.password);
      const token = yield user.generateAuthToken();

      res.header('x-auth', token).send(user);
    } catch (error) {
      res.status(400).send();
    }
  });

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
})());

app.delete('/users/me/token', authenticate, (() => {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      yield req.user.removeToken(req.token);
      res.status(200).send();
    } catch (error) {
      res.status(400).send();
    }
  });

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
})());

app.listen(port, () => {
  console.log('Started up at port', port);
});

module.exports = { app };

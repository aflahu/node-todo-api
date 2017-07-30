const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./../server-compiled')
const {Todo} = require('./../model/todo')
const {User} = require('./../model/user')
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
beforeEach(populateUsers)
beforeEach(populateTodos)

describe('POST /todos', () => {
  it('should create a new todo.', (done) => {
    var text = 'Test todo text'
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((e) => done(e))
      })
  })

  it('should not create todo with invalid body date', (done) => {
    var text = ''
    request(app)
      .post('/todos')
      .send({text})
      .set('x-auth', users[0].tokens[0].token)
      .expect(400)
      .end((err, res) => {
        if (err) {
            return done(err)
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return todo doc ', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })
  
  it('should return not todo doc, created by other user ', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done)
  })
  
  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  })

  it('should return 404 if non object ids', (done) => {
    request(app)
      .get('/todos/123')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('Should delete todo', (done) => {
    var hexId = todos[1]._id.toHexString()

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist()
          done()
        }).catch((e) => done(e))
      })
  })
  it('Should not delete todo by other user', (done) => {
    var hexId = todos[0]._id.toHexString()

    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toExist()
          done()
        }).catch((e) => done(e))
      })
  })
  it('should return 404 if todo not found ', (done) => {
    var hexId = new ObjectID().toHexString()
    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done)
  })
  it('should return 404 if non obj ids ', (done) => {
    request(app)
      .delete('/todos/123')
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done)
  })
})

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    // grad id of first item
    var id = todos[0]._id.toHexString()
    var text = 'should be the new text'
    // update text, set completed true
    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end(done)
    // text is change, completed is true, completedAt is anumber, tobea
  })
  it('should not update the todo by other creator', (done) => {
    // grad id of first item
    var id = todos[0]._id.toHexString()
    var text = 'should be the new text'
    // update text, set completed true
    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: true,
        text
      })
      .expect(404)
      .end(done)
    // text is change, completed is true, completedAt is anumber, tobea
  })
  it('should clear completedAt when todo is not completed', (done) => {
    // grab id of second todo
    var hexId = todos[1]._id.toHexString()
    var text = 'should update new todo'

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)
    // update text, set completed false
    // text is changed, completed false, completedAt is null toNotExist
  })
})

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done)
  });
  it('should return 404 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
})

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'sada@esdar.com'
    var password = '12324a'

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist()
        expect(res.body._id).toExist()
        expect(res.body.email).toBe(email)
      })
      .end((err) => {
        if (err) {
          return done(err)
        }
        User.findOne({email}).then((user) => {
          expect(user).toExist()
          expect(user.password).toNotEqual(password)
          done()
        }).catch((e) => done(e))
      })
  })
  it('should return validation errors if request invalid', (done) => {
      request(app)
        .post('/users')
        .send({
          email: 'saas',
          password: 'sssss'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body._message).toEqual('User validation failed')
        })
        .end(done)
  })
  it('should not create user if email in use', (done) => {
      request(app)
        .post('/users')
        .send({
          email: users[0].email,
          password: '123sqew'
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.code).toBe(11000)
        })
        .end(done)
  })
})

describe('POST /users/login', () => {
  it('should auth login and return token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist()
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          })
          done()
        }).catch((e) => done(e))
      })
  });
  it('should reject invalid login', (done) => {
      request(app)
        .post('/users/login')
        .send({
          email: users[1].email,
          password: users[1].password + 'sa'
        })
        .expect(400)
        .expect((res) => {
          expect(res.headers['x-auth']).toNotExist()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          User.findById(users[1]._id).then((user) => {
            expect(user.tokens.length).toBe(1)
            done()
          }).catch((e) => done(e))
        })
  });
})

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0)
          done()
        }).catch((e) => done(e))
      })
  })
})
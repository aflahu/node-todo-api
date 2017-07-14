var mongoose = require('mongoose')

mongoose.Promise = global.Promise
var mongodbConnection = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'mongodb://todo-udemy:59687d457fb88642b35459b0@ds157682.mlab.com:57682/todo-api-udemy'
  }
  return 'mongodb://localhost:27017/TodoAppMongoos'
}

// mongoose.connect('mongodb://localhost:27017/TodoAppMongoos', {useMongoClient: true})
mongoose.connect(mongodbConnection(), {useMongoClient: true})
// 59687d457fb88642b35459b0
// mongodb://todo-udemy:59687d457fb88642b35459b0@ds157682.mlab.com:57682/todo-api-udemy
module.export = {mongoose}

var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://todo-udemy:59687d457fb88642b35459b0@ds157682.mlab.com:57682/todo-api-udemy'||'mongodb://localhost:27017/TodoAppMongoos', {useMongoClient: true})
// 59687d457fb88642b35459b0
// mongodb://todo-udemy:59687d457fb88642b35459b0@ds157682.mlab.com:57682/todo-api-udemy
module.export = {mongoose}

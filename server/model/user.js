const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken');
const _ = require('lodash')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '{VALUE} is not email, Please fill a valid email address'],
    unique: true,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: '{VALUE} is not valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  var user = this
  var userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
  var user = this
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc12').toString()

  user.tokens.push({access, token})

  return user.save().then(() => {
    return token
  })
}

var User = mongoose.model('User', UserSchema)

module.exports = {User}

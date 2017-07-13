var mongoose = require('mongoose')

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '{VALUE} is not email, Please fill a valid email address']
  }
})

module.exports = {User}

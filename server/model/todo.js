var mongoose = require("mongoose");

var Todo = mongoose.model("Todo", {
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
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

var TodoRedis = todo => {
  return [`${todo._id.toString()}:${todo._creator.toString()}`, "id", todo._id.toString(), "text", todo.text, "completed", todo.completed, "completedAt", todo.completedAt || "", "creator", todo._creator.toString()];
};

module.exports = { Todo, TodoRedis };

const { redis } = require("./../server/db/redis");

const users = [
  {
    _id: 12321321,
    email: "aa@aa.com",
    password: "mypassss",
    tokens: [
      {
        access: "auth",
        token: "sasas"
      }
    ]
  },
  {
    _id: 1232132222,
    email: "aa@aaaa.com",
    password: "mypasssstwo",
    tokens: [
      {
        access: "auth",
        token: "sasasss"
      }
    ]
  }
];

const todos = [
  {
    _id: 12312,
    text: "Firs text todo",
    _creator: 2132
  },
  {
    _id: 12321,
    text: "Second text todo",
    completed: true,
    completedAt: 333,
    _creator: 12322
  },
  {
    _id: 1111,
    text: "Second text todo3",
    completed: true,
    completedAt: 3333,
    _creator: 123223
  }
];

// redis.hmset(
//   [
//     "todos",
//     `id:${todos[2]._creator}`,
//     todos[2]._id,
//     "text",
//     todos[2].text,
//     "completed",
//     todos[2].completed,
//     "completedAt",
//     todos[2].completedAt,
//     "creator",
//     todos[2]._creator,
//     'EX',
//     3
//   ],
//   function(err, res) {
//     if (err) {
//       return console.log(err);
//     }
//     return console.log(res);
//   }
// );

// redis.EXPIRE("todos", 10, function(err, res) {
//   console.log(res);
// }  )

redis.HGETALL("todos", function(err, res) {
  if (err) {
    return console.log(err);
  }
  return console.log(res);
});

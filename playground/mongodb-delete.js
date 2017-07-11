const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'eat to lunch'}).then((result) => {
  //   console.log(result);
  // })


  // deleteOne
  // db.collection('Todos').deleteOne({text: 'eat at night'}).then((result) => {
  //   console.log(result);
  // })

  // findOneAndDelete
  // ada result mana yang telah di delete
  // db.collection('Todos').findOneAndDelete({text: 'eat at night'}).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').deleteMany({name: 'Yogi Erka'}).then((result) => {
    console.log(result);
  })
  db.collection('Users').findOneAndDelete({_id: new ObjectID('596520a4f74bc667af2a2867')}).then((result) => {
    console.log(JSON.stringify(result));
  })

  db.close()
})

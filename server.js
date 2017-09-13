const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config/db');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

var db;

MongoClient.connect(dbConfig.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.set('port', (process.env.PORT || 3000));
  app.listen(app.get('port'), () => {
    console.log('listening on 3000')
  })
})

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })
//
// app.get('/todos', function(req, res) {
//   db.collection('todos').find().toArray(function(err, results) {
//       console.log(results)
//       return results
//   });
// });

// app.post('/todos', (req, res) => {
//   console.log(req.body)
//   db.collection('todos').save(req.body, (err, result) => {
//     if (err) return console.log(err)
//
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })
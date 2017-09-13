const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config/db');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

MongoClient.connect(dbConfig.url, (err, database) => {
  if (err) return console.log(err);
  require('./app/routes')(app, database);
  app.set('port', (process.env.PORT || 3000));
  app.listen(app.get('port'), () => {
    console.log('listening on 3000')
  })
});
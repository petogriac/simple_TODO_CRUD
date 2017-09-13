module.exports = function(app, db) {
    var ObjectID = require('mongodb').ObjectID;

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    // Creating a todo
    app.post('/todos', (req, res, next) => {
        console.log("TODO" + req.body.todo)
        const todo = {
            todo: req.body.todo,
            done: false,
        };
        db.collection('todos').insert(todo, (err, result) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    // Listing all todos
    app.get('/todos', (req, res, next) => {
        db.collection('todos').find().toArray(function(err, results) {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(results);
          }
        });
    });
    // Deleting a todo
    app.delete('/todos/:id', (req, res, next) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('todos').remove(details, (err) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Todo: ' + id + ' deleted!');
          }
        });
     });
     // Updating a todo
      app.put('/todos/:id', (req, res, next) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        let updatedValue = {};

        if(req.body.todo) {
            updatedValue = {
                todo: req.body.todo,
            };
        }
        if(req.body.done){
            updatedValue = {
                done: req.body.done,
            }
        }
        db.collection('todos').update(details, { $set: updatedValue}, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(result);
          }
        });
      });
};
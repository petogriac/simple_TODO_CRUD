module.exports = function(app, db) {
    var ObjectID = require('mongodb').ObjectID;
    // Creating a todo
    app.post('/todos', (req, res) => {
        const todo = { todo: req.body.todo};
        db.collection('todos').insert(todo, (err, result) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    // Listing all todos
    app.get('/todos', (req, res) => {
        db.collection('todos').find().toArray(function(err, results) {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(results);
          }
        });
    });
    // Deleting a todo
    app.delete('/todos/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('todos').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Todo: ' + id + ' deleted!');
          }
        });
     });
     // Updating a todo
      app.put('/todos/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const todo = { todo: req.body.todo};
        db.collection('todos').update(details, todo, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(todo);
          }
        });
      });
};
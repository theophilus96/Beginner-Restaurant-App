var express = require('express');
const cors = require('cors');
let mysql = require('mysql');
var app = express();

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GlintsRestaurant'
});

port = process.env.PORT || 4000;
app.listen(port);
console.log('listening on port' +port);

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

app.use(cors());

app.get('/', function(req, res, next) {
  connection.query('SELECT * from Table', function (error, results, fields) {
      if (error){
        console.log('Error while performing Query.');
      }
      else{
        return res.json({
          data: results
        })
      }
      //res.send(JSON.stringify(results));
      
  });
});

app.listen(4000,() =>{
  console.log('listening on port 4000');
})


connection.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});



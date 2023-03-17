const express = require('express');
require('dotenv').config();
const app = express();
const sql = require('msnodesqlv8');
const ejs = require('ejs');
app.use(express.static('public'));

const connectionString = process.env.CONNECTION_STRING;

// Define the queries
const query1 = process.env.QUERY_1;
const query2 = process.env.QUERY_2;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let results1, results2;

  // Execute the first query
  sql.query(connectionString, query1, (err, rows1) => {
    if (err) {
      console.error(err);
      return;
    }

    results1 = rows1;

    // Execute the second query
    sql.query(connectionString, query2, (err, rows2) => {
      if (err) {
        console.error(err);
        return;
      }

      results2 = rows2;

      // Render the HTML template and pass the query results as variables
      res.render('index', { results1, results2 });
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

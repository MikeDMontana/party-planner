const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const users = require('./routes/user');

mongoose.connect(config.DB, {useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => {console.log('Cannot connect to the database' + err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users); //API calls

// app.get('/', function(req, res) {
//   res.send('hello');
// });

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(_dirname, 'frontend/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(_dirname, 'frontend/build', 'index.html'));
  });
}


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

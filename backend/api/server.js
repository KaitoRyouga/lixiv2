const mongoose = require('mongoose')

// const dbHost = process.env.DB_HOST || 'localhost'
// const dbPort = process.env.DB_PORT || 27017
// const dbName = process.env.DB_NAME || 'my_db_name'
const mongoUrl = `mongodb+srv://kaito:kaitoryouga@cluster-learn.ysvwg.mongodb.net/test`

const connectWithRetry = function () { // when using with docker, at the time we up containers. Mongodb take few seconds to starting, during that time NodeJS server will try to connect MongoDB until success.
  return mongoose.connect(mongoUrl, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
      setTimeout(connectWithRetry, 5000)
    }
  })
}
connectWithRetry()

const express = require('express'),
   app = express(),
   bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
app.use(cors());

const port = process.env.PORT_DEV;
app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/appRoutes');
routes(app);
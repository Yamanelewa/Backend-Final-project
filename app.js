const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const { exec } = require('child_process'); 
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

const MoviesRouter = require('./routes/movies');

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use((req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) {
      console.error('Error writing to log.txt:', err);
    }
  });

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.connection_STRING, { useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB:", e);
  });


app.use('/movies', MoviesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);


exec(`start http://localhost:${port}/Movie.html`, function (err) {
  if (err) {
    console.error('Error opening the browser:', err);
  }
});

});

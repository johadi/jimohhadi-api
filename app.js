import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './api';

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));
// app.use(express.static('public'));
api(app);

//connect to the database
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.error(err);
  }
  else {
    console.info("database connected");
  }
});
// uncomment for favicon
// app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info('app is running on port', port);
});

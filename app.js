const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require('helmet');



const { PORT = 3001 } = process.env;

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db_13',
(r) => {
  console.log ('Connected to MongoDB!!!', r)
});

const app = express();
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./routes');

app.use(cors());
app.use(routes);






app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});


// 65425c2ab0abd2dd4fea261c


// database start
// "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"
// server start
// npm run dev
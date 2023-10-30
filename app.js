const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');


const { PORT = 3001 } = process.env;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db',
(r) => {
  console.log ('Connected to MongoDB!!!', r)
  });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', require('/routes/users'))



app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});


// database start
//"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"
//server start
//npm run start
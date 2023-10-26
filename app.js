const express = require('express');
const mongoose = require('mongoose');


const { PORT = 3001, BASE_PATH } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');
const app = express();



app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
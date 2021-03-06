const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const FileUpload = require('express-fileupload');

require('./config/db');

const app = express();

app.use(cors());
app.use(logger('dev'));


//Habilita o Upload 

app.use(FileUpload());

app.use('/upload', require('./routes/upload'));
app.use('/download', require('./routes/donwload'));

module.exports = app;
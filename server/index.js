const express = require('express');
const axios = require('axios');
const path = require('path');

const controller=require('../database')

//create server
var app = express();
//set port number
var port = 3000;
//middle ware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/all',controller.findAll);
app.get('/gallery/:colName',controller.find);
app.post('/gallery/:colName',controller.create);
// app.post('/gallery/add',controller.create);
app.delete('/gallery/:colName',controller.remove);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

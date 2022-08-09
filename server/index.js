const express = require('express');
const axios = require('axios');
const path = require('path');

//create server
var app = express();
//set port number
var port = 3000;
//middle ware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

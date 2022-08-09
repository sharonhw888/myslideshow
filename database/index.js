require("dotenv").config();
const mongoose = require('mongoose');
mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

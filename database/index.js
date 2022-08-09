require("dotenv").config();
const mongoose = require('mongoose');
mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

  const gallerySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    url:[String]
  });

  const Picture = new mongoose.model("Picture", gallerySchema);

  /**
   * @description Finds bands in mongodb and returns all
   * @returns Mongodb Promise(err, data)
   */
  const find = (req,res) => {
    // console.log(req.params.colName)
    return Picture.find({name:req.params.colName}).exec().then((result)=>{res.json(result)});
  };

  const create = (req,res) => {
    return Picture.findOneAndUpdate(
      {name:'default'},
      {url:req.body},
      {upsert:true}
    ).then((result)=>{res.json(result)});
  };

  module.exports = {
    find,
    create
  };

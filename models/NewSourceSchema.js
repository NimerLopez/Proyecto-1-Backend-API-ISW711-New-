const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewSoModel = new Schema({
  url: { type: String },
  name: { type: String },
  category_id: { type: String, required: true },
  user_id: { type: String, required: true }
});
module.exports = mongoose.model('newSource', NewSoModel);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewModel = new Schema({
  title: { type: String },
  short_description: { type: String },
  permalink:{ type: String },
  date: { type: String },
  new_source_id: { type: String },
  user_id:{ type: String, required:true },
  category_id: { type: String, required:true },
});

module.exports = mongoose.model('news',NewModel);
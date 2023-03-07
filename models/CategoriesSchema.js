const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = new Schema({
  name: { type: String, required: true },
});
const UserModel = mongoose.model('Categories', Categories);
module.exports = {
  schema: Categories,
  model: UserModel
}
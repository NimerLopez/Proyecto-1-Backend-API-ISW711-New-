const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String },
  firstname: { type: String, required: true },
  lastname:{ type: String, required: true },
  role: { type: String, required: true }
});
const UserModel = mongoose.model('users',User);
module.exports = {
  schema: User,
  model: UserModel
}


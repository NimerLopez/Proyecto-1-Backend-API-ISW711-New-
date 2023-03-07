const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, required: true, unique:true},
  firstname: { type: String, required: true },
  lastname:{ type: String, required: true },
  password:{type:String,required:true},
  address:{type:String},
  addressDos:{type:String},
  country:{type:String},
  city:{type:String},
  zip:{type:String},
  phoneNumber:{type:Number},
  role: { type: String, required: true }
});
const UserModel = mongoose.model('users',User);
module.exports = {
  schema: User,
  model: UserModel
}


import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const usersSchema = new Schema({
  fullname: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    require: true,
    type: String,
    minLength: 6,
  },
  contactNo: Number,
});

usersSchema.pre("save", function (next) {
  const user = this;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);

  user.password = hash

  next()
});

usersSchema.methods.comparePassword = function (password) {
    const user = this
    return bcrypt.compareSync(password, user.password);
}

const Users = mongoose.model("users", usersSchema);

export default Users;

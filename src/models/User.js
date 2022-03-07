const mongoose = require("../database");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: Number,
    default: 0,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

const createAdmin = async () => {
  const body = {
    id: -1,
    role: 1,
    email: "admin",
    password: "admin",
    name: "admin",
  };
  const response = await User.findOne({ id: body.id });
  if (!response) {
    await User.create(body);
    return;
  }
};
createAdmin();
module.exports = User;

import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: [true, 'please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: 'string',
    required: [true, 'please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: 'string',
    required: [true, 'please provide password'],
    minlength: 6,
    select: false,
  },
});

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());

  // return if we don't modify 'password'
  if (!this.isModified('password')) return;

  // generate more characters
  const salt = await bcrypt.genSalt(10);

  // hashing the password
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  // sign (payload, secret, options)
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// create 'User' collection in mongodb using UserSchema
export default mongoose.model('User', UserSchema);

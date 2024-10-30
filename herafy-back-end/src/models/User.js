import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    enum: ['client', 'craftsman'],
    required: true,
  },
  jobTitle: {
    type: String,
    required: function () {
      return this.role === 'craftsman';
    },
  },
  description: {
    type: String,
    required: function () {
      return this.role === 'craftsman';
    },
  },
  photo: {
    type: String,
    default: '',
  },
});

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWTSEC
    // { expiresIn: '1h' }
  );
  return token;
};

const User = mongoose.model('User', userSchema);
export default User;

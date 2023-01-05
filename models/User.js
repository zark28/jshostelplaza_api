const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required.'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required.'],
    },
    otherNames: {
      type: String,
      required: false,
    },

    gender: {
      type: String,
      required: [true, 'Gender is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);

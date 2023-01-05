const { model, Schema } = require('mongoose');

const tenantSchema = new Schema(
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
    roomType: {
      type: String,
      required: [true, 'Room details are required'],
    },
    occupancy: {
      type: String,
      required: [true, 'Room details are required'],

    },
    rentPeriod: {
      type: Number,
      required: [true, 'Room details are required'],
    },
 
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model('Tenant', tenantSchema);

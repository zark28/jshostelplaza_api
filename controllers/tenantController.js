const Tenant = require('../models/Tenant');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { bookingValidator } = require('../utils/validation');

const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find().sort({ createdAt: -1 });
    res.status(200).json({ tenants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      res.status(404).send('Post with this ID could not be found.');
    }
    res.status(200).json({ tenant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTenant = async (req, res) => {
  try {
    const result = await bookingValidator.validateAsync(req.body);

    const {
      email,
      gender,
      firstName,
      lastName,
      otherNames,
      phone,
      occupancy,
      roomType,
      rentPeriod,
    } = result;

    //create Blog

    const tenant = await Tenant.create({
      email,
      gender,
      firstName,
      lastName,
      otherNames,
      phone,
      occupancy,
      roomType,
      rentPeriod,
    });

    res.status(201).json({ tenant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const loginTenant = async (req, res) => {
//   const result = await loginValidator.validateAsync(req.body);
//   const { email, password } = result;

//   // check if email is in the database
//   let tenant = await Tenant.findOne({ email });
//   if (!tenant) {
//     res.status(400).json({ message: 'Invalid credentials' });
//     return;
//   }

//   // check for password
//   const isMatch = await bcrypt.compare(password, tenant.password);
//   if (!isMatch) {
//     res.status(400).json({ message: 'Invalid credentials' });
//     return;
//   }
//   res.status(201).json({ tenant });
//   // generate token
//   // const token = jwt.sign({ id: tenant._id }, '123456789', {
//   //   expiresIn: '1h',
//   // });

//   // res.status(200).json({ token });
// };

const updateTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const tenant = await Tenant.findByIdAndUpdate(tenantId, req.body, {
      new: true,
    });
    res.status(200).json({ tenant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    await Tenant.findOneAndDelete({ _id: tenantId });
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTenants,
  getTenant,
  createTenant,
 
  updateTenant,
  deleteTenant,
};

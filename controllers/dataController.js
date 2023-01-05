const Tenant = require('../models/Tenant');
const User = require('../models/User');


const getAllData = async (req, res) => {
  try {
    const tenants = await Tenant.find().sort({ createdAt: -1 });
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ tenants,users});
  }

  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={
    getAllData
}
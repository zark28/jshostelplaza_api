const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
// const { verifyToken } = require('../controllers/authController');

router.get('/', tenantController.getAllTenants);
router.post('/register', tenantController.createTenant);

router
  .route('/:tenantId')
  .get(tenantController.getTenant)
  .patch(tenantController.updateTenant)
  .delete(tenantController.deleteTenant);

module.exports = router;

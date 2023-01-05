const express = require('express');
const router = express.Router();
const adminContoller = require('../controllers/authController');

router.get('/', adminContoller.getAllUsers);
router.post('/register', adminContoller.register);
router.post('/login', adminContoller.login);
// router.post("/google",)
router
  .route('/:userId')
  .get(adminContoller.getUser)
  .patch(adminContoller.updateUser)
  .delete(adminContoller.deleteUser);
module.exports = router;

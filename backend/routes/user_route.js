const router = require('express').Router();
const UserController = require("../controller/user_controller")


router.post('/save-data', UserController.saveData);

router.get('/get-data', UserController.getUserData);

module.exports = router;

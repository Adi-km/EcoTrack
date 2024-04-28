const router = require('express').Router();
const CampusController = require("../controller/campus_controller")


router.post('/save-data/outlets/', CampusController.saveDataOutlets);
router.post('/save-data/electricity/', CampusController.saveDataElectricity);
router.get('/get-all-data', CampusController.getAllCampusData);


module.exports = router;
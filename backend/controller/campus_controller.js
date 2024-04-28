const CampusService = require("../services/campus_services")


exports.saveDataOutlets = async (req,res,next) =>{
    try{
        const body = req.body;

        const successTes = await CampusService.saveDataOutlets(body);
        console.log("Saved successfully");

        res.status(200).send('Data received and appended to array');
    }
    catch(e){

        res.status(500).send('Error!')
        console.log(e);
    }
}


exports.saveDataElectricity = async (req,res,next) =>{
    try{
        const body = req.body;

        const successTes = await CampusService.saveDataElectricity(body);
        console.log("Saved successfully");

        res.status(200).send('Data received and appended to array');
    }
    catch(e){

        res.status(500).send('Error!')
        console.log(e);
    }
}

exports.getAllCampusData = async (req,res,next) =>{
    try{

        const campusData = await CampusService.getAllCampusData();
        console.log("Retrived successfully");

        res.status(200).json(campusData);
    }
    catch(e){
        console.log(e);
    }
}

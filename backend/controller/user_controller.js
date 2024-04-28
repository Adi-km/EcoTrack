const UserService = require("../services/user_services")


exports.saveData = async (req,res,next) =>{
    try{
        const body = req.body;

        const successTes = await UserService.saveData(body);
        console.log("Saved successfully");

        res.status(200).send('Data received and appended to array');
    }
    catch(e){
        console.log(e);
    }
}

exports.getUserData = async (req,res,next) =>{
    try{
        const userEmail = req.query.email;

        const userData = await UserService.getUserData(userEmail);
        console.log("Retrived successfully");

        res.status(200).json({data : userData});
    }
    catch(e){
        console.log(e);
    }
}
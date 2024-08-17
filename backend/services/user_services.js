const UserModel = require("../model/user_model")



class UserService{
    static async saveData(newData){
        try{
            

            let existingUser = await UserModel.findOne({email : newData.email});


            if(existingUser)
            {
                existingUser.carbonData.push({
                    power: newData.Value[0],
                    vehicle: newData.Value[1],
                    publicTransport: newData.Value[2],
                    flight: newData.Value[3],
                    food: newData.Value[4],
                    secondary: newData.Value[5],
                    startDate: newData.Value[6],
                    endDate: newData.Value[7],
                });
                return await existingUser.save(); 
            }
            
            else
            {
                const dataSave = new UserModel({
                    "email" : newData.email, "carbonData" : 
                    [{
                        "power" : newData.Value[0], 
                        "vehicle" : newData.Value[1],
                        "publicTransport" : newData.Value[2],
                        "flight" : newData.Value[3],
                        "food" : newData.Value[4],
                        "secondary" : newData.Value[5],
                        "startDate": newData.Value[6],
                        "endDate": newData.Value[7],
                    }]
    
                })
                return await dataSave.save();
            }
            

            
        }
        catch(e){
            console.log(e);
        }
    }



    static async getUserData(userEmail){
        const data = await UserModel.findOne({email : userEmail});
        return data;
    }
}

module.exports = UserService;
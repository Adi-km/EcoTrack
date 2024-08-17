const { ConnectionStates } = require("mongoose");
const CampusModel = require("../model/campus_model")
class CampusService {


    static async saveDataOutlets(data) {


        try {
            let locationData = await CampusModel.findOne({ location: data.location })

            if (locationData) {
                let arr1 = [0, 0, 0, 0];
                let flag1 = 1;
                let arr2 = [0, 0, 0, 0];
                let flag2 = 1;

                let date1 = new Date(data.Value[3]);
                date1 = new Date(date1.toISOString());
                date1 = date1.toISOString().split('T')[0];

                let date2 = new Date(data.Value[4]);
                date2 = new Date(date2.toISOString());
                date2 = date2.toISOString().split('T')[0];


                for (let i = 0; i < locationData.carbonData.length; i++) {

                    let dataDate = locationData.carbonData[i].Date.toISOString().split('T')[0];

                    if (date1 == dataDate) {

                        arr1[0] = locationData.carbonData[i].food;
                        arr1[1] = locationData.carbonData[i].paper;
                        arr1[2] = locationData.carbonData[i].gas;
                        arr1[3] = locationData.carbonData[i].others;
                        flag1 = 2;
                        locationData.carbonData.splice(i, 1);
                    }

                }

                for (let i = 0; i < locationData.carbonData.length; i++) {

                    let dataDate = locationData.carbonData[i].Date.toISOString().split('T')[0];
                    if (date2 == dataDate) {

                        arr2[0] = locationData.carbonData[i].food;
                        arr2[1] = locationData.carbonData[i].paper;
                        arr2[2] = locationData.carbonData[i].gas;
                        arr2[3] = locationData.carbonData[i].others;
                        flag2 = 2;
                        locationData.carbonData.splice(i, 1);
                    }

                }

                if (data.Value[3] == data.Value[4]) {

                    locationData.carbonData.push({
                        food: (data.Value[0] + arr1[0]) / flag1,
                        paper: (data.Value[1] + arr1[1]) / flag1,
                        gas: (data.Value[2] + arr1[2]) / flag1,
                        others: (data.Value[5] + arr1[3]) / flag1,
                        Date: data.Value[3],
                    })
                }
                else {

                    locationData.carbonData.push({
                        food: (data.Value[0] + arr1[0]) / flag1,
                        paper: (data.Value[1] + arr1[1]) / flag1,
                        gas: (data.Value[2] + arr1[2]) / flag1,
                        others: (data.Value[5] + arr1[3]) / flag1,
                        Date: data.Value[3],
                    },
                        {
                            food: (data.Value[0] + arr2[0]) / flag2,
                            paper: (data.Value[1] + arr2[1]) / flag2,
                            gas: (data.Value[2] + arr2[2]) / flag2,
                            others: (data.Value[5] + arr2[3]) / flag2,
                            Date: data.Value[4],
                        }
                    )

                }

                return await locationData.save();
            }

            else {
                if (data.Value[3] == data.Value[4]) {

                    const dataSave = new CampusModel({
                        location: data.location,
                        carbonData: [{
                            food: data.Value[0],
                            paper: data.Value[1],
                            gas: data.Value[2],
                            Date: data.Value[3],
                            others: data.Value[5],
                        }]
                    })
                    return await dataSave.save();
                }

                else {

                    const dataSave = new CampusModel({
                        location: data.location,
                        carbonData: [{
                            food: data.Value[0],
                            paper: data.Value[1],
                            gas: data.Value[2],
                            others: data.Value[5],
                            Date: data.Value[3],
                        },
                        {
                            food: data.Value[0],
                            paper: data.Value[1],
                            gas: data.Value[2],
                            others: data.Value[5],
                            Date: data.Value[4],
                        }]
                    })
                    return await dataSave.save();

                }



            }
        }

        catch (e) {
            console.log(e);
        }
    }


    static async saveDataElectricity(data) {
        let latestCarbonData;

        // Perform the aggregation query
        CampusModel.aggregate([
            // Unwind the carbonData array to work with individual documents
            { $unwind: "$carbonData" },
            // Group by location and find the document with the maximum Date
            {
                $group: {
                    _id: "$location",
                    latestCarbonData: { $max: "$carbonData.Date" },
                    data: { $push: "$$ROOT" }
                }
            },
            // Project to reshape the output
            {
                $project: {
                    _id: 0,
                    location: "$_id",
                    carbonData: {
                        $filter: {
                            input: "$data",
                            as: "doc",
                            cond: { $eq: ["$$doc.carbonData.Date", "$latestCarbonData"] }
                        }
                    }
                }
            }
        ], (err, result) => {
            if (err) {
                console.error('Error retrieving data:', err);
            } else {
                // Store the result in the variable
                latestCarbonData = result;
                console.log('Result:', latestCarbonData);
            }
        });

        try {
            let locationData = await CampusModel.findOne({ location: data.location })

            if (locationData) {
                let arr1 = [0];
                let flag1 = 1;
                let arr2 = [0];
                let flag2 = 1;

                let date1 = new Date(data.Value[0]);
                date1 = new Date(date1.toISOString());
                date1 = date1.toISOString().split('T')[0];

                let date2 = new Date(data.Value[1]);
                date2 = new Date(date2.toISOString());
                date2 = date2.toISOString().split('T')[0];


                for (let i = 0; i < locationData.carbonData.length; i++) {

                    let dataDate = locationData.carbonData[i].Date.toISOString().split('T')[0];

                    if (date1 == dataDate) {

                        arr1[0] = locationData.carbonData[i].electricity;
                        flag1 = 2;
                        locationData.carbonData.splice(i, 1);
                    }

                }

                for (let i = 0; i < locationData.carbonData.length; i++) {

                    let dataDate = locationData.carbonData[i].Date.toISOString().split('T')[0];
                    if (date2 == dataDate) {

                        arr2[0] = locationData.carbonData[i].electricity;
                        flag2 = 2;
                        locationData.carbonData.splice(i, 1);
                    }

                }

                if (data.Value[0] == data.Value[1]) {


                    locationData.carbonData.push({
                        electricity: (data.Value[2] + arr1[0]) / flag1,
                        Date: data.Value[0],

                    })
                }
                else {

                    locationData.carbonData.push({
                        electricity: (data.Value[2] + arr1[0]) / flag1,
                        Date: data.Value[0],
                    },
                        {
                            electricity: (data.Value[0] + arr2[0]) / flag2,
                            Date: data.Value[1],
                        }
                    )

                }

                return await locationData.save();
            }

            else {
                if (data.Value[0] == data.Value[1]) {

                    const dataSave = new CampusModel({
                        location: data.location,
                        carbonData: [{
                            electricity: data.Value[2],
                            Date: data.Value[0],
                        }]
                    })
                    return await dataSave.save();
                }

                else {

                    const dataSave = new CampusModel({
                        location: data.location,
                        carbonData: [{
                            electricity: data.Value[2],
                            Date: data.Value[0],
                        },
                        {
                            electricity: data.Value[2],
                            Date: data.Value[1],
                        }]
                    })
                    return await dataSave.save();

                }
            }
        }

        catch (e) {
            console.log(e);
        }
    }



    static async getAllCampusData(){
        const data = await CampusModel.aggregate([
            { $unwind: "$carbonData" },
            {
                $group: {
                    _id: "$location",
                    latestCarbonData: { $max: "$carbonData.Date" },
                    data: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    _id: 0,
                    location: "$_id",
                    carbonData: {
                        $filter: {
                            input: "$data",
                            as: "doc",
                            cond: { $eq: ["$$doc.carbonData.Date", "$latestCarbonData"] }
                        }
                    }
                }
            }
        ]);
        return data;
    }

};

module.exports = CampusService;
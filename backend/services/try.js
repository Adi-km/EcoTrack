const { ConnectionStates } = require("mongoose");
const CampusModel = require("../model/campus_model")


let latestCarbonData;

let latestCarbonDataPromise = CampusModel.aggregate([
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
]).exec();

latestCarbonDataPromise.then((result) => {
    console.log('Result:');
    latestCarbonData = result;
    result.forEach((item) => {
        console.log(`Location: ${item.location}`);
        console.log('Carbon Data:');
        item.carbonData.forEach((carbonItem) => {
            console.log(JSON.stringify(carbonItem, null, 2));
        });
    });
    console.log(latestCarbonData);
}).catch((err) => {
    console.error('Error retrieving data:', err);
});

;

// Now you can use `latestCarbonData` variable elsewhere in your code

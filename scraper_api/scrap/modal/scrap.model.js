const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    City: {type: String},
    Zip_Code: {type: String},
    County: {type: String},
    Redfin_Median_Sale_Price_: {type: String},
    Redfin_Change_in_Sales_price_from_Last_Year:{type: String},
    Sold_Under_List_Price:{type: String},
    Redfin_DOM_:{type: String},
    Homes_Sold_:{type: String},
    Cash_Sales_2018_2019:{type: String},
    Cash_Sales_2019_2020:{type: String},
    Population:{type: String},
    Minority_Share:{type: String},
    Poverty_Rate:{type: String},
    Adults_not_Working:{type: String},
    Density:{type: String},
    
    High_School_Diploma:{type: String},
    Housing_Vacancy_Rate:{type: String},
    Median_Income_Ratio:{type: String},
    Distress_Rank_within:{type: String},
    Distress_Rank_within_State:{type: String},
    Total_Number_of_Zips_in_State:{type: String},
    Distress_Tier:{type: String},
    Population_Density_Per_Square_Mile_Number:{type: String}
});



const Scrap = mongoose.model('tbl_data', userSchema);


exports.finddata = () => {
    return new Promise((resolve, reject) => {
        Scrap.find({})
            .exec(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
        })
    })
};




exports.addData = (data) => {
    data.createdAt = new Date();
   

   const saveData = new Scrap(data);
   return saveData.save();

};




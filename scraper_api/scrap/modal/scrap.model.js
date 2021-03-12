const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    title: {type: String},
    saleprice: {type: String},
    Days_on_Market: {type: String},
    Total_Homes_Sold: {type: String},
    createdAt:{type: String}
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




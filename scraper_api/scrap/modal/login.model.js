const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const headerSchema = new Schema({
    username: {type: String},
    password: {type: String},
});



const Admin = mongoose.model('tbl_admin', headerSchema);


exports.findUser = (email) => {
    return new Promise((resolve, reject) => {
        Admin.find({email:email})
            .exec(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
        })
    })
};


exports.saveAdmin = (data) => {
   

   const saveData = new Admin(data);
   return saveData.save();

};




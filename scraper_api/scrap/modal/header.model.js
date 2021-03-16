const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const headerSchema = new Schema({
    title: {type: String},
    status: {type: String},
});



const Header = mongoose.model('tbl_header', headerSchema);


exports.getHeader = () => {
    return new Promise((resolve, reject) => {
        Header.find({})
            .exec(function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
        })
    })
};


exports.addHeader = (data) => {
   

   //const saveData = new Header(data);

   return Header.update(  { title:data.title} , { $set: data } );

   //return saveData.save();

};




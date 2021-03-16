
const LoginModel = require('../modal/login.model');

exports.login = (req, res) => {
    res.render('login');

}   

exports.checkUser = (req, res) => {
    LoginModel.saveAdmin({email:"admin@gmail.com",password:"123456"})
    .then((result) => {
         res.send({data:result});
    })

}   
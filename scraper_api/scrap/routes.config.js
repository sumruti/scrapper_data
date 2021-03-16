const ScraperController = require('./controller/scrap.controller');

const LoginController = require('./controller/login.controller');



exports.routesConfig = function (app) {

    app.get('/', [
        ScraperController.get
    ]);

    app.post('/api/addData', [
        ScraperController.addData
    ]);

    app.post('/api/updateHeader', [
        ScraperController.addHeader
    ]);
   

    app.get('/api/getData', [
        ScraperController.getData
    ]);

    app.get('/api/getHeader', [
        ScraperController.getHeader
    ]);

    app.get('/login', [
        LoginController.login
    ]);
   
    app.post('/login', [
        LoginController.checkUser
    ]);
   
   
};

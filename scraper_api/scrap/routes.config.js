const ScraperController = require('./controller/scrap.controller');



exports.routesConfig = function (app) {

    app.get('/', [
        ScraperController.get
    ]);

    app.post('/api/addData', [
        ScraperController.addData
    ]);
   

    app.get('/api/getData', [
        ScraperController.getData
    ]);
   
   
};

var express = require('express');
var path = require('path');
var fs = require('fs');
var createError = require('http-errors');
var app = express();
var http = require('http').createServer(app);
const rp = require('request-promise');
const $ = require('cheerio');
const ScraperRouter = require('./scraper_api/scrap/routes.config');
ScraperRouter.routesConfig(app);

app.set('view engine', 'ejs');
app.use(express.static('public'))


// const url = 'https://www.redfin.com/zipcode/44510/housing-market';

// rp(url)
//   .then(function(html) {
//     //console.log($('.firstHeading', html).text());
//     var title = $('.HomePricesSection .sectionHeaderContainer', html).text();
//     var saleprice = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent .detail:first-child div .value span', html).text();
//     var Days_on_Market = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent:last-child .detail:nth-child(3) .value span', html).text();
//     var Total_Homes_Sold = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent:last-child .detail:nth-child(7) .value span', html).text();
//     console.log(title,'==',saleprice,'==',Days_on_Market,'==',Total_Homes_Sold);
//   })
//   .catch(function(err) {
//     console.log(err)
//   })




const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`Server ready at ${port}`);
});

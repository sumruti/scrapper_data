var express = require('express');
var path = require('path');
var fs = require('fs');
var createError = require('http-errors');
var app = express();
var http = require('http').createServer(app);
const rp = require('request-promise');
const $ = require('cheerio');
const bodyParser = require("body-parser");

const ScraperRouter = require('./scraper_api/scrap/routes.config');
ScraperRouter.routesConfig(app);

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
console.log("@!herer")
// parse application/json
app.use(bodyParser.json())


app.post("/test",(req,res)=>{
     console.log(req.body);
})
const puppeteer = require('puppeteer')




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


async function getData(){ 





 var data = [
        {"zip":"44510"},
        {"zip":"76621"},
        {"zip":"21005"},
        {"zip":"44510"},
        {"zip":"76621"},
        {"zip":"79606"},
        {"zip":"79607"},
        {"zip":"61410"},
        {"zip":"24210"},
        {"zip":"24211"},
        {"zip":"19001"},
        {"zip":"70420"},
        {"zip":"59001"},
        {"zip":"79603"},
        {"zip":"79607"},
        {"zip":"54101"},
        {"zip":"20607"},
        {"zip":"93510"},
        {"zip":"30101"}
]
var interval = 20000; // 10 seconds;


for(let i=0; i < data.length; i++){

  setTimeout( async function (i) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://www.redfin.com/zipcode/'+data[i].zip+'/housing-market', {waitUntil: 'load', timeout: 0})
  await page.setDefaultNavigationTimeout(6000000);

  await page.waitForSelector('.HomePricesSection')

  const html = await page.evaluate(() => document.body.innerHTML);

  //console.log($('.firstHeading', html).text());
  var title = $('.HomePricesSection .sectionHeaderContainer', html).text();
  var saleprice = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent .detail:first-child div .value span', html).text();
  var Days_on_Market = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent:last-child .detail:nth-child(3) .value span', html).text();
  var Total_Homes_Sold = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent:last-child .detail:nth-child(7) .value span', html).text();
  console.log(title,'==',saleprice,'==',Days_on_Market,'==',Total_Homes_Sold);



  await page.waitForNavigation()
  await page.screenshot({ path: screenshot })
  browser.close()
  console.log('See screenshot: ' + screenshot)
}, interval * i, i);
}


}
//getData();

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`Server ready at ${port}`);
});

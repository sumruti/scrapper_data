const ScrapModel = require('../modal/scrap.model');

const HeaderModel = require('../modal/header.model');

var readxlsx = require('xlsx');
const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');



exports.get = (req, res) => {
    res.render('index');

}   


exports.getData = (req, res) => {
    ScrapModel.finddata()
    .then((result) => {
         res.send({data:result});
    })

}   

exports.getHeader = (req, res) => {
  HeaderModel.getHeader()
  .then((result) => {
       res.send({data:result});
  })

}   


exports.addHeader = (req, res) => {
 
  HeaderModel.addHeader(req.body)
  .then((result) => {
       res.send({data:result});
  })

} 


exports.addData = (req, res) => {

var workbook = readxlsx.readFile('./Zip_Code_Analysisr.xlsx');
var sheet_name_list = workbook.SheetNames;

sheet_name_list.forEach(function(y) {

  var interval = 5000; // 10 seconds;
  var count =  1;
  setTimeout( async function (i) {
    var worksheet = workbook.Sheets[y];

    const getExcelData = new Promise((resolve, reject) => {
      var headers = {};
      var data = [];
              for(z in worksheet) {
                if(z[0] === '!') continue;
                //parse out the column, row, and value
                var tt = 0;
                for (var i = 0; i < z.length; i++) {
                    if (!isNaN(z[i])) {
                        tt = i;
                        break;
                    }
                };

                
                var col = z.substring(0,tt);
                var row = parseInt(z.substring(tt));
                var value = worksheet[z].v;
                  
            
                if(row == 1 && value) {
                    headers[col] = value;
                    continue;
                }
                headers_new = headers[col].replace(/ /g,"_")
                headers_new = headers_new.replace(/["']/g, "");
        
        
                if(!data[row]) data[row]={};
                data[row][headers_new] = value;
                
              
            }

            data.shift();
            data.shift();

            resolve(data);


    });

    getExcelData.then((data)=>{
         console.log( data.length);
         var interval = 5000; // 10 seconds;
         var count =  1;
         data.forEach(async function(res) {


          setTimeout( async function (i) {
              var City = res.City ? res.City :'';
              var Zip_Code = res.Zip_Code ? res.Zip_Code :'';
              var County = res.County ? res.County :'';
              var Density = res.Density
              var Redfin_Median_Sale_Price_ = res['Redfin_Median_Sale_Price_(30_Days)'] ? res['Redfin_Median_Sale_Price_(30_Days)'] :'';
              var Redfin_Change_in_Sales_price_from_Last_Year = res['Redfin_%_Change_in_Sales_price_from_Last_Year'] ? res['Redfin_%_Change_in_Sales_price_from_Last_Year'] :'';
              var Sold_Under_List_Price = res.Sold_Under_List_Price ? res.Sold_Under_List_Price :'';
              var Redfin_DOM_ = res['Redfin_DOM_(30_Days)'] ? res['Redfin_DOM_(30_Days)'] :'';
              var Homes_Sold_ = res['Homes_Sold_(30_Days)'] ? res['Homes_Sold_(30_Days)'] :'';
              var Cash_Sales_2018_2019 = res['2018_-_2019_Cash_Sales'] ? res['2018_-_2019_Cash_Sales'] :'';
              var Cash_Sales_2019_2020 = res['2019_-_2020_Cash_Sales'] ? res['2019_-_2020_Cash_Sales'] :'';
              var Population = res.Population ? res.Population :'';
              var Minority_Share = res.Minority_Share ? res.Minority_Share :'';
              var High_School_Diploma = res['%_Adults_w/o_High_School_Diploma'] ? res['%_Adults_w/o_High_School_Diploma'] :'';
              var Poverty_Rate = res.Poverty_Rate ? res.Poverty_Rate :'';
              var Adults_not_Working = res['%_of_Adults_not_Working'] ? res['%_of_Adults_not_Working'] :'';
              var Housing_Vacancy_Rate = res.Housing_Vacancy_Rate ? res.Housing_Vacancy_Rate :'';
              var Median_Income_Ratio = res.Median_Income_Ratio ? res.Median_Income_Ratio :'';
              var Distress_Rank_within = res['Distress_Rank_within_U.S.'] ? res['Distress_Rank_within_U.S.'] :'';
              var Distress_Rank_within_State = res.Distress_Rank_within_State ? res.Distress_Rank_within_State :'';
              var Total_Number_of_Zips_in_State = res.Total_Number_of_Zips_in_State ? res.Total_Number_of_Zips_in_State :'';
              var Distress_Tier = res.Distress_Tier ? res.Distress_Tier :'';
              var Population_Density_Per_Square_Mile_Number = res.Population_Density_Per_Square_Mile_Number  ? res.Population_Density_Per_Square_Mile_Number :"";
            

                  // /console.log(col,'--',value);
               const url = 'https://www.redfin.com/zipcode/'+Zip_Code+'/housing-market';

              //  let options = {
              //      uri: url,
              //      headers: {
              //        Connection: 'keep-alive',
              //        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
              //      }
              //    }

                 let options = {
                  uri : url,
                  insecure: true,
                  rejectUnauthorized: false
              };

              if(count <= 500 ){
             
               rp(url)
                 .then(function(html) {
                   //console.log($('.firstHeading', html).text());
                   var title = $('.HomePricesSection .sectionHeaderContainer', html).text();
                   var saleprice = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent .detail:first-child div .value span', html).text();
                   var Days_on_Market = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent:last-child .detail:nth-child(3) .value span', html).text();
                   var Total_Homes_Sold = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent:last-child .detail:nth-child(7) .value span', html).text();
                   console.log(title,'==',saleprice,'==',Days_on_Market,'==',Total_Homes_Sold);



                  //  var data = {
                  //      title:title,
                  //      saleprice:saleprice,
                  //      Days_on_Market:Days_on_Market,
                  //      Total_Homes_Sold:Total_Homes_Sold
                  //  }

                   var saveData = {
                    City:City,
                    Zip_Code:Zip_Code,
                    County:County,
                    Redfin_Median_Sale_Price_:saleprice ? saleprice :'', //Redfin_Median_Sale_Price_,
                    Redfin_Change_in_Sales_price_from_Last_Year:Redfin_Change_in_Sales_price_from_Last_Year,
                    Sold_Under_List_Price:Sold_Under_List_Price,
                    Redfin_DOM_:Days_on_Market ?  Days_on_Market :'', //Redfin_DOM_,
                    Homes_Sold_:Total_Homes_Sold ? Total_Homes_Sold :'', //Homes_Sold_,
                    Cash_Sales_2018_2019:Cash_Sales_2018_2019,
                    Cash_Sales_2019_2020:Cash_Sales_2019_2020,
                    Population:Population,
                    Minority_Share:Minority_Share,
                    Poverty_Rate:Poverty_Rate,
                    Adults_not_Working:Adults_not_Working,
                    High_School_Diploma:High_School_Diploma,
                    Housing_Vacancy_Rate:Housing_Vacancy_Rate,
                    Median_Income_Ratio:Median_Income_Ratio,
                    Distress_Rank_within:Distress_Rank_within,
                    Distress_Rank_within_State:Distress_Rank_within_State,
                    Total_Number_of_Zips_in_State:Total_Number_of_Zips_in_State,
                    Distress_Tier:Distress_Tier,
                    Density:Density,
                    Population_Density_Per_Square_Mile_Number:Population_Density_Per_Square_Mile_Number,
                    
                  }

                   

                  // console.log(data)

                   ScrapModel.addData(saveData)
                       .then((result) => {
                           if(result){
                               //return res.send({status:false, message: ''});
                               console.log(result);
                           }else{
                               
                           }
                   
                   })  


                 })
                 .catch(function(err) {
                   console.log(err)
                 });
              }else{
                if(count == 500 ){
                 res.send({status:true})
                }
              }
                 count++;

               

             
            }, interval * count, count);
         })

    })

    
   
  
    //drop those first two rows which are empty
   
   // console.log(data);

  }, interval * count, count);


});



    
};





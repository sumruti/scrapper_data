const ScrapModel = require('../modal/scrap.model');
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


exports.addData = (req, res) => {

var workbook = readxlsx.readFile('./Zip_Code_Analysisr.xlsx');
var sheet_name_list = workbook.SheetNames;
console.log("!hererer")

sheet_name_list.forEach(function(y) {

  var interval = 5000; // 10 seconds;
  var count =  1;
  setTimeout( async function (i) {
    var worksheet = workbook.Sheets[y];
    //console.log(worksheet)
    var headers = {};
    var data = [];
    var new_data = [];
    var zipcode = [];

    
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

        //console.log(col,'--',value);
        
       

        if(col=='B'){

          zipcode.push({'zip':value});


            if(count < 1000){
           
               // /console.log(col,'--',value);
                const url = 'https://www.redfin.com/zipcode/'+value+'/housing-market';

                let options = {
                    uri: url,
                    headers: {
                      Connection: 'keep-alive',
                      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
                    }
                  }
              
                rp(url)
                  .then(function(html) {
                    //console.log($('.firstHeading', html).text());
                    var title = $('.HomePricesSection .sectionHeaderContainer', html).text();
                    var saleprice = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent .detail:first-child div .value span', html).text();
                    var Days_on_Market = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent:last-child .detail:nth-child(3) .value span', html).text();
                    var Total_Homes_Sold = $('.HomePricesSection .sectionContent .RealEstateTrends .DetailsComponent:last-child .detail:nth-child(7) .value span', html).text();
                    console.log(title,'==',saleprice,'==',Days_on_Market,'==',Total_Homes_Sold);


                    if(title !='' || saleprice !='' || Days_on_Market !='' || Total_Homes_Sold !=''){

                    var data = {
                        title:title,
                        saleprice:saleprice,
                        Days_on_Market:Days_on_Market,
                        Total_Homes_Sold:Total_Homes_Sold
                    }

                    new_data.push(data)
                   // console.log(data)

                    ScrapModel.addData(data)
                        .then((result) => {

                          console.log(result)
                            if(result){
                                //return res.send({status:false, message: ''});
                               // console.log(result);
                            }else{
                                
                            }
                    
                    })  
                   }

                  })
                  .catch(function(err) {
                    console.log(err)
                  });
                }

                 

                  //console.log(new_data.length)
                  //console.log(new_data)
                
        }else{

            if(count==50){
              //res.send({status:true})
            }
            
        }

        count++;
     //   console.log(count)


        // let data = JSON.stringify(zipcode);
        // fs.writeFileSync('zipcode-2.json', data);

        //store header names
        if(row == 1 && value) {
            headers[col] = value;
            continue;
        }


        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
        //console.log(data[row][headers[col]])
       // console.log(value)
    }
  
    //drop those first two rows which are empty
    data.shift();
    data.shift();
   /// console.log(data);

  }, interval * count, count);


});



    
};





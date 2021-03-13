const ScrapModel = require('../modal/scrap.model');
var readxlsx = require('xlsx');
const rp = require('request-promise');
const $ = require('cheerio');



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
           
                ///console.log(col,'--',value);
                const url = 'https://www.redfin.com/zipcode/'+data[i].zip+'/housing-market';

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
                            if(result){
                                //return res.send({status:false, message: ''});
                                console.log(result);
                            }else{
                                
                            }
                    
                    })  
                   }

                  })
                  .catch(function(err) {
                    console.log(err)
                  });
              

            }, interval * i, i);


                  //console.log(new_data.length)
                  //console.log(new_data)
                
        }
    

   
    
   

   
    
};





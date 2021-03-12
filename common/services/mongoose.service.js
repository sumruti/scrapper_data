const mongoose = require('mongoose');
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};


const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    //old databse
    //"mongodb+srv://lbdevelopment:CIgMuVf1AdWPK8c8@cluster0.9ysqj.mongodb.net/LB_MVP_LOUNCH?retryWrites=true&w=majority"
    const url = 'mongodb+srv://mettle:vjva4jpB7Qib7SfK@cluster0.oqlo2.mongodb.net/scrapper?retryWrites=true&w=majority';
     console.log(url)
    mongoose.connect(url, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;

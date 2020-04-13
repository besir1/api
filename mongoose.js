
const mongoose = require('mongoose');

const VeriSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 1,
        trim: true,
       
    },
    created_at:{
        type : Date,
        required: true,
        minlength: 1,
        trim: true,
    } 

} )

const DurumSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
   
    

} )

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pomp', { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

// To prevent deprectation warnings (from MongoDB native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


const Veri = mongoose.model('Veri',VeriSchema);
const Durum = mongoose.model('Durum',DurumSchema);
module.exports={Veri,Durum}
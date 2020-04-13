var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mosca = require('mosca');
var mongoose =require("./mongoose")
const {Veri,Durum}=require('./mongoose.js');
const {websocketdata}=require('./models/websocketmodel.js');




var settings = {
    port:1883
    }

var server = new mosca.Server(settings);
server.on('clientConnected',()=>{
})
server.on('ready', function(){
console.log("ready");
});

app.get('/mamibesir', function(req, res){
    res.send("hello batu")
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('asd', function(socket){
    console.log(socket);
   
    
     
  });
 
  
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.1.57')
client.on('connect', function () {
    client.subscribe('veri')
})
client.on('message', function (topic, message) {
context = message.toString();

let title = context;

       
let created_at =  new Date().toLocaleString();
    let newVeri = new Veri({
        title,
        created_at    
    });
    newVeri.save();

})

var mqtt2 = require('mqtt')
var client1  = mqtt2.connect('mqtt://192.168.1.57')
client1.on('connect', function () {
    client1.subscribe('durum_p')
})
client1.on('message', function (topic, message) {
context = message.toString();

let title = context;
var idd;
Durum.find({}).exec((err,veri)=>{
    var data =JSON.stringify(veri);
    var jsonData = JSON.parse(data)
    idd=jsonData[0]._id;
    

    
Durum.findOneAndUpdate({_id:idd},{title:title}).then((durumlar)=>{})
    
})  
})
setInterval(
    () =>{ 
        var idd;
        Durum.find({}).exec((err,veri)=>{
            var data =JSON.stringify(veri);
            var jsonData = JSON.parse(data)
            idd=jsonData[0]._id;
            


            Durum.findById({_id:idd}).then((veri)=>{
                websocketdata.Veri=veri.title;  
            })
            
        })


   
        Veri.find().sort({created_at:-1}).limit(1).then((post)=>{
            
          websocketdata.Durum=post[0].title; 
          io.emit('chat message',websocketdata); 
         
        })
        
        /*
        Veri.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
            console.log( post );
            websocketdata.Durum=post.title; 
                
         
          });*/
        
        
  
    },
    4000
  );

 
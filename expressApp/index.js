var express=require('express');
let app=express();
const mongoose=require('mongoose');
const session=require('express-session');
require('dotenv').config();
path = require('path')

let bodyParser=require('body-parser');
const mongoDB=process.env.URL;
const mongooseOptions={useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,keepAlive: true, 
    keepAliveInitialDelay: 300000  }
 let connectToDB=async()=>{
    try{
        await mongoose.connect(mongoDB, mongooseOptions);
    }catch(e){
        console.log('Could not connect to Database'+e);
    }
}
connectToDB();

const db=mongoose.connection;
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 db.on('open',()=>{
     console.log(`Connected to DB`);
 })
 db.on('reconnected',()=>{
     console.log(`Restablished Connection to DB`);
 })
 db.on('disconnected',()=>{
    console.log(`Connection to DB lost`);
 })
 db.on('reconnectFailed',()=>{
     console.log(`Failed to reconnect to DB`);
 })
let sess={
    secret:process.env.Secret,
    resave:true,
    saveUninitialized: true,
}
//const  routes=require("./routes");
const  routes=require("../routes");
app.use(session(sess));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, './views' ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);
app.use('/assets',express.static(path.join(__dirname, '../assets')));
app.use(function(err,req,res, next){
    res.status(422).send({ error: err.message});
})
app.listen(process.env.PORT||3000   ,function(){
    let port=(process.env.PORT || 3000);
    console.log(`now listening for requests on port ${port}`);
});



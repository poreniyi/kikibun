var express=require('express');
let app=express();
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser')
const session=require('express-session');

require('dotenv').config();
path = require('path')

let bodyParser=require('body-parser');
const mongoDB=process.env.URL;
mongoose.connect(mongoDB, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true }).then(
    res => console.log('Connected to Database'));
const db=mongoose.connection;
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));
let sessionSecret=process.env.Secret;
let sess={
    secret:process.env.Secret,
    resave:true,
    saveUninitialized: true,
}
const  routes=require("./routes");
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
var express=require('express');
let app=express();
const mongoose=require('mongoose');

let bodyParser=require('body-parser');
const mongoDB='mongodb+srv://admin:specialpass@cluster0-2tj27.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true }).then(res => console.log('Connected to Database'));
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const  routes=require("./routes")
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);
app.use('/assets',express.static('../assets'));
app.use(function(err,req,res, next){
    res.status(422).send({ error: err.message});
})

app.listen(process.env.port || 3000,function(){
    console.log("now listening for requests on port 3000")
});
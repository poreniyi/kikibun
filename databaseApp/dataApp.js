const mongoose=require('mongoose');
const mongoDB='mongodb+srv://admin:specialpass@cluster0-2tj27.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser:true,useUnifiedTopology:true }).then(res => console.log('Connected to Database'));
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let Schema=mongoose.Schema;
var BookSchema=new Schema(
    
)

let WordScehmaJLPT= new Schema({
    name:{type:String,required:false},///
    hiragana:{type:String,required:false},
    hiragana:{type:String,required:false},
    hiragana:{type:String,required:false},
    nLevel:{type:String, required:false, min:1, max:5},
    length:Number
    }
);
let WordScehmaGenki= new Schema({
        name:{type:String,required:false},///
        English:{type:String,required:false},
        Kanji:{type:String,required:false},
        Hiragana:{type:String,required:false},
        Chapter:{type:String, required:false, min:1, max:23},
        length:Number
        }
)

let N5=mongoose.model('N1',WordScehmaJLPT);
let test2={
    1:1,
    2:1,
    3:1,
}
let test=new N5({
    name:"Test",
    English:"Test field ENglish",
    Kanji:"Some kanji",
    Hiragana:"Some kana",
    nLevel:5,
    length:"20",
});
test.save(function (err){
    if (err) return handlError(err);
    else{
        console.log("Item saved");
    }
});

saveItem=(item)=>{
    item.name=new N1(item);
    item.save(function(err){
        if(err) return handlError(err);
    })
}
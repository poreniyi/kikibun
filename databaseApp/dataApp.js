const mongoose=require('mongoose');
const mongoDB='mongodb+srv://admin:specialpass@cluster0-2tj27.mongodb.net/test?retryWrites=true&w=majority';
const unqieValidator=require('mongoose-unique-validator');
mongoose.connect(mongoDB, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true }).then(res => console.log('Connected to Database'));
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const assert = require('assert')
let Schema=mongoose.Schema;

let WordScehmaJLPT= new Schema({
    name:{type:String,required:false, unique:true},
    English:{type:String,required:false},
    Kanji:{type:String,required:false},
    Hiragana:{type:String,required:false},
    nLevel:{type:String, required:false, min:1, max:5},
    length:Number
    }
);
WordScehmaJLPT.plugin(unqieValidator);
let WordScehmaGenki= new Schema({
        name:{type:String,required:false},///
        English:{type:String,required:false},
        Kanji:{type:String,required:false},
        Hiragana:{type:String,required:false},
        Chapter:{type:String, required:false, min:1, max:23},
        length:Number
        }
)

let N1=mongoose.model('N1',WordScehmaJLPT);
let N2=mongoose.model('N2',WordScehmaJLPT);

let test=new N1({
    name:"Test4",
    English:"Test field English",
    Kanji:"Some kanji",
    Hiragana:"Some kana",
    nLevel:5,
    length:"20",
});
// test.save(function (err){
//     if (err) return handlError(err);
//     else{
//         console.log("Item saved");
//     }
// });

saveItem=(item)=>{
        N1(item).save(function(err){
            if(err) console.log(err);
            else{
                console.log("Item saved");
            }
        })
};
saveItem(test);
const mongoose=require('mongoose');
const unqieValidator=require('mongoose-unique-validator');

const mongoDB='mongodb+srv://admin:specialpass@cluster0-2tj27.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true }).then(res => console.log('Connected to Database'));
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
let Schema=mongoose.Schema;

let WordScehmaJLPT= new Schema({
    name:{type:String,required:false},
    English:{type:String,required:false},
    Kanji:{type:String,required:false, unique:true},
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
let N3=mongoose.model('N1',WordScehmaJLPT);
let N4=mongoose.model('N2',WordScehmaJLPT);
let N5=mongoose.model('N2',WordScehmaJLPT);


let test={
    name:"Wa",
    English:"Test field English",
    Kanji:"犬",
    Hiragana:"いぬ",
    nLevel:5,
    length:"20",
};
// N5.create(test).then(function(word){
//     console.log(word);
// })
saveItem=(item)=>{
        N1(item).save(function(err){
            if(err) console.log(err);
            else{
                console.log("Item saved");
            }
        })
};

module.exports=N5;
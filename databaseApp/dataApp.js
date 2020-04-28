const mongoose=require('mongoose');
const unqieValidator=require('mongoose-unique-validator');


let Schema=mongoose.Schema;

let WordScehmaJLPT= new Schema({
    English:{type:String,required:false},
    Kanji:{type:String,required:false, unique:true},
    Hiragana:{type:String,required:false},
    nLevel:{type:String, required:false, min:1, max:5},
    length:Number
    }
);
WordScehmaJLPT.plugin(unqieValidator);
let WordScehmaGenki= new Schema({
        English:{type:String,required:false},
        Kanji:{type:String,required:false},
        Hiragana:{type:String,required:false},
        Chapter:{type:String, required:false, min:1, max:23},
        length:Number
        }
)
WordScehmaGenki.plugin(unqieValidator);

let Genki=mongoose.model("Genki",WordScehmaGenki);
let JLPT=mongoose.model('JLPT Word',WordScehmaJLPT);

let N5=mongoose.model('N2',WordScehmaJLPT);
module.exports  ={
    Genki:Genki,
    JLPT:JLPT,
}
WordScehmaGenki.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id =  returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

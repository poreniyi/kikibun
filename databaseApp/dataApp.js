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
        Chapter:{type:Number, required:false, min:1, max:23},
        length:Number,
        }
)
WordScehmaGenki.add({
  POS:{
    type:String,
    enum:['Particle','Noun','Verb','Adjective'],
    required:false,
  }
});
WordScehmaGenki.path('POS')

WordScehmaGenki.plugin(unqieValidator);

let Genki=mongoose.model("Genki",WordScehmaGenki);
let JLPT=mongoose.model('JLPT Word',WordScehmaJLPT);

let N5=mongoose.model('N2',WordScehmaJLPT);
module.exports  ={
    GenkiScehma:WordScehmaGenki,
    Genki:Genki,
    JLPT:JLPT,
}

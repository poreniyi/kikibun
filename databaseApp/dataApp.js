const mongoose=require('mongoose');
const unqieValidator=require('mongoose-unique-validator');


let Schema=mongoose.Schema;

let WordScehmaJLPT= new Schema({
    English:{type:String,required:false},
    Kanji:{type:String,required:false, unique:true},
    Hiragana:{type:String,required:false},
    nLevel:{type:String, required:false, min:1, max:5},
    length:Number,
    }
);
let pos=[
  'Noun',
  'Verb',
  'Particle',
  'I-adjective',
  'Na-adjective',
  'Filler',
  'Interjection',
  'Adverb',
  'Connection',
  'Auxillary Verb',
  'none',
]

WordScehmaJLPT.plugin(unqieValidator);
let WordSchemaGenki= new Schema({
        English:{type:String,required:false},
        Kanji:{type:String,required:false},
        Hiragana:{type:[String],required:false},
        Chapter:{type:Number, required:false, min:1, max:23},
        POS:{type:String, required:false,enum:pos},
        length:Number,
        }
)

let ParticleSchema= new Schema({
  Name:{type:String,required:false},
  Form:{type:[String],required:true},
  POSActedOn:{type:[String],required:true},
})

WordSchemaGenki.plugin(unqieValidator);

let Genki=mongoose.model("GenkiWord",WordSchemaGenki);
let JLPT=mongoose.model('JLPT Word',WordScehmaJLPT);
let testobj={
  Hiragana:pos,
  length:0,
}

let N5=mongoose.model('N2',WordScehmaJLPT);
module.exports  ={
    Genki:Genki,
    JLPT:JLPT,
}

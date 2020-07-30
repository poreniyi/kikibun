const mongoose=require('mongoose');
const unqieValidator=require('mongoose-unique-validator');


let Schema=mongoose.Schema;
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
let WordScehmaJLPT= new Schema({
    English:{type:String,required:false},
    Kanji:{type:[String],required:false,},
    Hiragana:{type:[String],required:false},
    nLevel:{type:Number, required:false, min:1, max:5},
    POS:{type:String, required:false,enum:pos},
    length:Number,
    }
);
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
  Before:{type:[String],required:false},
  POSActedOn:{type:[String],required:true,set:toLower},
  Chapter:{type:Number},
  NLvl:{type:Number}
})
ParticleSchema.virtual('FullForm').get(()=>{
  return this.Form.join('');
})

WordSchemaGenki.plugin(unqieValidator);


let ArticleSchema=new Schema({
  Articles:{type:[String],required:true},
  date:{type: Date},
})

let Genki=mongoose.model("GenkiWord",WordSchemaGenki);
let JLPT=mongoose.model('JLPT Word',WordScehmaJLPT);
let Particles=mongoose.model('Particle',ParticleSchema);
let Articles=mongoose.model('Article',ArticleSchema);
function toLower (posArray) {
  for(let i=0;i<posArray.length;i++){
    posArray[i]=posArray[i].toLowerCase();
  }
  return posArray;
}

let N5=mongoose.model('N2',WordScehmaJLPT);
module.exports  ={
    Genki:Genki,
    JLPT:JLPT,
    Particles:Particles,
    Articles:Articles,
}

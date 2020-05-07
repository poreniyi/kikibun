let Genki=require("./dataApp").Genki;
let GenkiScehma=require("./dataApp").GenkiScehma;

const mongoose=require('mongoose');

require('dotenv').config();
const mongoDB=process.env.URL;
mongoose.connect(mongoDB, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true }).then(res => console.log('Connected to Database'));
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

GenkiScehma.add({
    POS:{
      type:String,
      enum:['Particle','Noun','Verb','Adjedtive'],
      required:false,
    }
  });
  Genki.create({
      English:"Noun",
      POS:"Noun",
      Kanji:"Nouns",
      Hiragana:"PAPPY"
  });
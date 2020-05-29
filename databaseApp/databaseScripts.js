let Genki=require("./dataApp").Genki;
let Particles=require("./dataApp").Particles;


const mongoose=require('mongoose');

require('dotenv').config();
const mongoDB=process.env.URL;

connectToDB=async()=>{
  await mongoose.connect(mongoDB, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,  useFindAndModify: false  }).then(res => console.log('Connected to Database'));
  const db=await mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
closeDB=async()=>{
  db.close(false,()=>{
    console.log("connection clossed");
  });
}

   updateThis=async(dbId,field,value)=>{
     await Genki.updateOne(
       {_id : dbId},
      {[field] : value});
    // const doc=await Genki.findOneAndUpdate(
    //   {_id:dbId},
    //   {[field]:value},
    //   {new:true},
    // );
    //  //console.log(`The Db object Hiragana is now: ${doc.Hiragana}`);
    //  await console.log(`The Db object is: ${doc}`);
  }
let insertIntoDB=require('./addToDB').insertIntoDB;


//   Genki.create(testObj).then(function(data){
//     console.log(data);
// });

documentExists=async(text,chapter)=>{
  let data=await Genki.findOne({Chapter:{$lte:chapter},Kanji:text}) ? true:  await Genki.findOne({Chapter:{$lte:chapter},Hiragana:text, Kanji:"none"})?true :false;
  console.log(`${text} is a document in DB?: ${data}`);
  return data;
  //return data2||data;
}

particleExists=async(text,chapter)=>{
  let data=await Particles.findOne({Form:text,Chapter:{$lte:chapter}}) ? true: false
  console.log(`${text} is a partcle in DB?: ${data}`);
  return data;
}
  
//documentExists("私aa");

updateAll=async()=>{
  await Genki.updateMany({}, {Chapter:1});
} 

module.exports={
  updateThis:updateThis,
  documentExists:documentExists,
  particleExists,particleExists,
}
//updateAll();
let Genki=require("./dataApp").Genki;
let GenkiScehma=require("./dataApp").GenkiScehma;

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

//   GenkiScehma.path('Chapter',Number);
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

  
//connectToDB();
console.log(`The path of POS is:${GenkiScehma.path('POS')}`);
 //updateThis("5eb36b21661ebf416d33c9d1","Hiragana","Not Happy Feet");
//updateThis("5eb36b21661ebf416d33c9d1","POS","Noun");
updateAll=async()=>{
  await Genki.updateMany({}, {Chapter:1});
} 

module.exports={
  updateThis:updateThis,
}
//updateAll();
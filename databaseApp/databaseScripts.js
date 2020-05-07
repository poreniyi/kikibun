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
// GenkiScehma.add({
//     POS:{
//       type:String,
//       enum:['Particle','Noun','Verb','Adjedtive'],
//       required:false,
//     }
//   });
   updateThis=async(dbId,field,value)=>{
    //  await Genki.updateOne({_id:dbId},
    //   {food:value});
    const doc=await Genki.findOneAndUpdate(
      {_id:dbId},
      {[field]:value},
      {new:true},
    );
     console.log(`The Db object Hiragana is now: ${doc.Hiragana}`);
     console.log(`The Db object is: ${doc}`);
  }
connectToDB();
 updateThis("5eb36b21661ebf416d33c9d1","Hiragana","HappyFightAreNice");

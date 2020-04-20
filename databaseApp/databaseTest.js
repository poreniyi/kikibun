const mongoose=require('mongoose');
const mongoDB='mongodb+srv://admin:specialpass@cluster0-2tj27.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser:true,useUnifiedTopology:true }).then(res => console.log('Connected to Database'));
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

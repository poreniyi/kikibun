let fs=require('fs')
//let myReadStream=fs.createReadStream(__dirname+"/JLPT:5.txt",'utf8');
let myReadStream=fs.createReadStream(__dirname+"/lesson:1.txt",'utf8');

let myText='';
let array=[];
let streamFunction=(stream)=>{
    stream.on('data', function(chunk){
        console.log('new chunk received:');
        myText+=chunk;
        });
        stream.on('end',()=>{
            //console.log(myText);
            array=myText.split("\n");
            console.log(array);
            console.log(array.length);
        });       
};
streamFunction(myReadStream)
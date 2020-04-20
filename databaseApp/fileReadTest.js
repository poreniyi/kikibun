let fs=require('fs')
//let myReadStream=fs.createReadStream(__dirname+"/JLPT:5.txt",'utf8');
let myReadStream=fs.createReadStream(__dirname+"/lesson:1.txt",'utf8');

let myText='';
let array=[];
let databaseArray=[];

let streamFunction=(stream)=>{
    stream.on('data', function(chunk){
        console.log('new chunk received:');
        myText+=chunk;
        });
        stream.on('end',()=>{
            //console.log(myText);
            array=myText.split("\n");
            array.pop()
            console.log(array);
            console.log(array.length);
            function2();
        });       
};
let function2=()=>{
    for(const items of array){
        let line=items.split('+');
        let english='';
        let kanji='';
        let length='';
        if(line[2]===undefined){
            kanji='none';
            english=line[1];
            length=line[1].length;
        }else{
            english=line[2];
            kanji=line[1];
            length=kanji.length;
        }
        databaseArray.push(
        {name:line[1],
        English:english,
        Kanji:kanji,
        Hiragana:line[0],
        nLevel:5,
        length:length}
        );
    }
    console.log(databaseArray);
}

streamFunction(myReadStream);

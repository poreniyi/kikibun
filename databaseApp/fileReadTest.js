let fs=require('fs')
let Genki=require  ('./dataApp').Genki;
let tokenizer=require('../kuromojinParser/Tokenizer');
const path =require('path');


let databaseArray=[];


updateTxtfiles=()=>{
    for(let i=1 ;i<25;i++){
        let readingFileName=`../txtFiles/lesson:${String(i)}.txt`;
        fs.readFile(readingFileName,'utf8', (err,data)=>{
            // let lines=data.split("\n");
            // lines.pop();
            // let name=`../txtFiles/updatedGenki/lesson${String(i)}.txt`;
            // let writeStream=fs.createWriteStream(name,{flags: 'a'});
            // updateWords(lines,writeStream);
        })
       } 
}



let makeWords=async (array,iterator)=>{
    array.forEach(async element=>{
        let line=element.split('+');
        let english='';
        let kanji='';
        let length='';
        let pos='';
        for (let i=0;i<line.length; i++){
            line[i]=line[i].replace("〜", "");
        }
        let hiragana=line[0].split("\／");
        if(line[2]===undefined || line[2]=="none"){
            kanji='none';
            english=line[1];
            length=line[1].length;
            pos = await tokenizer.tokenizeOne(hiragana[0]);
        }else{
            english=line[2];
            kanji=line[1];
            length=kanji.length;
            if(line[1]==undefined){
            }
            pos=await tokenizer.tokenizeOne(kanji) 
        }
        if (pos==undefined){
            pos="none";
        }
        let currentWord={
        English:english,
        Kanji:kanji,
        Hiragana:hiragana,
        length:length,
        Chapter:Number(iterator),
        POS:pos,
        }
    
        if (currentWord.POS=="none") console.log(currentWord);
       // databaseArray.push(currentWord);
       // console.log(currentWord);
        Genki.create(currentWord).then(function(data){
            console.log(data);
        });
    })

}

insertIntoDB= async()=>{
    for(let i=1;i<24;i++){
        let currentFile=`../txtFiles/lesson:${String(i)}.txt`;
        fs.readFile(currentFile,'utf8', (err,data)=>{
            let lines=data.split('\n');
            lines.pop();
            makeWords(lines,i);
        })
    }
    // let currentFile=`../txtFiles/lesson:5.txt`;
    // fs.readFile(currentFile,'utf8', (err,data)=>{
    //     let lines=data.split('\n');
    //     lines.pop();
    //     makeWords(lines,5);
    // })
}

let updateWords=async (array,stream)=>{
    array.forEach(async element=>{
        let line=element.split('+');
        let english='';
        let kanji='';
        let length='';
        for (let i=0;i<line.length; i++){
            line[i]=line[i].replace("〜", "");
            line[i]=line[i].replace("（な）", "");
            line[i].trim();
        }
        let hiragana=line[0].split("\／");
        if(line[2]===undefined || line[2]=="none"){
            kanji='none';
            english=line[1];
            length=line[1].length;
        }else{
            english=line[2];
            kanji=line[1];
            length=kanji.length;
        }
        stream.write(`${hiragana}+${kanji}+${english}\n`);
    })
}
//updateTxtfiles();
//insertIntoDB();
module.exports={
    insertIntoDB:insertIntoDB ,
}
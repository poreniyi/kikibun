const fs=require('fs');
let tokenizer=require('../kuromojinParser/Tokenizer');
const path =require('path');
const JLPT=require('./dataApp').JLPT;

let insertJLPTWords=async ()=>{
    for(let i=5;i<6;i++){
        let name=`JLPT:${i}.txt`;
        let fileName=path.join(__dirname,"..",'txtFiles','JlptWords',name);
        fs.readFile(fileName,'utf8',(err,data)=>{
            let array=data.split('\n');
            array.pop();
          // console.log(array);
            makeJLPTDocs(array,i);
        });
    }
}
let noPosArray=[];

let makeJLPTDocs=(array,iterator)=>{
    array.forEach(async element => {
        let line=element.split('+');
        let hiragana=line[0].split('/');
        let kanji=line[1].split('/');
        let english=line[2];
        let pos;
      
        if(kanji==="None"){
            pos=await tokenizer.tokenizeOne(hiragana[0]); 
        }else{
            pos=await tokenizer.tokenizeOne(kanji[0]); 
        }
        if (pos==undefined){
            pos='none';
        }
        let currentWord={
            English:english,
            Kanji:kanji,
            Hiragana:hiragana,
            nLevel:iterator,
            POS:pos
        }
        // JLPT.create(currentWord).then(function(data){
        //     console.log(data);
        // })
        if(currentWord.POS=='none'){
            console.log(currentWord);
            noPosArray.push(currentWord);
            console.log(`# of no POS words is ${noPosArray.length}`);
        }
    });

}

myfnc=async()=>{
    let string='五';
    let test=await tokenizer.tokenizeOne(string);
    console.log(`The result of the test on ${string} is ${test}`);
}
//myfnc();
module.exports={
    insertJLPTWords:insertJLPTWords,
}
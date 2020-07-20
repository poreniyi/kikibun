const fs=require('fs');
let tokenizer=require('../kuromojinParser/Tokenizer');
const path =require('path');
const JLPT=require('./dataApp').JLPT;
for(let i=0;i<1;i++){
    let name=`JLPT:5.txt`;
    let fileName=path.join(__dirname,"..",'txtFiles','JlptWords',name);
    fs.readFile(fileName,'utf8',(err,data)=>{
        let array=data.split('\n');
        array.pop();
      // console.log(array);
        makeWords(array,i);
    });
}
let makeWords=(array,iterator)=>{
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
        let currentWord={
            English:english,
            Kanji:kanji,
            Hiragana:hiragana,
            nLevel:iterator+1,
            POS:pos
        }
        if(currentWord.POS==undefined){
            console.log(currentWord);
            let test2=await tokenizer.tokenizeOne(currentWord.Kanji[0]);
            console.log(test2);
        }
      //  console.log(currentWord);
    });
    myfnc=async()=>{
        let string='五';
        let test=await tokenizer.tokenizeOne(string);
        console.log(`The result of the test on ${string} is ${test}`);
    }
    myfnc();

}

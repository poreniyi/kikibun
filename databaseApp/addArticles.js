const Articles=require('./dataApp').Articles;
let fs=require('fs');
let path=require('path');

 readArticles=()=>{
    for(let i=1;i<6;i++){
        let name=`Article${i}.txt`;
        let fileName=path.join(__dirname,'..','txtFiles','NHKArticles',name);
        fs.readFile(fileName,'utf8',(err,data)=>{
            let articleData=JSON.parse(data);
            addArticlesToDB(articleData);
            //console.log(articleData.title);
        })
    }
}
readArticles();
let addArticlesToDB=(data)=>{
    let obj={
        title:data.title,
        content:data.text,
        date:data.date,
    }
    // console.log(obj);
    Articles.create(obj).then((mongooseData)=>{
        console.log(mongooseData);
    })
}
module.exports={
    addNHKtoDB:readArticles,
}
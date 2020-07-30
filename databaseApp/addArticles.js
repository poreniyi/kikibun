const Articles=require('./dataApp').Articles;
let fs=require('fs');
let path=require('path');

 addArticles=async()=>{
    let arrayArticles=[];
    let date;
    let obj={
        Articles:arrayArticles,
    }
    for(let i=1;i<6;i++){
        let name=`Article${i}.txt`;
        let fileName=path.join(__dirname,'..','txtFiles','NHKArticles',name);
        let data=await fs.promises.readFile(fileName,'utf8');
        let parsedData=JSON.parse(data);
        date=parsedData.date;
        delete parsedData.date;
        data=JSON.stringify(parsedData);
        arrayArticles.push(data);
    }
    obj.date=date;
     Articles.create(obj).then((mongooseData)=>{
                console.log(mongooseData);
            })
}
// addArticles();

module.exports={
    addNHKtoDB:addArticles,
}
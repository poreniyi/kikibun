const rp = require('request-promise');
const link = 'https://www3.nhk.or.jp/news/easy/k10012430641000/k10012430641000.html';
const articleLinks='https://www3.nhk.or.jp/news/easy/';
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const fs= require('fs');
const path = require('path');
const { dirname } = require('path');
const Articles= require('../databaseApp/dataApp').Articles

getTextOfArticle= (url,stream) =>{
  rp(url)
  .then(function(html){
    //success!
    Cheers=$.load(html);
    Cheers('rt').remove();
    let articleText =Cheers('#js-article-body').text().trim();
    let title=Cheers('.article-main__title').text().trim();
    let dateWritten=Cheers('.article-main__date').text().trim();
    const dateRegex=/\d+/g;
    const datesFound=dateWritten.match(dateRegex);
    let today=new Date();
    console.log(datesFound);
    let articleDate=new Date(today.getFullYear(),datesFound[0]-1,datesFound[1]);
    console.log(articleDate);
    let fullText=articleDate+'。'+title+"。"+articleText;
    let obj={
      date:articleDate,
      title:title,
      text:articleText
    }
    let chunk=JSON.stringify(obj);
    stream.write(chunk);
    return fullText;
  })
  .catch(function(err){
    //handle error
    console.log(err)
  });
}

getArticleLinks=  (url) =>{
  return new Promise(async (resolve, reject) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        let urls = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll('figure > a');
            items.forEach((item) => {
              let begin=window.location;
              let data= begin+item.getAttribute('href').slice(2);
                results.push({
                   url: data,
                });
            });
            return results;
        })
        browser.close();
        console.log(urls);
        return resolve(urls);
    } catch (e) {
        return reject(e);
    }
})
}


readArticles= async() =>{
let counter=1;
let articles=[];
for(let i=1;i<6;i++){
  let name="Article"+i+'.txt';
    const data= await  fs.promises.readFile(path.join(__dirname,"..","txtFiles","NHKArticles",name),'utf8');
    const JSONdata=JSON.parse(data);
    articles.push(JSONdata);
  }
  return articles;
}
writeArticlesToFile = async()=>{
  let counter=1;
   let articleLinksList= await getArticleLinks(articleLinks);
   let articleObject=[];
   for(let i=0; i<articleLinksList.length;i++){
   let name= `Article${i+1}.txt`;
   let element=articleLinksList[i].url;
   console.log(element);
    //let writeData=JSON.stringify(JSONdata);
    let writeStream=fs.createWriteStream(path.join(__dirname,"..","txtFiles","NHKArticles",name));
   console.log(`The url is ${element} its type is:${typeof element}`);
    let text=getTextOfArticle(element,writeStream);
    console.log(`The ${name} has been written to`);
   }
}

writeArticlesToDB=async()=>{
  let pathToDir=path.join(__dirname,"..","txtFiles","NHKArticles");
  let files=await fs.promises.readdir(pathToDir);
  let dates=[];
  let allArticles=[];
  for(let i=0;i<files.length;i++){
    let name=path.join(pathToDir,`Article${i+1}.txt`);
    let article=await fs.promises.readFile(name,'utf8');
    let parsedData=JSON.parse(article);
    if(!dates.includes(parsedData.date)){
      dates.push(parsedData.date);
    }
    allArticles.push(parsedData);
  }
  console.log(`The length of dates is ${dates.length}`);
  let counter=0;
  for(let j=0;j<dates.length;j++){
     let sameDateArticles=allArticles.filter((element)=>{
      return element.date==dates[j];
    })
    // console.log(sameDateArticles);
    let dbData=[];
    sameDateArticles.forEach(element=>{
      delete element.date;
      dbData.push(JSON.stringify(element));
    })
    let obj={
      date:dates[j],
      Articles:dbData,
    }
    //console.log(dbData);
    Articles.create(obj).then((mongooseData)=>{
      console.log(mongooseData);
      counter++
  })
  }
  console.log(counter);
}
 //writeArticlesToDB();
// writeArticlesToFile();
   


module.exports={
  writeArticlesToFile:writeArticlesToFile,
  writeArticlesToDB:writeArticlesToDB,
  readArticles:readArticles,
}

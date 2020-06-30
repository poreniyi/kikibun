const rp = require('request-promise');
const link = 'https://www3.nhk.or.jp/news/easy/k10012430641000/k10012430641000.html';
const articleLinks='https://www3.nhk.or.jp/news/easy/';
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const fs= require('fs');
const path = require('path');

myFunc=(string)=>{
  let today=new Date();
  let date= `${today.getMonth()}/${today.getDay()}/${today.getFullYear()}`;
  let time=`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  console.log(string);
  console.log(date)
  console.log(time);
}

getTextOfArticle= (url,stream) =>{
  rp(url)
  .then(function(html){
    //success!
    Cheers=$.load(html);
    Cheers('rt').remove();
    let articleText =Cheers('#js-article-body').text().trim();
    let title=Cheers('.article-main__title').text().trim();
    let today=new Date();
   // let date= `${today.getMonth()}/${today.getDay()}/${today.getFullYear()}`;
    let date=new Date(today.getFullYear(),today.getMonth(),today.getDate());;
    let fullText=date+'。'+title+"。"+articleText;
    let obj={
      date:date,
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
   articleLinksList.forEach(element =>{
    let name="Article"+i+'.txt';
    let writeData=JSON.stringify(JSONdata);
    let writeStream=fs.createWriteStream(path.join(__dirname,"..","txtFiles","NHKArticles",name));
   console.log(`The url is ${element.url} its type is:${typeof element.url}`);
    let text=getTextOfArticle(element.url,writeStream);
    console.log(`The ${name} has been written to`);
    counter++;
   })
}
let testLink='https://www3.nhk.or.jp/news/easy/k10012483421000/k10012483421000.html';
//getTextOfArticle(testLink);
//writeArticlesToFile();
//readArticles();

makeDatesProper=async()=>{
  for(let i=1;i<6;i++){
    let name="Article"+i+'.txt';
    let writePath="Test2"+i+'.txt';
      const data= await  fs.promises.readFile(path.join(__dirname,"..","txtFiles","NHKArticles",name),'utf8');
      const JSONdata=JSON.parse(data);
      let today=new Date();
    let date=new Date(today.getFullYear(),today.getMonth(),26);
      JSONdata.date=date;
      let writeData=JSON.stringify(JSONdata);
      let writeStream=fs.createWriteStream(path.join(__dirname,"..","txtFiles","NHKArticles",name));
      writeStream.write(writeData);
    }
}

//makeDatesProper();
module.exports={
  writeArticlesToFile:writeArticlesToFile,
  readArticles:readArticles,
}

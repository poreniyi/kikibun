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
    let date= `${today.getMonth()}/${today.getDay()}/${today.getFullYear()}`;
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


readArticles= () =>{
let counter=0;
let articles;

while(counter<6){
    counter++;
  }
  let name='Article1.txt';
  let readStream=fs.createReadStream(path.join(__dirname,"..","txtFiles","NHKArticles",name),'utf8');
  // fs.readFile(path.join(__dirname,"..","txtFiles","NHKArticles",name),'utf8',function(data){
  //   data=JSON.parse(data);
  //   console.log(`File read data is ${data}`);
  //   return data;
  // })  
  readStream.on('data',chunk=>{
    console.log(chunk);
    console.log(typeof chunk);
    let article=JSON.parse(chunk);
    articles+=article;
  })
  readStream.on('end',()=>{
    console.log(`File has been read`);
    // console.log(`Data is ${articles}`)
    return articles;
  })
}
writeArticlesToFile = async()=>{
  let counter=1;
   let articleLinksList= await getArticleLinks(articleLinks);
   articleLinksList.forEach(element =>{
    let name='Article'+String(counter)+'.txt';
    let writeStream=fs.createWriteStream(name);
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



module.exports={
  writeArticlesToFile:writeArticlesToFile,
  readArticles:readArticles,
}

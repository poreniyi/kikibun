const rp = require('request-promise');
const link = 'https://www3.nhk.or.jp/news/easy/k10012430641000/k10012430641000.html';
const articleLinks='https://www3.nhk.or.jp/news/easy/';
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const fs= require('fs');

getTextOfArticle= (url,stream) =>{
  rp(url)
  .then(function(html){
    //success!
    Cheers=$.load(html);
    Cheers('rt').remove();
    let articleText =Cheers('#js-article-body').text().trim();
    let title=Cheers('.article-main__title').text().trim();
    $('ruby').remove();
    let today=new Date();
    let date= `${today.getMonth()}/${today.getDay()}/${today.getFullYear()}`;
    let fullText=date+'。'+title+"。"+articleText;
    stream.write(fullText);
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
myFunc=(string)=>{
  let today=new Date();
  let date= `${today.getMonth()}/${today.getDay()}/${today.getFullYear()}`;
  let time=`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  console.log(string);
  console.log(date)
  console.log(time);
}
//setInterval(myFunc,5000,"Mario");
let myWriteStream=fs.createWriteStream(__dirname + '/Happy.txt');//, {flags: 'a'}

readArticles= () =>{
  let counter=1;
  while(counter<6){
    let name="Article"+counter+".txt";
    let myReadStream=fs.createReadStream(name, 'utf8');
    myReadStream.on('data',(chunk)=>{
      console.log(`Now reading file ${name}`);
      let sentences=chunk.split('。');
      console.log(`The title of the article is ${sentences[1]}`);
      console.log(`The date of the article is ${sentences[0]}`);
      console.log(`There are ${sentences.length} sentences`);
    })
    counter++;
  }
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
}

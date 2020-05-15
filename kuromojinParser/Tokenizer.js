
let kuromojin=require('kuromojin');


// kuromojin.getTokenizer().then(tokenizer => {
//     // kuromoji.js's `tokenizer` instance
// });




let pos={
   名詞:"Noun",
   動詞:"Verb",
   助詞:"Particle",
   形容詞:"I-adjedctive",
   形容動詞語幹:"Na-Adjective",
}

kuromojin.tokenize(`帰りました`).then(results=>{
   //console.log(results);
})
tokenize= async ()=>{
    let tokens=await kuromojin.tokenize(`帰りました`);
    console.log(tokens);
    let tokenArray=[];
    tokens.forEach(element=>{
        let obj= new Object();
        if(element.pos=="名詞"){
            obj.pos = (element.pos_detail_1=="形容動詞語幹")  ? "形容動詞語幹" : "名詞"
        }else{
            obj.pos=element.pos;
        }
        tokenArray.push(obj);
    });
    console.log(tokenArray);
}
tokenize();

module.exports={
    tokenizer:tokenize,
}

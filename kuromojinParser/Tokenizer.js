
let kuromojin=require('kuromojin');
let word=require('./Words');
let Word=word.Word;

// kuromojin.getTokenizer().then(tokenizer => {
//     // kuromoji.js's `tokenizer` instance
// });




let objPos={
   名詞:"Noun",
   動詞:"Verb",
   助詞:"Particle",
   形容詞:"I-adjective",
   形容動詞語幹:"Na-adjective",
   フィラー: "Filler",
   感動詞: "Interjection",
   副詞: "Adverb",
   数接続: "Connection",
   助動詞:"Auxillary Verb",
}
let basePos={
    名詞:"Noun",
    動詞:"Verb",
    助詞:"Particle",
    形容詞:"I-adjective",
    形容動詞語幹:"Na-adjective",
}

tokenizeOne= async(text)=>{

    try{
        let tokens=await kuromojin.tokenize(text);
        if(tokens[0].pos=="接頭詞"){
            if(!tokens[1]){
                return objPos[tokens[0].pos_detail_1];
         }
            return objPos[tokens[1].pos];
        }
        return objPos[tokens[0].pos];
    }catch(err){
        console.log(err);
    }
}
tokenize=async(text)=>{
    let tokens=await kuromojin.tokenize(text);

    return tokens;
}

tokenize2= async (text)=>{
  //console.log(Object.values(objPos));
    let tokens=await kuromojin.tokenize(text);
    //console.log(tokens);
    console.log(`The legnth of the tokens is:${tokens.length}`);
    let tokenArray=[];
    let maxLength=tokens.length-1;
    let previousAdded2;
    for(let i=0;i<tokens.length;i++){
        let element=tokens[i];
        //console.log(element);
        let word= new Word(element.basic_form,element.surface_form);
        let pos;
        if(element.pos=="名詞"){
            pos = (element.pos_detail_1=="形容動詞語幹")  ? "形容動詞語幹" : "名詞"
            if(previousAdded2){
                previousAdded2.setTextGivenForm();
            } 
        }else if(!basePos.hasOwnProperty(element.pos)){
            previousAdded2.addConjugatedPart(element.surface_form);
            if(i==tokens.length-1){
                previousAdded2.setTextGivenForm();
            }
            continue ;
        }else{
            pos=element.pos;
            if(previousAdded2){
                previousAdded2.setTextGivenForm();
            } 
        }
        word.setEnPos(objPos[pos]);
        word.setJpPos(pos);      
        previousAdded2=word;
        tokenArray.push(word)
        let wordArray=[];
        wordArray.push(word);      
    }
   
    console.log(`Length of token array is ${tokenArray.length} and the array is: ${tokenArray}`);
    // return {
    //    // tokens:tokens,
    //     tokenArray:tokenArray,
    // };
    return tokenArray;
}
let exclusivePos={
    名詞:"Noun",
    動詞:"Verb",
    形容詞:"I-adjective",
    形容動詞語幹:"Na-adjective", 
}
grammarTokenizer=async (text)=>{
  //console.log(Object.values(objPos));
  let tokens=await kuromojin.tokenize(text);
  //console.log(tokens);
  console.log(`The legnth of the tokens is:${tokens.length}`);
  let tokenArray=[];
  let prePart;
  let perviousWord;
  for(let i=0;i<tokens.length;i++){
      let element=tokens[i];
      let word= new Word(element.basic_form,element.surface_form);
      let pos;

      if(prePart){
          word.addBefore(prePart);
          prePart='';
      }
      if(element.pos_detail_1=='格助詞'|| element.pos=='副詞'){
        prePart=element.surface_form;
        continue;
      }
      if(element.pos=="名詞"){
          pos = (element.pos_detail_1=="形容動詞語幹")  ? "形容動詞語幹" : "名詞"
          if(perviousWord){
              perviousWord.setTextGivenForm();
          } 
      }else if(!exclusivePos.hasOwnProperty(element.pos)|| element.pos_detail_1=="非自立"){
          perviousWord.addConjugatedPart(element.surface_form);
          if(i==tokens.length-1){
              perviousWord.setTextGivenForm();
          }
          continue ;
      }else{
          pos=element.pos;
          if(perviousWord){
              perviousWord.setTextGivenForm();
          } 
      }
      word.setEnPos(objPos[pos]);
      word.setJpPos(pos);      
      perviousWord=word;
      tokenArray.push(word)
      let wordArray=[];
      wordArray.push(word);      
  }
 
  console.log(`Length of token array is ${tokenArray.length} and the array is: ${tokenArray}`);
  return tokenArray;
}

//tokenize(`帰りました食べた食べる`);

module.exports={
    tokenize:tokenize,
    tokenizeOne:tokenizeOne,
    tokenize2:tokenize2,
    grammarTokenizer: grammarTokenizer,
}

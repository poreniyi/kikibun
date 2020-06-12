let kuromojin=require('kuromojin');
let word=require('./Words');
let Word=word.Word;
let Conjugation=word.Conjugation;

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
// grammarTokenizer=async (text)=>{
//   let tokens=await kuromojin.tokenize(text);
//   let tokenArray=[];
//   let prePart;
//   let previousWord;
//   for(let i=0;i<tokens.length;i++){
//       let element=tokens[i];
//       let word= new Word(element.basic_form,element.surface_form);
//       let pos;
  
//       if(element.conjugated_type!="*" && element.pos_detail_1!='自立'){
//           console.log(`PRevious word is:${previousWord.surfaceForm} the element is${element.surface_form}`)
//          previousWord.addToPreviousConjugation(element.surface_form);
//            continue
//         }
//       if(element.pos_detail_1=='非自立' && element.conjugated_type!="*"){
//         previousWord.addConjugatedPart(element.surface_form);
//         console.log(element.surface_form);
//         continue;
//       }

//       if(prePart){
//           word.addBefore(prePart);
//           prePart='';
//       }
//       if((element.pos_detail_1=='格助詞'&& element.pos_detail_2=='引用')|| element.pos=='副詞'){
//         prePart=element.surface_form;
//         continue;
//       }
//       if(element.pos=="名詞"){
//           pos = (element.pos_detail_1=="形容動詞語幹")  ? "形容動詞語幹" : "名詞"
//           if(previousWord){
//               previousWord.setTextGivenForm();
//           } 
//       }else if(!exclusivePos.hasOwnProperty(element.pos)|| element.pos_detail_1=="非自立"){
//           if(element.conjugated_type!="*"){
//             previousWord.addToPreviousConjugation(element.surface_form);
//           }else{
//             previousWord.addConjugatedPart(element.surface_form);
//           }
//           if(i==tokens.length-1){
//               previousWord.setTextGivenForm();
//           }
//           continue ;
//       }if(element.pos_detail_1=='非自立'){
//         previousWord.addConjugatedPart(element.surface_form);
//         continue;
//       }else{
//           pos=element.pos;
//           if(previousWord){
//               previousWord.setTextGivenForm();
//           } 
//       }
//       word.setEnPos(objPos[pos]);
//       word.setJpPos(pos);      
//       previousWord=word;
//       tokenArray.push(word)
//       let wordArray=[];
//       wordArray.push(word);      
//   }
 
//   return tokenArray;
// }

grammarTokenizer=async (text)=>{
    let tokens=await kuromojin.tokenize(text);
    let tokenArray=[];
    console.log(`${text}`)
    let prePart;
    let previousWord;
    let prePos;
    console.log(`Length of tokens is${tokens.length}`)
    for(let i=0;i<tokens.length;i++){
        let token=tokens[i];
        let word= new Word(token.basic_form,token.surface_form);
        let conjugation= new Conjugation(token.surface_form);
       

    //adding to previous
        // this checks for ん and　And adds it to previous conjugation；
        if((token.word_id===22540|| token.word_id==23430) &&previousWord.getLastConjugation()){
            //console.log(`${token.surface_form} and the previous word is ${previousWord}`);
            console.log(`This is the alst conjugation ${previousWord.getLastConjugation()}`);
            previousWord.getLastConjugation().addConjugation(token.surface_form);
            continue;
        }   
        //for ない
        if(token.word_id==23470){
            previousWord.addToPreviousConjugation(token.surface_form);
            continue;
        }
    
    //new conjugation

                    // for いる　Andある
     if((token.word_id===3491630　|| token.word_id===3324170|| token.word_id==1799070)&& prePos!=="Noun"){
        previousWord.addConjugatedPart(conjugation);
        console.log(`The previous wrod is${previousWord.base} pos is ${prePos} conjugatedpart is ${token.surface_form}`);
        continue;
    }

    // this if statement adds conjugation to the previous word　いfit's a particle or not indepedent
    if(token.pos=='助動詞'||token.pos_detail_1=='非自立' || token.pos==('助詞')){
        // console.log(`previousWord is ${previousWord} and the conjugation is ${token.surface_form}`)
         previousWord.addConjugatedPart(conjugation);
         continue;
     }

        // makes new word

        if(exclusivePos.hasOwnProperty(token.pos)){ //Noun na dj iadj and verb
            tokenArray.push(word); 
            word.setEnPos(exclusivePos[token.pos])
            word.setJpPos(token.pos)
            previousWord=word;
            prePos= previousWord.getEnPos();
            console.log(prePos);
        }     
  }
   //console.log(previousWord.getEnPos());

  return tokenArray;
}
//let string=('まだ来ていませんよく話したと思う私の犬食べてください私も質問をしてもいいですかあるんです犬がいた食べに行く食べていました');


module.exports={
    tokenize:tokenize,
    tokenizeOne:tokenizeOne,
    tokenize2:tokenize2,
    grammarTokenizer: grammarTokenizer,
}
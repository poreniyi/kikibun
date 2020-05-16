
let kuromojin=require('kuromojin');


// kuromojin.getTokenizer().then(tokenizer => {
//     // kuromoji.js's `tokenizer` instance
// });




let objPos={
   名詞:"Noun",
   動詞:"Verb",
   助詞:"Particle",
   形容詞:"I-adjective",
   形容動詞語幹:"Na-adjective",
}

kuromojin.tokenize(`帰りました`).then(results=>{
   //console.log(results);
})
tokenize= async (text)=>{
    let tokens=await kuromojin.tokenize(text);
    //console.log(tokens);
    console.log(`The legnth of the tokens is:${tokens.length}`);
    let tokenArray=[];
    let previousAdded;
    for(let i=0;i<tokens.length;i++){
        let element=tokens[i];
        let obj= new Object();
        let surface=element.surface_form;
        let englishPos,pos;
        let conjugations=[];
        obj.text=element.basic_form;
        if(element.pos=="名詞"){
            pos = (element.pos_detail_1=="形容動詞語幹")  ? "形容動詞語幹" : "名詞"
        }else if(!objPos.hasOwnProperty(element.pos)){
            previousAdded.conjugations.push(element.pos);
            previousAdded.text+=(`+${element.surface_form}`)
            continue ;
        }else{
            pos=element.pos;
        }
        obj.POS=objPos[pos],//Eng
        obj.pos=pos,//jp
        obj.text=surface;
        obj.conjugations=conjugations;
        previousAdded=obj;
        tokenArray.push(obj);
    }
   
    console.log(`Length of array is ${tokenArray.length} and the array is: ${tokenArray}`);
    // return {
    //    // tokens:tokens,
    //     tokenArray:tokenArray,
    // };
    return tokenArray;
}
//tokenize(`帰りました食べた食べる`);

module.exports={
    tokenize:tokenize,
}

import { Word } from './Word.js';

Verb.prototype=Object.create(Word.prototype);

export function Verb(hiragana,kanji){
    Word.call(this,hiragana,kanji)
    this.hiragana=hiragana;
    this.kanji=kanji;
    this.type="verb";
    this.stem=this.kanji.slice(0,this.kanji.length-1);
    this.finalSyllabe=this.hiragana.slice(hiragana.length-1,hiragana.length);
};

Verb.prototype.syllable={
    'う':['わ','い','','',''],
    'く':['か','き','','',''],
    'ぐ':['が','ぎ','','',''],
    'す':['さ','し','','',''],
    'ず':['ざ','じ','','',''],
    'つ':['た','ち','','',''],
    'づ':['だ','ぢ','','',''],
    'ふ':['は','ひ','','',''],
    'ぶ':['ば','び','','',''],
    'ぷ':['ぱ','ぴ','','',''],
    'む':['ま','み','','',''],
    'る':['ら','り','','',''],
};  
Verb.prototype.showFinalSyllable=function(){
    console.log(this.finalSyllabe);
}
Verb.prototype.showStem=function(){
    console.log(this.stem);
};
Verb.prototype.setChanger=function(place){
   if(this.type=='uverb'){
    return this.syllable[this.finalSyllabe][place];
   }
   return '';
}
Verb.prototype.negativeForm=function(){
    console.log(this.stem+this.setChanger(0)+this.negative);
    //return this.stem+this.setChanger(0)+this.negativeForm;
}
Verb.prototype.PoliteForm=function(){
    console.log(this.stem+this.setChanger(1)+this.politePresent);
     return this.finalSyllabe+this.setChanger()+'ます';
}
Verb.prototype.PoliteNegativeForm=function(){
    console.log(this.stem+this.setChanger(1)+this.politeNegative);
    return this.stem+this.setChanger()+'ません';
}
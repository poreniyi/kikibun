import {Conjugation} from './Conjugation.js';
Word.prototype=Object.create(Conjugation.prototype);

export function Word(hiragana,kanji){
    this.kanji=kanji;
    this.hiragana=hiragana;
    this.type;
    this.nLevel;
    this.length=kanji.length;
};
Word.prototype.sayKanji=function(){    
    console.log(this.kanji);   
};
Word.prototype.getType=function(){   
    return this.type;
};
Word.prototype.setNlevel=function(number){
    this.nLevel=number;
}
Word.prototype.getLength=function(){
    return this.length;
}

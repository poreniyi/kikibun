
 function Word(kanji,surfaceForm){
    this.base=kanji;
    this.surfaceForm=surfaceForm;
    this.givenForm;
    this.before=[];
    this.conjugatedParts=[];
    this.EnPOS;
    this.JpPOS;
    this.status;
    this.length=kanji.length;
    this.statusKnown=false;
    this.Chapter;
    this.grammarKnown=false;
    this.description;
};
Word.prototype.sayKanji=function(){    
    console.log(this.base);   
};
Word.prototype.setEnPos=function(string){   
    this.EnPOS=string;
};
Word.prototype.getEnPos=function(){   
    return this.EnPOS;
};
Word.prototype.setJpPos=function(string){   
     this.JpPOS=string;
};
Word.prototype.getJpPos=function(){   
    return this.JpPOS;
};
Word.prototype.addConjugatedPart=function(string){
    this.conjugatedParts.push(string);
}
Word.prototype.addToPreviousConjugation=function(string){
    if(this.conjugatedParts.length>0){
        this.conjugatedParts[this.conjugatedParts.length-1]+=string;
    }else  this.conjugatedParts.push(string)
}
Word.prototype.getLastConjugation=function(){
    return this.conjugatedParts[this.conjugatedParts.length -1];
}
Word.prototype.addBefore=function(string){
    this.before.push(string);
}
Word.prototype.setNlevel=function(number){
    this.nLevel=number;
}
Word.prototype.getLength=function(){
    return this.length;
}
Word.prototype.getStatus= function(){
    return this.status;
}
Word.prototype.setTextGivenForm=function(){
    this.givenform=this.surfaceForm+this.conjugatedParts.join('');
}
Word.prototype.getGivenForm=function(){
    return this.givenform;
}
Word.prototype.setStatus=function(text){
    this.StatusKnown=!this.StatusKnown;
    console.log(this.StatusKnown);
}
Word.prototype.MakeGrammarUnknown=function(){
    this.GrammarKnown=false;
}
Word.prototype.addDescription=function(text){
    this.description=text;
}
function conjugation(text){
    this.status='unknown';
    this.text=text;
    this.POS;
    this.description;
    this.Chapter;
}
conjugation.prototype.addConjugation=function(string){
    this.text+=string;
}
conjugation.prototype.makeKnown=function(){
    this.status='known';
}
conjugation.prototype.updateDescription=function(string){
    this.description=string;
}
conjugation.prototype.updateChapter=function(string){
    this.Chapter=string;
}
module.exports={
    Word:Word,
    Conjugation:conjugation,
}

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
    this.StatusKnown=false;
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
    this.StatusKnown=true;
    console.log(this.StatusKnown);

}
module.exports={
    Word:Word,
}
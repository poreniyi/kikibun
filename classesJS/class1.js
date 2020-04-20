export function Word(name){
    this.name=name;
}
 Word.prototype.sayName=function(){    
    console.log(this.name);   
};

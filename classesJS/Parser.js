export function Parser(name, expression){
this.name=name;
this.expression= RegExp(expression);
}
Parser.prototype.parseThis=function(text){
    console.log(expression.test(text));
}
Parser.prototype.getMatch=function(test){
    return(expression.test(text));
}

Genki1Parser=new Parser('Genki1', s);

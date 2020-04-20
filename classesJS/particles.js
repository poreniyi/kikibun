export function Particles(definition,structure){
    this.definition=definition;
    this.structure=structure;
    this.type='particles';
    this.id=6;
    this.getText=function(){
        return this.structure;
    }
}
Particles.prototype.getType=function(){   
    return this.type;
};
Particles.prototype.getId=function(){   
    return this.id;
};
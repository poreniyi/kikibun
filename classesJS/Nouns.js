import { Word } from './Word.js';
export function Noun(hiragana,kanji){
    Word.call(this,hiragana,kanji);
    this.type="noun";
    this.getText=function(){
        return this.kanji;
    }
    this.id=1;
    this.getId=function(){
        return this.id;
    }
}
Noun.prototype=Object.create(Word.prototype);

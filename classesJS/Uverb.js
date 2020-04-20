import { Verb } from './verb.js';
UVerb.prototype=Object.create(Verb.prototype);

export function UVerb(hiragana,kanji){
    Verb.call(this,hiragana,kanji);
    this.type='uverb';
};

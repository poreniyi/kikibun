import { Verb } from './verb.js';
export function IVerb(hiragana,kanji){
    Verb.call(this,hiragana,kanji);
    this.type='ruverb'
};
IVerb.prototype=Object.create(Verb.prototype);

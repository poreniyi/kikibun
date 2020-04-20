import { Word } from './Word.js';
import { Verb } from './verb.js';
import { UVerb } from './Uverb.js';
import { IVerb } from './Iverb.js';
import { Noun } from './Nouns.js';
import {Particles} from './particles.js';
import {Conjugation} from './Conjugation.js';



let word1=new Word('あさ','朝');
let word2=new Word('どようび','土曜日');
let basicVerb=new Verb("hiragana", 'kanji');
let ruVerbExample=new IVerb('みる','見る');
let goVerbExample=new UVerb('はなす','話す');///change to uverb

console.log(word1.negative);
ruVerbExample.negativeForm();
console.log(ruVerbExample.negative);


ruVerbExample.PoliteForm();
ruVerbExample.PoliteNegativeForm();
// ruVerbExample.showFinalSyllable();

//console.log(ruVerbExample);

goVerbExample.negativeForm();
goVerbExample.PoliteNegativeForm();
goVerbExample.PoliteForm();
// goVerbExample.showFinalSyllable();
goVerbExample.setNlevel(4);
console.log(goVerbExample.nLevel);
console.log(goVerbExample.getLength());

let exampleSentece=[];//xはｙです
let Japan=new Noun('にほん','日本');
let Country=new Noun('くに','国');
let exampleParticle=new Particles('the definition','は')
let exampleParticle2=new Particles('the definition2','です')
Japan.sayKanji();
console.log("--------------------------------------------");

let regex=RegExp('.*は.*です');
let regex2=RegExp("");
let exampleParticle3=new Particles('the definition2','の')


function questionParticleChecker(string){
  string.endsWith('か')
}

//ｘはｙです

let testParser=function(string){
    string=string.replace('です',''); //remove です or a conjugation in the future
    let wordsArray=string.split('');//split on は
    let nounChecker=false;
      // if each part is only a noun it fits
      wordsArray.forEach(function e(){
        if(e!='a'){// if not in noun database not a match
          return false;
        }
      })
      //problems with longer grammar patterns this won't work
      //need to go on and check for other grammar parts
      
      console.log(string);
}
testParser('');
const para=document.querySelector('#para');
const button=document.querySelector('#button');

let exampleSentence={
   sentence1:[
       {
        partOfSpeech:'noun',
        text: 'モモ'
       },
       {
        partOfSpeech:'particle',
        text: 'が'
       },
       {
        partOfSpeech:'い-adj',
        text: '優しくて'
       },
       {
        partOfSpeech:'な-adj',
        text: 'きれいな'
       },

       {
        partOfSpeech:'noun',
        text: '猫'
       },

       {
        partOfSpeech:'particle',
        text: 'ん'
       },
       {
        partOfSpeech:'verb',
        text: 'だ'
       },
       {
        partOfSpeech:'particle',
        text: 'から'
       },
       {
        partOfSpeech:'noun',
        text: '私'
       },
       {
        partOfSpeech:'particle',
        text: 'の'
       },
       {
        partOfSpeech:'noun',
        text: '最高'
       },
       {
        partOfSpeech:'particle',
        text: 'の'
       },
       {
        partOfSpeech:'noun',
        text: '友達'
       },
       {
        partOfSpeech:'verb',
        text: 'です'
       },
       
   ]
}

const colorFunction= function(sentence){
    for(let i=0;i<sentence["sentence1"].length;i++){
        console.log(i);
        const aspan=document.createElement('span');
        aspan.textContent=sentence['sentence1'][i]['text'];
        switch(sentence['sentence1'][i]['partOfSpeech']){
            case'noun':
            aspan.classList.toggle('red')
            break;
            case'particle':
            aspan.classList.toggle('green')
            break;
            case'verb':
            aspan.classList.toggle('blue')
            break;
            case'い-adj':
            aspan.classList.toggle('purple')
            break;
            case'な-adj':
            aspan.classList.toggle('brown')
            break;
        }
        para.appendChild(aspan);
    }

    let period=document.createElement('span');
    period.textContent='。';
    para.appendChild(period);
}
button.addEventListener('click', ()=>{
    colorFunction(exampleSentence);
   // para.textContent+=
})

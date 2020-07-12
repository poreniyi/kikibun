const fs=require('fs');
const XLSX = require('xlsx');
let Particles=require  ('./dataApp').Particles;
const path = require('path');

removeNewLineChars=(array)=>{
    if(array.length>0){
        for(let j=0;j<array.length;j++){
            array[j]=array[j].replace(/[\n\r]+/g,"");
        }
    }
}

addParticles=()=>{
    //let workbook=XLSX.readFile('../txtFiles/particles/GenkiGrammar.xlsx');
    let workbook=XLSX.readFile(path.join(__dirname, '..', 'txtFiles','particles', 'GenkiGrammar.xlsx'));
    const sheetNames=workbook.SheetNames;
    let array=[];     
    for(let i=0;i< 12;i++){
        let nameOfSheet=workbook.SheetNames[i];
        console.log(nameOfSheet);
        let data=XLSX.utils.sheet_to_json(workbook.Sheets[nameOfSheet]);
        name='';
        pos=[];
        before=[];
        form=[];
        data.forEach(row=>{
            before= row.Before ? row.Before.split('+') : [];
            let after=row['Form After']? row['Form After'].split('+'): [];
            let formAfter=after.filter(e=> {return e})
            let LVL=row.NLVL ? row.NLVL :"";
            let pos=row['POS acted on'].split('/');
            removeNewLineChars(pos);
            removeNewLineChars(formAfter);
            removeNewLineChars(before);
            let currentParticle={
                Name:row.Name.replace(/\n|\r/g, ""),
                POSActedOn:pos,
                Before:before,
                Form:formAfter,
                Chapter:(i+1),
                NLvl:LVL,
            }
            // Particles.create(currentParticle).then(function(data){
            //     console.log(data);
            // });
            // console.log(currentParticle);
            array.push(currentParticle);
        })     
    }  
    array.forEach(e=>{
        if(e.Chapter==9){
            console.log(e)
        }
     })
}
addParticles();

module.exports={
    addParticles:addParticles,
}
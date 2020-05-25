const fs=require('fs');

addParticles= ()=>{
    let fileName='../txtFiles/particles/Particles.txt'
    fs.readFile(fileName,'utf8',(err,data)=>{
        let chapters=data.split(/\n\s*\n/);
        console.log(chapters.length);
        chapters.forEach(element=>{
            element.split('\n');
        })
        let lines=chapters[0].split('\n');
        lines.shift(0);
        //console.log(`${lines[0]}`);
        //console.log(chapters[8]);
        let line2=chapters[8].split('\n');
        line2.forEach(element=>{
            let tabs=element.split('\t');
            console.log(tabs[tabs.length-1]);
           let posTab=tabs[tabs.length-1].trim();
            let pos=posTab.split('\/')
            let rest=tabs.slice(1,-1);
            let nonEmptytabs=rest.filter((e)=>{return e}); 
            let particle={
                Name:tabs[0],
                Form:nonEmptytabs,
                POS:pos,
            }
            //writeStream.write(`${JSON.stringify(particle)}\n`);
            console.log(particle);

        })
    })
}
let test='../txtFiles/particles/test.txt';

let writeStream=fs.createWriteStream(test,{flags:'a'});

addParticles();
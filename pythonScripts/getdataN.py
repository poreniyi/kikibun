from bs4 import BeautifulSoup
import requests

def newLinks():
    for x in range(1,6): 
        startoFlink ='http://www.tanos.co.uk/jlpt/jlpt'
        endofLink='/vocab/'
        val=str(x)
        currentLink=startoFlink+val+endofLink
        page =requests.get(currentLink)
        soup=BeautifulSoup(page.content,'html.parser')
        print("Now getting vocab from:"+currentLink)
        print(x)
        filename="JLPT:"+str(x)+'.txt'
        f=open(filename,'w')
        tables=(soup.select("table"))
        selectedTable=tables[1]
        rows=(selectedTable.select('tr'))
        text=""
        rows.pop(0)
        for i in rows: 
            cells=i.findChildren('td')
            kanji=cells[0].string  
            if not kanji:
                kanji="None"
            else:
                kana=cells[0].string 
            if cells[1].string is not None:
                kana=cells[1].string
            if cells[2].string is not None:
                english=(cells[2].string)
            f.write(kana+'+'+kanji+'+'+english+"\n")
            #f.write(text)
            print(kana+kanji+english)
            #print(text)
        f.close()
        print("Completed getting vocab from:"+currentLink)
newLinks()






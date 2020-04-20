import requests
from bs4 import BeautifulSoup

# link='http://ohelo.org/japn/lang/genki_vocab_table.php?lesson=1'
# page =requests.get(link)
# soup=BeautifulSoup(page.content,'html.parser')

# print(soup.prettify())
def newLinks():
    link='http://ohelo.org/japn/lang/genki_vocab_table.php?lesson='
    for x in range(3,24): #start at 3
        val=str(x)
        currentLink=link+val
        page =requests.get(currentLink)
        soup=BeautifulSoup(page.content,'html.parser')
        print("Now getting vocab from:"+currentLink)
        print(x)
        filename="lesson:"+str(x)+'.txt'
        f=open(filename,'w')
        tableRows=soup.select('tr')
        text=""
        tableRows.pop(0)
        for i in tableRows: 
            cells=i.findChildren('td')  
            if cells[0].string is not None:
                text=cells[0].string
                kana=cells[0].string
            if cells[1].string is not None:
                text+="+"+cells[1].string
                kanji=cells[1].string
            if cells[2].string is not None:
                english=(cells[2].string)
                text+="+"+(cells[2].string)+"\n"
            # f.write(kana+'+'+kanji+'+'+english+"\n")
            f.write(text)
            print(text)
        f.close()
newLinks()

# def writeToFile():
#     f=open("myvocabfile.txt", 'w')
#     tableRows=soup.select('tr')
#     for i in tableRows: 
#         values=i.findChildren('td')  
#         if values[0].string is not None:
#             val1=(values[0].string)
#         if values[1].string is not None:
#             val2=(values[1].string)
#         if values[3].string is not None:
#             val3=(values[3].string)
#     f.write(val1+'+'+val2+'+'+val3+"\n")
#     print("next row")
#     f.close()
def newLink2():
    link='http://ohelo.org/japn/lang/genki_vocab_table.php?lesson='
    for x in range(1,3): #start at 3
        val=str(x)
        currentLink=link+val
        page =requests.get(currentLink)
        soup=BeautifulSoup(page.content,'html.parser')
        print("Now getting vocab from:"+currentLink)
        print(x)
        filename="lesson:"+str(x)+'.txt'
        f=open(filename,'w')
        tableRows=soup.select('tr')
        text=""
        tableRows.pop(0)
        for i in tableRows: 
            cells=i.findChildren('td')  
            if cells[0].string is not None:
                text=cells[0].string
                kana=cells[0].string
            if cells[1].string is not None:
                text+="+"+cells[1].string
                kanji=cells[1].string
            if cells[3].string is not None:
                english=(cells[3].string)
                text+="+"+(cells[3].string)+"\n"
            # f.write(kana+'+'+kanji+'+'+english+"\n")
            f.write(text)
            print(text)
        f.close()
newLink2()
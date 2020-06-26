import requests
from time import sleep
from bs4 import BeautifulSoup
link='http://www.guidetojapanese.org/learn/grammar'

page =requests.get(link)
soup=BeautifulSoup(page.content,'html.parser')
#print(soup.prettify())
mylist=soup.select('a')
mystring=str(page.content)
f=open("tae.txt", "a")
for i in mylist:
    link=i['href']
    #f.write(i.getText())
    
    if "/grammar" in link:
        print(link)
print(str(len(mylist)))
def writeToTxtFile():
    f=open('ezNews.html', 'w+')   
    f.write(mylist)       
#writeToTxtFile()
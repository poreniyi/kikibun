import requests
from time import sleep
from bs4 import BeautifulSoup
from selenium import webdriver
import urllib3

link='https://www3.nhk.or.jp/news/easy/'
driver=webdriver.chrome()
driver.get(link)

# http = urllib3.PoolManager()
# page=http.request('GET', link, retries=0)
# try:
#     page=requests.get(link)
#     print(page.status_code)
# except requests.exceptions.ConnectionError:
#     page.status_code="Connection Refused"

soup= BeautifulSoup(driver.page_source, 'html.parser')
#print(soup.prettify())
mylist=soup.select('a')
mystring=str(page.content)
for i in mylist:
    print(i)
print(str(len(mylist)))
def writeToTxtFile():
    f=open('ezNews.html', 'w+')   
    f.write(mystring)       
#writeToTxtFile()
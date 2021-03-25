
let articleTextDiv = document.getElementById('articleText');
let calendarTable = document.getElementById('calendarTable');
let tableName = document.getElementById('tableName');

const yearSelect = document.querySelector('#yearSelect');
const monthSelect = document.querySelector('#monthSelect');
let submitButton = document.querySelector('#submitButton');
let formText = document.querySelector('#Text');
let articleDiv = document.querySelector('#articleText');
let thedate = document.querySelector('#theDate');


submitButton.addEventListener('click', () => {
    formText.value = articleDiv.textContent;
    form.submit();
})

let monthDays = {
    31: [0, 2, 4, 6, 7, 9, 11],
    30: [3, 5, 8, 10],
    29: [],
    28: [1],
}
let tableIsShown = false;

let daysArray = [];
let weeksArray = [];
monthSelect.addEventListener('change', () => {
    if (monthSelect[0].value == 'default') {
        monthSelect[0].parentNode.removeChild(monthSelect[0]);
    }
    monthValue = monthSelect.selectedIndex;
    tableName.textContent = monthSelect.value;
    weeksArray.forEach(weekRow => {
        weekRow.parentNode.removeChild(weekRow);
    });
    weeksArray = [];
    daysArray = [];
    tableIsShown = false;
    if (!tableIsShown) {
        makeCalendarTable(monthValue);
        tableIsShown = true;
        requestMonths(monthValue);
    }
})

let makeCalendarTable = (month) => {
    let selectedDate = new Date(2020, month, 1);
    let maxAmountDays;
    switch (selectedDate.getMonth()) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            maxAmountDays = 31;
            break;
        case 3:
        case 5:
        case 8:
        case 10:
            maxAmountDays = 30;
            break;
        case 1:
            maxAmountDays = 28;
    }
    let days = 1;
    let start = selectedDate.getDay();
    startIsDone = false;
    for (let i = 1; i < 7; i++) {
        let row = calendarTable.insertRow(-1);
        weeksArray.push(row);
        for (let j = 1; j < 8; j++) {
            let td = {};
            td.cell = row.insertCell(-1);
            if (j - 1 == start && !startIsDone) {
                daysArray.push(td);
                td.cell.textContent = days;
                startIsDone = true;
            }
            if (days != maxAmountDays + 1 && startIsDone) {
                daysArray.push(td);
                td.cell.textContent = days;
                days++;
            }
        }
    }
}

let requestMonths = async () => {
    let month = monthSelect.selectedIndex;
    let year = parseInt(yearSelect.value);
    let response = await fetch(`/getAvailableArticleDays?year=${year}&month=${month}`);
    let data = await response.json();
    console.log(data);
    parseMonths(data.days);
}
let parseMonths = (array) => {
    array.forEach(value => {
        clickDay(daysArray[value]);
        // daysArray[value].style.backgroundColor='blue';
    })
}
let clickDay = (td) => {
    let hasBeenClicked = false;
    let article = document.createElement('option');
    article.textContent = td.cell.textContent;
    td.cell.style.backgroundColor = 'lightblue';
    td.cell.addEventListener('click', () => {
        if (!hasBeenClicked) {
            while (articleSelect.firstChild) {
                articleSelect.removeChild(articleSelect.firstChild);
            }
            getArticles(td);
            thedate.textContent = `Now viewing articles published on ${monthSelect.value},${td.cell.textContent},${yearSelect.value}`;
        }
        hasBeenClicked = true;
    })
}
let getArticles = async (td) => {
    let month = monthSelect.selectedIndex;
    let year = parseInt(yearSelect.value);
    let query = `/getArticles?year=${year}&month=${month}&day=${td.cell.textContent}`;
    let response = await fetch(query);
    let jsonObj = await response.json();
    jsonObj.forEach(element => {
        data = JSON.parse(element);
        let option = document.createElement('option');
        option.textContent = data.title;
        articleSelect.appendChild(option);
    })
    let article1 = JSON.parse(jsonObj[0]);
    articleDiv.textContent = article1.text;
    submitButton.hidden = false;
    articleSelect.addEventListener('change', () => {
        let obj = JSON.parse(jsonObj[articleSelect.selectedIndex]);
        articleDiv.textContent = obj.text;
    })
}
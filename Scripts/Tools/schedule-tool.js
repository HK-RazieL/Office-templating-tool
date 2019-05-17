function scheduleMakerTool() {
    document.getElementById("scheduleTable").innerHTML = "";
    let workers = ["Hristo Aleksiev", "Emil Netsov", "Valeri Ivanchev", "Dimitar Razhankov", "Stanislav Angelkov", "Isuf Hatib",
        "Georgi Ganchev", "Hulya Atalat", "Yilmaz Umer", "Milan Kirilov", "Aleksander Vulov", "Nikola Ilchev", "Velizar Dimov",
        "Maryan Yanachkov", "Pavel Dimitrov", "Manol Kosev", "Petya Dicheva", "Nikoleta Popova", "Hristo Kyurkchiev"
    ]

    let table = document.createElement("table");
    let headder = table.createTHead();
    let nameRow = headder.insertRow(0);

    for (let i = 0; i < workers.length; i++) {
        let cell = nameRow.insertCell(i);
        cell.innerHTML = workers[i];
    }

    let morningShift = 1;
    let afternoonShift = 2;
    let nightShift = 3;

    let dates = new Date(document.getElementById("start").value);

    function daysInMonth(anyDateInMonth) {
        return new Date(anyDateInMonth.getFullYear(),
            anyDateInMonth.getMonth() + 1,
            0).getDate();
    }

    let workersOnMorningShift = 0;
    let workersOnAfternoonShift = 0;

    for(let i = 0; i < daysInMonth(dates); i++) {
        let row = table.insertRow(-1);

        for(let j = 0; j < workers.length; j++) {
            let name = table.getElementsByTagName("td").item(j).innerHTML;
            let cell = row.insertCell(-1);
            if (name === document.getElementsByClassName("nightShift")[0].value ||
                name === document.getElementsByClassName("nightShift")[1].value ||
                name === "Stanislav Angelkov" || name === "Milan Kirilov") {
                    cell.innerHTML = "3";
            } else if (workersOnMorningShift >= workersOnAfternoonShift) {
                cell.innerHTML = "2";
                workersOnAfternoonShift++;
            } else{
                cell.innerHTML = "1";
                workersOnMorningShift++;
            }
        }
    }
    

    let newTable = document.getElementById("scheduleTable");
    newTable.appendChild(table);
}
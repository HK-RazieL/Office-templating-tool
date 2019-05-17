function findQuestXp(questXp, questTime) {
    return questXp / questTime;
}

function clear() {
    document.querySelectorAll(".quests").forEach((quest) => { quest.style.backgroundColor = "white" });
    document.querySelectorAll(".time").forEach((time) => { time.style.backgroundColor = "white" });
    document.querySelectorAll(".result").forEach((result) => { result.style.backgroundColor = "white" });
}

function select(quest, timer, result) {
    document.getElementById(quest).style.backgroundColor = "green";
    document.getElementById(timer).style.backgroundColor = "green";
    document.getElementById(result).style.backgroundColor = "green";
}

function clearAll() {
    document.querySelectorAll(".quests").forEach((quest) => { 
        quest.style.backgroundColor = "white";
        quest.value = "";
    });
    document.querySelectorAll(".time").forEach((time) => { 
        time.style.backgroundColor = "white";
        time.selectedIndex = 0;
    });
    document.querySelectorAll(".result").forEach((result) => { 
        result.style.backgroundColor = "white";
        result.value = "";
    });

}

function findBestQuest()  {
    clear();
    let quests = document.querySelectorAll(".quests");
    let timers = document.querySelectorAll(".time");
    let results = document.querySelectorAll(".result");
    let result = Math.max(findQuestXp(quests[0].value, timers[0].value),
                          findQuestXp(quests[1].value, timers[1].value),
                          findQuestXp(quests[2].value, timers[2].value));

    results[0].value = findQuestXp(quests[0].value, timers[0].value);
    results[1].value = findQuestXp(quests[1].value, timers[1].value);
    results[2].value = findQuestXp(quests[2].value, timers[2].value);

    if (findQuestXp(quests[0].value, timers[0].value) === result) {
        select("input-one", "select-one", "result-one");
    } else if (findQuestXp(quests[1].value, timers[1].value) === result) {
        select("input-two", "select-two", "result-two");
    } else if(findQuestXp(quests[2].value, timers[2].value) === result) {
        select("input-three", "select-three", "result-three");
    }
}
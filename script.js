'use strict';

let money, time;

// Asking user for monthly income and date of birth
function start() {
    money = +prompt("Ваш бюджет на месяц?");
    time = prompt("Введите дату в формате YYYY-MM-DD");

    while(isNaN(money) || money == '' || money == null){
        money = +prompt("Ваш бюджет на месяц?");
    }
}

// Asking user two questions and return data. First answer has to be string, second number
function askTwoQuestions(questionOne, questionTwo){
    let answerOne = prompt(questionOne);
    let answerTwo = prompt(questionTwo);
    
    if ((typeof(answerOne) === 'string') && (typeof(answerOne) != null)  && (typeof(answerTwo) != null)
        && (answerOne != '') && (answerTwo != '') && (answerOne.length < 50) && !(isNaN(answerTwo))){
        return [answerOne, answerTwo];
    } else {
        do {
            alert("Введите корректные данные!");
            answerOne = prompt(questionOne);
            answerTwo = prompt(questionTwo);
        } while ((typeof(answerOne) !== 'string') || (typeof(answerOne) == null)  || (typeof(answerTwo) == null)
        || (answerOne == '') || (answerTwo == '') || (answerOne.length > 50) || isNaN(answerTwo));
    }
    return [answerOne, answerTwo];
}

// Asking user for expenses and saving them to appData.expenses object
function chooseExpenses(){
    for (let i = 0; i < 2; i++){
        let answers = askTwoQuestions("Введите обязательную статью расходов в этом месяце",
        "Во сколько обойдется?");
        appData.expenses[answers[0]] = answers[1];
    }
}

// Calculating daily budget and displaying information about income to console
function calculateDailyBudget(){
    appData.dailyBudget = Math.round(appData.budget / 30);
    alert(`Your daily budget is ${appData.dailyBudget}`);
}
// Displaying information regarding income level of user to console
function detectLevel(){
    if(appData.dailyBudget < 100){
        console.log("Low income");
    } else if (appData.dailyBudget >= 100 && appData.dailyBudget < 2000){
        console.log("Average budget");
    } else if (appData.dailyBudget > 2000){
        console.log("Good income");
    } else {
        console.log("Some error occured!");
    }
}
// Checking whether user has any savings and requesting additional info from user
function checkSavings(){
    if (appData.savings){
        let save = +prompt("Какова сумма накоплений?"),
            percent = +prompt("Под какой процент,");

        appData.monthIncome = save/100/12*percent;
        alert(`Доход в месяц с вашего депозита: ${appData.monthIncome} `);  
    }
}

// Asking user regarding optional epenses for next month and saving them to appData object
function chooseOptExpenses(){
    for (let i = 0; i < 3; i++){
        let answers = askTwoQuestions("Введите необязательную статью расходов в этом месяце",
        "Во сколько обойдется?");
        appData.optionalExpenses[answers[0]] = answers[1];
    }
}

start();
let appData = {
    budget : money,
    timeData : time,
    expenses : {},
    optionalExpenses : {},  
    income : [],
    savings : true,
}
chooseExpenses();
calculateDailyBudget();
detectLevel();
checkSavings();
chooseOptExpenses();
console.log(appData);
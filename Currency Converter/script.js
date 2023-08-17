// declare variables
const currencyFirst = document.getElementById("currency-first"); 
const worthFirst = document.getElementById("worth-first"); 
const currencySecond = document.getElementById("currency-second"); 
const worthSecond = document.getElementById("worth-second"); 
const exchangeRate = document.getElementById("exchange-rate"); 

updateRate(); // to display default rate below which is in p tag

// to get currency rate using api
function updateRate(){
    fetch(`https://v6.exchangerate-api.com/v6/acc56a551a9882ee10446b4d/latest/${currencyFirst.value}`)
    .then((res)=>res.json()) // to get result first convert it to json then get the data
    .then((data)=>{
        //conversion_rate is used in that api key because we need only that
        const rate = data.conversion_rates[currencySecond.value]
        // to display below p tag's currency rate for respective country which user chooses
        exchangeRate.innerText = `1 ${currencyFirst.value} = ${rate + " " + currencySecond.value}`;
        // to display how much money according to user selection
        worthSecond.value = (worthFirst.value * rate).toFixed(2);
    });  
};

// events when user clicks 
currencyFirst.addEventListener("change",updateRate);
currencySecond.addEventListener("change",updateRate);
worthFirst.addEventListener("input",updateRate);
worthSecond.addEventListener("input",updateRate);
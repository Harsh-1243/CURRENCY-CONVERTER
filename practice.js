import { countryList } from "./list.js";

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const inputAmount = document.querySelector(".form-control");
const btn = document.querySelector(".btn");
const fromCurr = document.getElementById("from-sel");
const toCurr = document.getElementById("to-sel");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const result = document.querySelector(".result");
const select = document.querySelectorAll("select");
const swap = document.querySelector(".fa-solid");

let updateFlags = (event) => {

    let currCode = event.value;

    let countryCode = countryList[currCode];

    let NewFlagUrl = `https://flagsapi.com/${countryCode}/flat/48.png`;

    let NewImg = event.parentElement.querySelector("img");

    NewImg.src = NewFlagUrl;

};

for (let selects of select) {

    for (let currCode in countryList) {

        let NewElem = document.createElement("option");

        NewElem.innerText = currCode;

        NewElem.value = currCode;

        if (selects.name === "from" && currCode === "USD") {

            NewElem.selected = "selected";

        } else if (selects.name === "to" && currCode === "INR") {

            NewElem.selected = "selected";
        }


        selects.append(NewElem);

    }

    selects.addEventListener("change", (event) => {

        updateFlags(event.target);

    });

}

let updateExchangeRate = async () => {

    let AmountVal = inputAmount.value;

    if (AmountVal === "" || AmountVal < 1) {

        AmountVal = 1;
        inputAmount.value = 1;

    }

    let NewBaseUrl = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(NewBaseUrl);

    let data = await response.json();

    let CurrRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let FinalAmount = CurrRate * AmountVal;

    result.innerText = `${AmountVal} ${fromCurr.value.toUpperCase()}  =  ${FinalAmount.toFixed(2)} ${toCurr.value.toUpperCase()}`;

};

btn.addEventListener("click", (event) => {

    event.preventDefault();
    updateExchangeRate();

});

window.addEventListener("load", () => {

    updateExchangeRate();
});

swap.addEventListener("click", () => {


    let fromFlag = fromCurr.parentElement.querySelector("img");

    let toFlag = toCurr.parentElement.querySelector("img");

    let tmp = fromFlag.src;

    fromFlag.src = toFlag.src;

    toFlag.src = tmp;


    let tmp2 = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tmp2;

});


window.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();
        updateExchangeRate();
    }

});



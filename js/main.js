"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Victor Heras
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Kontrollera formulärets obligatoriska fält

    if (fullnameInput.value.trim() === ""){
        errors.push("Du måste fylla i namn");
    }
    if (emailInput.value.trim() === ""){
        errors.push("Du måste fylla i email");
    }
    if (phoneInput.value.trim() === ""){
        errors.push("Du måste fylla i telefonnummer");
    }

    // Visa eventuella felmeddelanden
    displayErrors();

    // Returnera resultatet (true eller false) av valideringen
    return errors.length === 0;
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    for (let i = 0; i<errors.length; i++){
        errorList.innerHTML += "<li>" + errors[i] + "</li>"
    }
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const studentkort = {
        namn: fullnameInput.value,
        email: emailInput.value,
        telefon: phoneInput.value,
        font: fontSelect.value,
    };

    // Uppdatera studentkortet
    previewFullname.textContent = studentkort.namn;
    previewEmail.textContent = studentkort.email;
    previewPhone.textContent = studentkort.telefon;

    // Ändrar font på namn, email & telefon
    previewFullname.style.fontFamily = studentkort.font;
    previewEmail.style.fontFamily = studentkort.font;
    previewPhone.style.fontFamily = studentkort.font;

    // Lägg till studentkortet i historiken
    history.push(studentkort);

    // Spara och uppdatera historiken
    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("history", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const saveHistory = localStorage.getItem("history");

    // Uppdatera history
    if (saveHistory) {
        history = JSON.parse(saveHistory);
    }
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    for (let i=history.length-1; i>=0; i--) {
        const studentkort = history[i];

        historySection.innerHTML +=
        "<div class='card'>" +
        "<div class='card-divider'></div>" +
        "<div class='card-info'>" + studentkort.namn + "</div>" +
        "<div class='card-info'>" + studentkort.email + "</div>" +
        "<div class='card-info'>" + studentkort.telefon + "</div>" +
        "</div>";
    }

}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();

    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";

    // Rensa eventuella felmeddelanden
    errors = [];
    errorList.innerHTML = "";
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("history");

    // Uppdatera history och visningen på sidan
    history = [];
    historySection.innerHTML = "";

}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas

form.addEventListener("submit", function(event){
    event.preventDefault();

    if (validateForm()) { //kallar validateForm och beroende om den ger True eller false kallas sedan function createStudentCard
        createStudentCard();
        
    }

});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", clearForm); //När rensa knappen i webbläsaren klickas kallas clearForm function

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", deleteHistory); //När rensa historik knappen i webbläsaren klickas kallas deleteHistory function


// När sidan laddas:
// - läs in och visa eventuell tidigare historik
window.addEventListener("load", function(){
    loadHistory();
    renderHistory();
})
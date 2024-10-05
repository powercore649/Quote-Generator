const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const discordBtn = document.getElementById('discord');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //Check quote length to determine styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch Error Here
    }
}

function discordQuote() {
    const request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/1288623896181997588/JM4GtdSMYYgQVvrkwqZYdE8S6S7Lv3co3MBQcyFvWKf0jHAOOYpSuT3JiseBMMdYy3FT");

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
      username: "Quote of the Day",
      avatar_url: "",
      content: "```" + quoteText.textContent + "```\n*" + authorText.textContent + "*"
    }

    request.send(JSON.stringify(params));
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);

// On Load
getQuotes();

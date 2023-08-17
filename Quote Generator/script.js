// declare quote api

const api_url = "https://api.quotable.io/random?tags=science,famous-quotes";

const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function getquote(url){
    // fetching info from url is stored in response
    const response = await fetch(url);
    // with json, that response will be stored in data,
    // data will be used to display results
    var data = await response.json();
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}

getquote(api_url);

// to share in twitter
function tweet(){
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + "---- by " + author.innerHTML, "Tweet Window", "width=600", "height=300");
}
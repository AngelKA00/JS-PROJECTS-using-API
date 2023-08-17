// declare variables
const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

// to fetch the word and its meaning
async function fetchAPI (word){
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        // when internet slow, then it displays the below msg,
        // for this to be displayed, infoText display must be block
        infoTextEl.innerText = `Searching the meaning of "${word}"`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());

        // condition to check whether the entered word is valid or not
        if(result.title){
            meaningContainerEl.style.display = "block"; // displays meaning
            infoTextEl.style.display = "none"; // hides error msg
            titleEl.innerText = word; // fetches the word by user
            meaningEl.innerText = "N/A"; // if it is invalid word
            audioEl.style.display = "none"; // hides the audio
        }
        else{
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            audioEl.style.display = "inline-flex";
            // these are taken from api
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
        }
    } 
    // to display the error msg
    catch (error) {
        infoTextEl.innerText = `An error occurred. Try again later "${word}"`;
    }
    
}

// when user types something, it gets that word and its meaning through below function
inputEl.addEventListener("keyup",(e) =>{
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value); // this function used to fetch that word's info
    } 
});
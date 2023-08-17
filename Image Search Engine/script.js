// in this project unsplash website is used to fetch images from the web
// below accesskey is the one registered in unsplash website
// only with this API key we can fetch images from unsplash website
const accessKey = "Juos_ISD_u29MdZ-B_W5dMQfkfZ0uW39urC1xd5wyqQ";

// declare variables 
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// keyword is the one which user will give
let keyword = "";
// pages when we get search results
let page = 1;

// function to search images
async function searchImages(){
    keyword = searchBox.value ; // here user will type anything they need to search
    //this below url is for photos from unsplash
    const url = `https://api.unsplash.com/search/photos?
        page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    // fetching info from url is stored in response
    const response = await fetch(url);
    // with json, that response will be stored in data, data will be used to display results
    const data = await response.json();

    // if we type dog 1st and then cat 2nd, cat results must come in top,
    // so when page is 1, searchresult must be empty, so that it will be on top
    if(page == 1){
        searchResult.innerHTML = "";
    }

    // data which we got with json, is stored in results
    // with this results, user can see the details they have searched for
    const results = data.results;

    // to display search results
    results.map((result) => {
        const image = document.createElement("img");//to store image from unsplash
        // it is taken from ->const url ,refer screenshot of urls.small address
        image.src = result.urls.small;

        const imageLink = document.createElement("a");//to store image link from unsplash
        // it is taken from ->const url ,refer screenshot of result.links address
        imageLink.href = result.links.html;

        imageLink.target="_blank";// to open image in new window

        imageLink.appendChild(image);// to link image with the link
        // to link imagelink with search results, so that it will open 
        // unsplash website from where we have taken the api and used here.
        searchResult.appendChild(imageLink);
    })
    // show more button is hidden at initial, to make it visible only after user searched
    showMoreBtn.style.display = "block";
}
// when user clicks on sub,it button, it should work
searchForm.addEventListener("submit",(e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})
// when user clicks on show more button, it will load another pages of that searh  results
showMoreBtn.addEventListener("click",() => {
    page++;
    searchImages();
})
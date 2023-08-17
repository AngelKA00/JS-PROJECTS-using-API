// declare variables

const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// to get recipes 
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    // try catch is used to display an error
    try {
        // instead of aariabat we give query so that user can type anything they want
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        // to get and display the typed recipe
        // it was given as meals in API so we used meals
        response.meals.forEach(meal => {
            // new element is created to store the recipe image
            const recipeDiv = document.createElement('div');
            // it will be added to the newly created element
            recipeDiv.classList.add('recipe');
            // we add that specific image in the html file which is given in API(strMealThumb,strMeal
            //, strArea, strCategory).
            recipeDiv.innerHTML = ` 
                <img src = "${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3> 
                <p><span>${meal.strArea} Dish</span> </p>
                <p><span>${meal.strCategory} Category</span> </p>
            `
            // create button to view the recipe details
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            // add button to the recipe div 
            recipeDiv.appendChild(button);

            // to perform function when user clicks on view recipe button
            button.addEventListener('click', () => {
                openRecipePopup(meal);
            })
            // add to the recipe container of html file
            recipeContainer.appendChild(recipeDiv);
        });
    } 
    catch (error) {
        recipeContainer.innerHTML = "<h2>Error in fetching Recipes...</h2>";
    }
}
// function to fetch ingredients
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
}
// to open recipe details like popup
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3 class="ingredientList">Ingredients :</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions :</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

// to close the recipe details pop up
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})
// to perform function when users clicks on search button
searchBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the recipe in the search box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
})
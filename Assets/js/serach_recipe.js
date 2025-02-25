// Function to fetch and display meals based on search input
function searchMeals(searchInput) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const mealList = document.getElementById('mealList');
            mealList.innerHTML = '';
            data.meals.forEach(meal => {
                // Create a card for each meal
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-3');
                card.innerHTML = `
                    <div class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <button type="button" class="btn btn-primary" onclick="showMealRecipe('${meal.idMeal}')">View Recipe</button>
                        </div>
                    </div>
                `;
                mealList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching meals:', error));
}

// Function to handle form submission
document.getElementById('form-section').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() !== '') {
        searchMeals(searchInput);
    } else {
        alert('Please enter a search query.');
    }
});

// Function to show meal recipe modal
function showMealRecipe(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            // Display modal or perform any other action to show the meal recipe
            console.log('Meal recipe:', data.meals[0]);
        })
        .catch(error => console.error('Error fetching meal recipe:', error));
}


// Function to show meal recipe modal
function showMealRecipe(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const modalBody = document.getElementById('recipeModalBody');
            const youtubeButton = document.getElementById('youtubeButton');
            
            // Populate modal with recipe details
            modalBody.innerHTML = `
                <img src="${meal.strMealThumb}" class="img-fluid mb-3" alt="${meal.strMeal}">
                <h5>${meal.strMeal}</h5>
                <p>${meal.strInstructions}</p>
            `;
            
            // Set YouTube button href to recipe video URL
            youtubeButton.href = meal.strYoutube;
            
            // Show modal
            const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
            recipeModal.show();
        })
        .catch(error => console.error('Error fetching meal recipe:', error));
}

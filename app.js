const input = document.getElementById("input");
        const resultSection = document.getElementById("result");
        const mealDetails = document.getElementById("meal-details");
        document.getElementById("search-btn").addEventListener("click", function(){
            resultSection.innerHTML = "";
            mealDetails.innerHTML = "";
            findMeal();
        })
        function findMeal(){
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals == null){
                    resultSection.innerHTML = `
                    <h3>No results found!</h3>`
                }
                else{
                    data.meals.forEach(element => {
                        const item = document.createElement("div");
                        item.innerHTML = `
                        <img src=${element.strMealThumb}>
                        <h5 class = "meal-title">${element.strMeal}</h5>
                        `;
                        resultSection.appendChild(item);
                        item.className = 'result-item';
                        item.id = `${element.idMeal}`;
                    });
                }
            })
        }
        document.getElementById('result').addEventListener("click", function(event){
            const mealId = event.target.parentNode.id;
            console.log(mealId);
            mealDetails.innerHTML = "";
            findMealDetails(mealId);
        })
        function findMealDetails(id){
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                const details = document.createElement("div");
                details.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}
                <hr>
                <h5>Ingredients</h5>
                `;
                const ingredients = document.createElement("ul");
                for (let i = 1; i <= 20; i++) {
                    const string = `strIngredient${i}`;
                    const property = meal[string];
                    const ingredientName = property;
                    if (ingredientName == "" || ingredientName == null){
                        break;
                    }
                    else{
                        const ingredientItem = document.createElement("li");
                        ingredientItem.innerText = ingredientName;
                        ingredients.appendChild(ingredientItem);
                    }
                    
                }
                details.appendChild(ingredients);
                mealDetails.appendChild(details);
            })
        }
const searchMeal = () => {
    const cardId = idSelector('card-id');
    const detailsId = idSelector('details-id');
    const inputMeal = idSelector('input-meal');

    const searchedMeal = inputMeal.value;
    if (searchedMeal === '') {
        cardId.innerHTML = "";
        detailsId.innerHTML = `
        <div id='meal-info'>
        <h6> Invalid Meal Name </h6>
        </div>
        `;
    } else {
        cardId.innerHTML = '';
        detailsId.innerHTML = '';
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
            .then(res => res.json())
            .then(data => {
                const mealsArray = data.meals;
                if (mealsArray === null) {
                    cardId.innerHTML = "";
                    detailsId.innerHTML = `
                    <div id='alert'>
                    <h6> Sorry!! This iteam Is Unavailable </h6>
                    </div>
                    `;
                } else {
                    mealsArray.forEach(meal => {
                        createHtmlElement(meal);
                    });
                }
            })
        displayDetails(searchedMeal);
    }
}
const idSelector = id => {
    const selectedId = document.getElementById(id);
    return selectedId;
}

const createHtmlElement = meal => {
    const cardId = idSelector('card-id');
    const card = document.createElement('div');
    card.className = 'card';
    const cardInfo = `
        <img src='${meal.strMealThumb}'>
        <h3>${meal.strMeal}</h2>
        `;
    card.innerHTML = cardInfo;
    cardId.appendChild(card);
}

const displayDetails = (searchedMeal) => {
    const searchId = idSelector('search-id');
    const cardId = idSelector('card-id');
    cardId.addEventListener('click', function (event) {
        cardId.innerHTML = '';
        searchId.style.display = 'none';
        const mealName = event.target.parentNode.children[1].innerHTML;
        const newMealName = encodeURI(mealName);
        getDetails(newMealName);
    })
    const getDetails = (newMealName) => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${newMealName}`)
            .then(res => res.json())
            .then(data => {
                const mealsArray = data.meals;
                const meal = mealsArray[0];
                mealDetails(meal);
            })
    }
        const mealDetails = meal => {
        const detailsId = idSelector('details-id');
        detailsId.innerHTML = '';
        const card = document.createElement('div');
        card.className = 'details-card';
        const cardInfo = `
            <img src='${meal.strMealThumb}'>
            <h2>${meal.strMeal}</h2>
            <h3>Ingredients</h3>
            <ul>
                <li>${meal.strMeasure1} ${meal.strIngredient1}<li>
                <li>${meal.strMeasure2} ${meal.strIngredient3}<li>
                <li>${meal.strMeasure3} ${meal.strIngredient2}<li>
                <li>${meal.strMeasure4} ${meal.strIngredient4}<li>
                <li>${meal.strMeasure5} ${meal.strIngredient5}<li>
                <li>${meal.strMeasure6} ${meal.strIngredient6}<li>
                <li>${meal.strMeasure7} ${meal.strIngredient7}<li>
                <li>${meal.strMeasure8} ${meal.strIngredient8}<li>
                <li>${meal.strMeasure9} ${meal.strIngredient9}<li>
                <li>${meal.strMeasure10} ${meal.strIngredient10}<li>
                <li>${meal.strMeasure11} ${meal.strIngredient11}<li>
                <li>${meal.strMeasure12} ${meal.strIngredient12}<li>
                <li>${meal.strMeasure13} ${meal.strIngredient13}<li>
                <li>${meal.strMeasure14} ${meal.strIngredient14}<li>
                <li>${meal.strMeasure15} ${meal.strIngredient15}<li>
            </ul>
            <button onclick='window.location.reload();' type='button'>Back
            </button>
            `;
            
        card.innerHTML = cardInfo;
        detailsId.appendChild(card);
        const ul = document.querySelector('ul');
        const liList = document.querySelectorAll('li');
        const ingredient = idSelector('ingredient');
        for (let i = 0; i < liList.length; i++) {
            const li = liList[i];

            if (li.innerText.length < 2) {
                li.innerText = '';
                console.log(li.innerText)
            }
        }
    }
}
const reloadWindow = () => {
    window.location.reload();
}


function createSalad() {
    var primaryIngredients = ['Paneer', 'Green sprouted moong', 'Lemon / Vinegar', 'Pepper powder']
    var secondaryDressings = ['Chilli flakes', 'Mayonnaise', 'Olives', 'Jalapeno', 'Lettuce', 'Mint leaf', 'Javas', 'Macroni', 'Cherry tomato', 'Corriander', 'Salted peanuts', 'Ranch dressing']
    var secondarySolidIngredients = ['Sprouted matki', 'Boiled potato', 'Chole (soft)', 'Rajma (soft)', 'Harbhara (soft)', 'Tomato', 'Red / Yellow Pepper', 'Sweet corn', 'Zucchini', 'Tofu', 'Carrot', 'Cucumber', 'Moong dal (soft)', 'Soya chunks', 'Egg white']
    var div = document.getElementById('recipie');
    var selectedSolidIngredients = []
    var selectedToppings = []
    for(i=0; i<3; i++){
        var random = Math.floor(Math.random() * secondarySolidIngredients.length);
        selectedSolidIngredients.push(secondarySolidIngredients[random]);
        secondarySolidIngredients.splice(random, 1);
    }
    for(i=0; i<3; i++){
        var random = Math.floor(Math.random() * secondaryDressings.length);
        selectedToppings.push(secondaryDressings[random]);
        secondaryDressings.splice(random, 1);
    }
    div.innerHTML = `
    <h3>Primary Ingredients</h3>
    <ul>
    ${primaryIngredients.map(e => {
        return `<li>${e}</li>`
    }).join('')}
    </ul>
    <h3>Secondary Ingredients</h3>
    <ul>
    ${selectedSolidIngredients.map(e => {
        return `<li>${e}</li>`
    }).join('')}
    </ul>
    <h3>Dressings / Addons</h3>
    <ul>
    ${selectedToppings.map(e => {
        return `<li>${e}</li>`
    }).join('')}
    </ul>
    `;
}
function ingredients () {
  var primaryIngredients = ['Paneer', 'Green sprouted moong', 'Lemon / Vinegar', 'Pepper powder']
  var secondaryDressings = ['Chilli flakes', 'Mayonnaise', 'Olives', 'Jalapeno', 'Lettuce', 'Mint leaf', 'Javas', 'Macroni', 'Cherry tomato', 'Corriander', 'Salted peanuts', 'Ranch dressing']
  var secondarySolidIngredients = ['Sprouted matki', 'Boiled potato', 'Chole (soft)', 'Rajma (soft)', 'Harbhara (soft)', 'Tomato', 'Red / Yellow Pepper', 'Sweet corn', 'Zucchini', 'Tofu', 'Carrot', 'Cucumber', 'Moong dal (soft)', 'Soya chunks', 'Egg white']
  return [primaryIngredients, secondaryDressings, secondarySolidIngredients]
}


function createSalad() {
  var [primaryIngredients, secondaryDressings, secondarySolidIngredients] = ingredients();
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

function showIngredients() {
  var [primaryIngredients, secondaryDressings, secondarySolidIngredients] = ingredients();
  var ings = [primaryIngredients, secondarySolidIngredients, secondaryDressings];
  document.querySelector('.ingredients').classList.add('open');
  document.querySelector('.ingredients').style.zIndex = 2;
  document.querySelector('.displayBoard').style.zIndex = 3;
  document.querySelector('.displayBoard').hidden = false;
  var sizes = [primaryIngredients.length, secondarySolidIngredients.length, secondaryDressings.length];
  var ingredientsDiv = document.querySelector('.displayBoard');
  var table = `<table class='ingredientsTable'>
      <th>Main Ingredients</th>
      <th>Other Ingredients</th>
      <th>Dressings / Toppings</th>
      ${function tables() {
        var data = "";
        for(i=0; i< Math.max.apply(null, sizes); i++){
          console.log(`i is ${i}`);
          data = data.concat(`<tr>
            ${function rows(){
              var rowData = "";
              for(j=0; j<3; j++){
                console.log(`j is ${j}`);
                rowData = rowData.concat(`<td>${ings[j][i] ? ings[j][i] : ''}</td>`)
              }
              console.log(rowData);
              return rowData;
            }()}
          </tr>`);
          console.log(data);
        }
        return data;
      }()}
    </table>
    <button onClick="closeTable()">Close</button>
  `;
  console.log(table);
  ingredientsDiv.innerHTML = table;
}

function closeTable() {
  document.querySelector('.ingredients').classList.remove('open');
  document.querySelector('.ingredients').style.zIndex = -2;
  document.querySelector('.displayBoard').style.zIndex = -3;
  document.querySelector('.displayBoard').hidden = true;
}
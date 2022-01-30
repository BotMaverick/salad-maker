function ingredients () {
  var primaryIngredients = ['Paneer', 'Green sprouted moong', 'Lemon / Vinegar', 'Pepper powder'];
  var secondaryDressings = ['Chilli flakes', 'Mayonnaise', 'Olives', 'Jalapeno', 'Lettuce', 'Mint leaf', 'Javas', 'Macroni', 'Cherry tomato', 'Corriander', 'Salted peanuts', 'Ranch dressing', 'Mix herbs'];
  var secondarySolidIngredients = ['Sprouted matki', 'Boiled potato', 'Chole (soft)', 'Rajma (soft)', 'Harbhara (soft)', 'Tomato', 'Red / Yellow Pepper', 'Sweet corn', 'Zucchini', 'Tofu', 'Carrot', 'Cucumber', 'Moong dal (soft)', 'Soya chunks', 'Egg white'];
  var tableHeadings = ['Main ingredients', 'Other ingredients', 'Dressings / Toppings'];
  return [tableHeadings, [primaryIngredients, secondarySolidIngredients, secondaryDressings]];
}

function saladLogs() {
  var dates = [
    '24/1/22',
    '30/1/22'
  ];
  var primaryIngredients = [
    'Paneer, Vinegar, Pepper powder',
    'Paneer, Green sprouted moong, Apple cider vinegar, Pepper powder'
  ];
  var secondaryDressings = [
    'Mayonnaise, Jalapeno, Mix herbs',
    'Mayonnaise, Jalapeno, Lettuce, Cherry tomato, Ranch dressing'
  ];
  var secondarySolidIngredients = [
    'Tomato, Cucumber, Soya chunks',
    'Sprouted matki, Red and Yellow Pepper, Cucumber'
  ];
  var tableHeadings = ['Date', 'Main ingredients', 'Other ingredients', 'Dressings / Toppings'];
  return [tableHeadings, [dates, primaryIngredients, secondarySolidIngredients, secondaryDressings]];
}


function createSalad() {
  var [primaryIngredients, secondaryDressings, secondarySolidIngredients] = ingredients();
  var div = document.getElementById('recipie');
  var selectedSolidIngredients = [];
  var selectedToppings = [];
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

function showTable(typeOfData) {
  var functionData = eval(`${typeOfData}()`);
  var functionDataTableHeadings = functionData[0];
  var functionDataLengths = functionData[1].map(e => e.length);
  document.querySelector('.ingredients').classList.add('open');
  document.querySelector('.ingredients').style.zIndex = 2;
  document.querySelector('.displayBoard').style.zIndex = 3;
  document.querySelector('.displayBoard').style.visibility = 'visible';
  var ingredientsDiv = document.querySelector('.displayBoard');
  var table = `<table class='ingredientsTable'>
      ${function tableHeading(){
        var headings = "";
        for(i=0; i<functionDataTableHeadings.length; i++){
          headings = headings.concat(`<th>${functionDataTableHeadings[i]}</th>`)
        }
        return headings;
      }()}
      ${function tables() {
        var data = "";
        for(i=0; i< Math.max.apply(null, functionDataLengths); i++){
          data = data.concat(`<tr>
            ${function rows(){
              var rowData = "";
              for(j=0; j<functionData[1].length; j++){
                rowData = rowData.concat(`<td>${functionData[1][j][i] ? functionData[1][j][i] : ''}</td>`)
              }
              return rowData;
            }()}
          </tr>`);
        }
        return data;
      }()}
    </table>
    <div class='closeDiv'>
      <button onClick="closeTable()" class='closeButton'>Close</button>
    </div>
  `;
  ingredientsDiv.innerHTML = table;
}

function closeTable() {
  document.querySelector('.ingredients').classList.remove('open');
  document.querySelector('.ingredients').style.zIndex = -2;
  document.querySelector('.displayBoard').style.zIndex = -3;
  document.querySelector('.displayBoard').style.visibility = 'hidden';
}

function ingredients () {
  var primaryIngredients = ['Paneer', 'Green sprouted moong', 'Lemon / Vinegar', 'Pepper powder'];
  var secondaryDressings = ['Chilli flakes', 'Mayonnaise', 'Olives', 'Jalapeno', 'Lettuce', 'Mint leaf', 'Javas', 'Macroni', 'Cherry tomato', 'Corriander', 'Salted peanuts', 'Ranch dressing', 'Mix herbs', 'Herbs Vinaigrette'];
  var secondarySolidIngredients = ['Sprouted matki', 'Boiled potato', 'Chole (soft)', 'Rajma (soft)', 'Harbhara (soft)', 'Tomato', 'Red / Yellow / Green Capsicum', 'Capsicum (Burnt)', 'Sweet corn', 'Zucchini', 'Tofu', 'Carrot', 'Cucumber', 'Moong dal (soft)', 'Soya chunks', 'Egg white', 'Broccoli', 'Red Cabbage'];
  var tableHeadings = ['Main ingredients', 'Other ingredients', 'Dressings / Toppings'];
  return [tableHeadings, [primaryIngredients, secondarySolidIngredients, secondaryDressings]];
}

function saladLogs() {
  var dates = [
    '24/01/22',
    '30/01/22',
    '05/02/22',
    '06/03/22',
    '23/04/22'
  ];
  var primaryIngredients = [
    'Paneer, Vinegar, Pepper powder',
    'Paneer, Green sprouted moong, Apple cider vinegar, Pepper powder',
    'Paneer, Vinegar, Pepper powder',
    'Paneer, Pepper powder',
    'Paneer, Pepper powder'
  ];
  var secondaryDressings = [
    'Mayonnaise, Jalapeno, Mix herbs',
    'Mayonnaise, Jalapeno, Lettuce, Cherry tomato, Ranch dressing',
    'Ranch dressing, Jalapeno, Mix herbs',
    'Mayonnaise, Red jalapeno, Green jalapeno, Ranch Dressing, Cherry tomato, Mix herbs',
    'Mayonnaise, Ranch dressing, Herbs Vinaigrette, Green jalapeno, Red jalapeno, Cherry tomato, Mix herbs'
  ];
  var secondarySolidIngredients = [
    'Tomato, Cucumber, Soya chunks',
    'Sprouted matki, Red and Yellow Pepper, Cucumber',
    'Tomato, Cucumber, Green Pepper (burnt), Sweet corn (boil + salt + halad)',
    'Green capsicum, Red capsicum, yellow capsicum, Sweet corn (boil + salt + turmeric), Mushroom (pan fry), Cucumber',
    'Green capsucim, Red capsicum, yellow capsicum, sweet corn (boil + salt + turmeric), Mushroom (pan fry), Cucumber, Broccoli'
  ];
  var tableHeadings = ['Date', 'Main ingredients', 'Other ingredients', 'Dressings / Toppings'];
  return [tableHeadings, [dates, primaryIngredients, secondarySolidIngredients, secondaryDressings]];
}

function createSalad() {
  var [primaryIngredients, secondaryDressings, secondarySolidIngredients] = ingredients()[1];
  var div = document.getElementById('recipie');
  var selectedSolidIngredients = [];
  var selectedToppings = [];
  for(i=0; i<5; i++){
    var random = Math.floor(Math.random() * secondarySolidIngredients.length);
    selectedSolidIngredients.push(secondarySolidIngredients[random]);
    secondarySolidIngredients.splice(random, 1);
  }
  for(i=0; i<6; i++){
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
  var table = `
  <div class='scrollableTable'>
    <div class='flexHeading'>
      ${function tableHeading(){
        var headings = "";
        for(i=0; i<functionDataTableHeadings.length; i++){
          headings = headings.concat(`<div>${functionDataTableHeadings[i]}</div>`)
        }
        return headings;
      }()}
    </div>
    <div class='ingredientsTable'>
      ${function tables() {
        var data = "";
        for(i=0; i< Math.max.apply(null, functionDataLengths); i++){
          data = data.concat(`<div class='tr'>
            ${function rows(){
              var rowData = "";
              for(j=0; j<functionData[1].length; j++){
                rowData = rowData.concat(`<div>${functionData[1][j][i] ? functionData[1][j][i] : ''}</div>`)
              }
              return rowData;
            }()}
          </div>`);
        }
        return data;
      }()}
    </div>
  </div>
  <div class='closeDiv'>
    <button onClick="closeTable()" class='closeButton'>Close</button>
  </div>
  `;
  ingredientsDiv.innerHTML = table;
  modalTableBorder();
}

function closeTable() {
  document.querySelector('.ingredients').classList.remove('open');
  document.querySelector('.ingredients').style.zIndex = -2;
  document.querySelector('.displayBoard').style.zIndex = -3;
  document.querySelector('.displayBoard').style.visibility = 'hidden';
}

function modalTableBorder() {
  var rows = document.querySelectorAll('div.tr');
  var count = 0;
  rows.forEach(e => {
    e.lastElementChild.style.borderRight = "1px solid black";
    if(count === rows.length - 1){
      [...e.children].forEach(r => {
        r.style.borderBottom = "0px solid black";
      })
    };
    count ++;
  });
}

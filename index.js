class Habit{
    constructor(/* String */ name, /* String */ description){
        this.name = name
        this.description = description
        this.checkbox = new Array(7).fill(null)
    }
}
var meditation = new Habit("Meditation", "The goal here is to sit and do nothing for 20 minutes")
meditation.checkbox = new Array(7).fill(null)

var sleeping = new Habit("Sleeping", "Get your sleep fam")
sleeping.checkbox = new Array(7).fill(null)

var eating = new Habit ("Eating", "Eating has shown to be a generally safe way to avoid death from starvation")
eating.checkbox = new Array(7).fill(null)

var habitList = [meditation, sleeping, eating]


function addDay(habitName, bool){
  // Go to the first null item and replace it with bool
  var habit
  // Find the habit
  for (i = 0; i < habitList.length; i++){
    if (habitList[i].name === habitName){
      habit = habitList[i];
    }
  }
  // If there are no null items add bool at the end and delete the first item.
  for (i = 0; i<habit.checkbox.length; i++){
      if (habit.checkbox[i] === null){
          habit.checkbox[i] = bool;
          loadPage();
          return;
      }
  } 
  habit.checkbox.unshift(bool);
  habit.checkbox.pop();
  loadPage();
}

function safeString(string){
  var safe = string
  if (string.includes("'")){
    safe = string.replaceAll("'", "\\\'")
  }
  else if (string.includes("\"")){
    safe = string.replaceAll("\"", `\\\\\\"`)
  }
  return safe
}

function editHabit(habitName){
  var habit;
  // Find the habit
  for (i = 0; i < habitList.length; i++){
    if (habitList[i].name === habitName){
      habit = habitList[i];
    }
  }

  var realHabitName = safeString(habitName);


  // Find habit header element
  var head = document.getElementById(habitName);

  head.innerHTML = `
  <form>
    <input id = "${habitName}-head" type="text" class="new-name" value="${habitName}" />
  </form>
  
  `

  // Find habit description element
  var description = document.getElementById(habitName + "-description");

  description.innerHTML = `
    <textarea id = "${habit.name}-textarea" type="text" class="new-description" form="${habitName}-edits"/>${habit.description} </textarea>
  `

  var edit = document.getElementById(habitName + "-edit");
  edit.innerHTML = `
  <form id="${habitName}-edits" action="javascript:submitChanges(\'${realHabitName}\')">
    <input type="submit" id="${habitName}-edits-button" value="Submit Changes" />
  </form>  
  `
}

function removeHabit(habitName){
  // Clear page
  var squares = document.getElementsByClassName("square");
  for (i = 0; i<habitList.length; i++){
    squares[i].innerHTML = "";
  }
  // Remove habit
  for (i = 0; i<habitList.length; i++){
    if (habitList[i].name === habitName){
      habitList.splice(i,1);
    }
  }
  // Load the page again
  loadPage();
}


function submitChanges(habitName){

  var habit;

  for (i = 0; i < habitList.length; i++){
    if (habitList[i].name === habitName){
      habit = habitList[i];
    }
  }

  var input = document.getElementById(habitName + "-head");
  var textarea = document.getElementById(habitName + "-textarea");

  var newTitle = input.value;
  var newDescription = textarea.value;

  if (newTitle.includes("\"")){
    var errorMessage = document.getElementById("error")
    errorMessage.style.display = "inline";
    loadPage();
    return;
  }

  habit.name = newTitle;
  habit.description = newDescription;

  loadPage();

}


function addBlankHabit(){
  var habit = new Habit("Add Habit Name", "Add Habit Description");
  habit.checkbox = new Array(7).fill(null);
    
  habitList.push(habit);
  loadPage();

}





function loadPage(){
    changeRows();
    addHabits();
}



function openSearchBox(){
    var form = document.getElementById("item-adder");
    let textBox = document.createElement("input");
    textBox.id = "habit_content";
    form.prepend(textBox);
    form.action = "javascript:addHabit(habit_content.value)";
}

function addHabit(val){
    list.push(val);
    loadPage();
    var form = document.getElementById("item-adder");
    form.innerHTML = "<input type=\"submit\" id=\"add-button\" value=\"Add Item\" />"
    form.action = "javascript:openSearchBox()";
}

function changeRows(){
    let n = habitList.length;
    let rows = Math.ceil(n/4);
    document.documentElement.style.setProperty('--rows', rows);
    // html doc, style element, property of style element 
}


function addHabits(){
    var squares = document.getElementsByClassName("square");
    for (i = 0; i<habitList.length; i++){
        
      var realHabitName = safeString(habitList[i].name);
      
        squares[i].innerHTML = `
        
        <h3 id = "${habitList[i].name}">${habitList[i].name}</h3>
        <p id = "${habitList[i].name}-description" class="description">
            ${habitList[i].description}
        </p>
        <div class="checkbox">
            <div class="${habitList[i].name} checkbox-item"></div>
            <div class="${habitList[i].name} checkbox-item"></div>
            <div class="${habitList[i].name} checkbox-item"></div>
            <div class="${habitList[i].name} checkbox-item"></div>
            <div class="${habitList[i].name} checkbox-item"></div>
            <div class="${habitList[i].name} checkbox-item"></div>
            <div class="${habitList[i].name} checkbox-item"></div>
        </div>
        <div class="foot">
          <div class="checkboxes">
            <img src="images/check.png" alt="" onclick = "addDay(\'${realHabitName}\', true)"/><img
              src="images/X.png"
              alt=""
              onclick = "addDay(\'${realHabitName}\', false)"
            />
          </div>
          <div id = "${habitList[i].name}-edit" class="edit">
            <p class = "edit-button" onclick = "editHabit(\'${realHabitName}\')">Edit</p>
            <p class = "remove-button" onclick = "removeHabit(\'${realHabitName}\')">Remove</p>
          </div>
        </div>
      </div>`;
      var checkbox_items = document.getElementsByClassName(habitList[i].name + " checkbox-item");
      for (j = 0; j<habitList[i].checkbox.length; j++){
        if (habitList[i].checkbox[j] === true){
          checkbox_items[j].innerHTML = "✓";
          checkbox_items[j].style =  "color:#048526";
        }
        else if (habitList[i].checkbox[j] === false){
          checkbox_items[j].innerHTML = "✕";
          checkbox_items[j].style = "color:#e30707";
        }
      }
    }
}

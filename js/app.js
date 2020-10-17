
// Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input")
const footer = document.querySelector(".add-to-do");


// Classes Names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough"

// Get Todays Date
const today = new Date()
// Format date to: EX: Friday, Oct, 16
const options = { weekday: "long", month: "short", day: "numeric" }
dateElement.innerHTML = today.toLocaleDateString("en-US", options)

// Variables
let LIST = [];
let id = 0;


/*
Helper Function that adds a new element to the to do list with the text "toDO"
- Works by adding the HTML to the <ul> in the HTML
*/
function addToDo(toDo, id) {
    // *** Need to use back ticks in order to do string template literals!!!
    const item = `<li class="item"> 
                    <i class="fa fa-circle-thin co" button="mark" id="${id}"></i>
                    <p class="text"> ${toDo} </p> 
                    <i class="fa fa-trash-o de" button="trash" id="${id}"></i>
                  </li>`;
  
    const position = "beforeend" //insert new row at the bottom
    list.insertAdjacentHTML(position, item);
} 



/*
Add an event listener for the release after any key is pressed and it will call a function that takes an event as input
- if the event has the keyCode of 13 then the user pressed the "Enter" button
*/
document.addEventListener("keyup", function(event) {
    
    /*
    if the key pressed is the enter button (keyCode == 13)
    Than get the text value of the input box and call the addToDo method
    */
    if (event.keyCode == 13) { 
        const toDo = input.value; // Value of what is typed in

        // If the input isn't empty
        if (toDo) {
            addToDo(toDo, id);

            // Add a new object (with 4 attributes) to the LIST array to represent this new item
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            id++;
        }

        //localStorage.setItem("TODO", JSON.stringify(LIST));

        // Clear the input text
        input.value = ""


    }
});

/*
Event listener that lets you add to the task list by typing something in the footer
then pressing the blue plus button
*/
footer.addEventListener("click", function (event) {
    // console.log("clicked add-to-do class");
    const element = event.target;

    // Only add to the list if we hit the + button
    if (element.attributes.button) {
        // Now check if there is any text in the box
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id);

            // Add a new object (with 4 attributes) to the LIST array to represent this new item
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            id++;
        }

        // Clear the input text
        input.value = ""
        }
});


/*
Function to be run when we click on the circle to mark an item complete.
*/
function markToDo(task) {
    // If the task is done and we click it then it becomes undone
    task.classList.toggle(CHECK); // if CHECK is set remove it, otherwise add it

    // If the task is not done and we click it then it will become done
    task.classList.toggle(UNCHECK); // if UNCHECK is set remove it, otherwise add it

    // Get the text of the task and toggle that too
    task.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    // --- Now need to update the LIST array ---
    // Get the id of the current task
    currentTaskId = task.id;
    // Check the LIST array of currentTaskID, if it's done feature is true set it to false or vice versa
    LIST[currentTaskId].done = LIST[currentTaskId].done ? false : true; // if done was true set it to false, if done is false set it to true, 
}


/*
Function to be run when we want to Trash/Delete a task
*/
// remove to do -- trash button
function trashToDo(task) {
    // task.parentNode.parentNode refers to the entire unordered list
    // task.parentNode            refers to the row in the unordered list
    // So this will remove the row from the unordered list of tasks
    task.parentNode.parentNode.removeChild(task.parentNode);

    // --- Now need to update the LIST array ---
    LIST[task.id].trash = true;
}


/*
Event listener so when a user clicks on a button in the list we call the corresponding function
*/
list.addEventListener("click", function(event) {
    // event.target = <i class=​"fa fa-trash-o de" button=​"trash" id=​"1">​</i>​ (The Trash icon)
    const element = event.target; // return the clicked element inside the list element

    // If the user clicked an actual button (circle or trash)
    if (element.attributes.button) {

        const taskButtonClicked = element.attributes.button.value; // complete or delete

        if (taskButtonClicked == "mark") { // if the user clicke the circle -> mark it
            markToDo(element);
        } else if (taskButtonClicked == "trash") { // if the user clicked the trash -> delete the row
            trashToDo(element)
        }

    //localStorage.setItem("TODO", JSON.stringify(LIST));
    }
});


/*
Event listener so when you hit the clearAllButton you delete the current task list and create a new empty task list
*/
clear.addEventListener("click", function (clearAllButton) {
    console.log("Hit the clearAllButton");
    if (clearAllButton) {
        // Set the list HTML to just an empty unordered list
        list.innerHTML = ``

        // Clear out the LIST array and reset the id to 0
        LIST = [];
        id = 0;

    }
});
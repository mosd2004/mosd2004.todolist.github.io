//Define UI Vars 04:16

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  //DOM load Event 
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear All task event
  clearBtn.addEventListener("click", clearTask);

  // Clear All task event
  filter.addEventListener("keyup", filterTask);
}


   //getTasks from LS 
  function getTasks(){
     let tasks;
      if(localStorage.getItem('tasks') === null){
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
    
    tasks.forEach(function(task){
      //create li Element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"><i>';
    //Append the link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
                  
                  });
    
  }




  // add Task
  function addTask(e) {
    if (taskInput.value === "") {
      alert("Please Add a task");
    } else {

    //create li Element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"><i>';
    //Append the link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    
    // STORE IN LS
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = "";

    e.preventDefault();
  }//end of addtask function
}
  
    function storeTaskInLocalStorage(task){
      let tasks;
      if(localStorage.getItem('tasks') === null){
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
        tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      }

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      //Remove from LS 
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
} //end of remove task 

//Remove from Ls 
function removeTaskFromLocalStorage(taskItem){
   let tasks;
      if(localStorage.getItem('tasks') === null){
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
  tasks.forEach(function(task, index){
       if(taskItem.textContent === task){
         tasks.splice(index, 1);
       }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Cealr Tasks

function clearTask() {
  // taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTaskfromLocalStorage();
}//end of clear task function

// clear Task from Ls 
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
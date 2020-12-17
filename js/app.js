//P: User interaction doesn't work
//S: Create user interaction features

var taskInput = document.getElementById('new-task'); //#new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTaskHolder = document.getElementById('incomplete-tasks');
var completedTaskHolder = document.getElementById('completed-tasks');

//New Task list item
var createNewTaskElement = function(taskString) {
  console.log(taskString);

  var listItem = document.createElement('li');

  var checkbox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');

  //each element needs modifying

  checkbox.type = 'checkbox';
  label.innerText = taskString;
  editInput.type = 'text';
  editButton.className = 'edit';
  editButton.innerHTML = 'Edit';
  deleteButton.className = 'delete';
  deleteButton.innerHTML = 'Delete';

  //each element needs appending

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

//Add a new task
var addTask = function() {
  // console.log('bugger');
  //Create new list item with text from #new-task

  if (taskInput.value !== '') {
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  }
  taskInput.value = '';
};

//Edit existing task
var editTask = function() {
  // console.log('edit');

  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var containsEditMode = listItem.classList.contains('editMode');

  if (containsEditMode) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  listItem.classList.toggle('editMode');

};

//Delete task

var deleteTask = function() {
  // console.log('delete');
  //When delete is pressed
    //Remove parent li from ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

//Mark task as complete
var taskCompleted = function() {
  // console.log('complete');

    //Append task to the #completed-tasks

  var listItem = this.parentNode;
  completedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};


//Mark task as incomplete
var taskIncomplete = function() {
  // console.log('incomplete');

    //append it to #incomplete-tasks

  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  // console.log('bind listitem events');

  //select its children
  var checkbox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');

    //bind editTask to edit button

  editButton.onclick = editTask;
    //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
    //bind taskCompleted to checkbox
  checkbox.onchange = checkBoxEventHandler;
};

addButton.addEventListener('click', addTask);

//cycle over incompleteTaskHolder ul li(s)
  //for each item in the list-

for(var i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list item's children (taskCompleted)

  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completeTaskHolder ul li(s)
  //for each item in the list-
for(var i = 0; i < completedTaskHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}

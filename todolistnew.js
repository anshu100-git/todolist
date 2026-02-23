const addBtn = document.querySelector(".add-btn");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const TASKLIST_KEY = "taskList";
let TASK_KEY = null;
const updateBtn = document.querySelector(".update-btn");

let taskList = JSON.parse(localStorage.getItem(TASKLIST_KEY)) || [];

console.log(taskList)

if (taskList.length) {
  console.log(taskList)
  render(taskList)

}

function render(task) {
  todoList.innerHTML = ""
  if (taskList.length) {
    taskList.forEach((task, index) => {
      loadTodo(task, index)
    });
  }
}

// this code for running on browser
function loadTodo(taskObj, key) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  todoList.append(todoItem);

  const itemContentContainer = document.createElement("div");
  itemContentContainer.classList.add("left");
  todoItem.append(itemContentContainer);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = taskObj.isCompleted;
  itemContentContainer.append(checkbox);

  // complete or incomplete the existing task
  checkbox.addEventListener("input", () => {
    handleTaskCompletion(key)
  });

  const task = document.createElement("span");
  task.innerHTML = taskObj.value;
  itemContentContainer.append(task);

  // create actionconatiner for both button
  const actionconatiner = document.createElement("div")
  actionconatiner.classList.add("actionconatiner")
  todoItem.append(actionconatiner)

  // create editBtn
  const editBtn = document.createElement("button")
  editBtn.classList.add("edit-btn")
  editBtn.innerHTML = "✏️"
  actionconatiner.append(editBtn)

  editBtn.addEventListener("click", () => {
    handleEditBtnClick(key)
  })

  // create deleteBtn
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "❌";
  actionconatiner.append(deleteBtn);


  // Delete task
  deleteBtn.addEventListener("click", () => {
    handledeletetodo(key)
  });


}

updateBtn.addEventListener("click", handleUpdateBtnClick)
addBtn.addEventListener("click", handleAddTodo)

addBtn.addEventListener("click", () => {
  handleAddTodo()
  todoInput.value = "";
})



todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {

    if (TASK_KEY !== null) {
      taskList[TASK_KEY].value = todoInput.value;
      localStorage.setItem(TASKLIST_KEY, JSON.stringify(taskList));
      render(taskList);

      TASK_KEY = null;
      addBtn.classList.remove("remove-btn");
      updateBtn.classList.add("remove-btn");
      todoInput.value = "";

    } 
    else {
      handleAddTodo();
      todoInput.value = "";
    }
  }
});

function handleAddTodo() {

  if (todoInput.value.trim() == "") return;
  const taskObj = {
    value: todoInput.value,
    createdAt: new Date(),
    isCompleted: false,
    compledtedAt: null,
  }
  taskList.push(taskObj)
  localStorage.setItem(TASKLIST_KEY, JSON.stringify(taskList))
  render(taskList)
  console.log(taskList)
}

function handledeletetodo(key = null) {
  if (key == NaN) return;
  taskList.splice(key, 1);
  localStorage.setItem(TASKLIST_KEY, JSON.stringify(taskList));
  render(taskList);
}


function handleTaskCompletion(key) {
  if (key == NaN) return;
  taskList[key].isCompleted = !taskList[key].isCompleted;
  localStorage.setItem(TASKLIST_KEY, JSON.stringify(taskList));
  render(taskList);
}

function handleEditBtnClick(key) {
  if (key == null) return;
  TASK_KEY = key;
  todoInput.value = taskList[key].value;
  addBtn.classList.add("remove-btn")
  updateBtn.classList.remove("remove-btn")
}

function handleUpdateBtnClick() {
  if (TASK_KEY == null) return;
  taskList[TASK_KEY].value = todoInput.value;
  localStorage.setItem(TASKLIST_KEY, JSON.stringify(taskList));
  render(taskList);
  addBtn.classList.remove("remove-btn")
  updateBtn.classList.add("remove-btn")
  todoInput.value = ""
}













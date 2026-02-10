let activeTasks = JSON.parse(localStorage.getItem("active")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completed")) || [];

function saveData() {
  localStorage.setItem("active", JSON.stringify(activeTasks));
  localStorage.setItem("completed", JSON.stringify(completedTasks));
}

function addTask() {
  const task = document.getElementById("taskInput").value;
  const from = document.getElementById("fromTime").value;
  const to = document.getElementById("toTime").value;

  if (!task || !from || !to) {
    alert("Please fill all fields");
    return;
  }

  activeTasks.push({ task, from, to });
  saveData();
  render();

  document.getElementById("taskInput").value = "";
}

function completeTask(index) {
  completedTasks.push(activeTasks[index]);
  activeTasks.splice(index, 1);
  saveData();
  render();
}

function render() {
  const activeList = document.getElementById("activeList");
  const completedList = document.getElementById("completedList");

  activeList.innerHTML = "";
  completedList.innerHTML = "";

  activeTasks.forEach((item, index) => {
    activeList.innerHTML += `
      <li>
        <strong>${item.task}</strong>
        <div class="task-time">${item.from} → ${item.to}</div>
        <button class="complete-btn" onclick="completeTask(${index})">✔</button>
      </li>
    `;
  });

  completedTasks.forEach(item => {
    completedList.innerHTML += `
      <li>
        <strong>${item.task}</strong>
        <div class="task-time">${item.from} → ${item.to}</div>
      </li>
    `;
  });
}

render();

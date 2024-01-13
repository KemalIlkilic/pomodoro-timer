let tasks = [];

function updateTime() {
  chrome.storage.local.get(["timer", "timeOption"], (res) => {
    const time = document.getElementById("time");
    const minutes = res.timeOption - Math.ceil(res.timer / 60);
    const seconds = (60 - (res.timer % 60)) % 60;
    time.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  });
}
updateTime();
setInterval(updateTime, 1000);

const startTimerBtn = document.getElementById("start-timer-btn");
//Su alti ben ekledim
chrome.storage.local.get(["isRunning"], (res) => {
  startTimerBtn.textContent = res.isRunning ? "Pause Timer" : "Start Timer";
});
// ustu ben ekledim
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? "Pause Timer"
          : "Start Timer";
      }
    );
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer";
    }
  );
});

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({ tasks: tasks });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNum];
  text.className = "task-input";
  /* text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
  });
  text input olusturdun ve o andaki task.length aldin. text inputa onChange Event Listener ekledin.
  ve ilgili task olsun diye tasks[taskNum] = text.value; yaptin ve burada islemleri bitirdin.
  js sana kiyak geciyor. Yaratildigi andaki taskNum'u ve eventListeneri unutmuyor. Aklinin bir kosesine yaziyor.
  Sen oraya bir seyler yazdiginda o eventListeneri calistiriyor. Ve o inputun taskNum"unu da hatirlayip
  Arrayde o tasks[taskNum] ile ilgili kisimdaki veriyi guncelliyor.
  (The taskNum is determined at the time the task is created,)
  This is a feature of JavaScript called closure, 
  where inner functions have access to the variables of outer functions
  even after the outer function has finished executing.
  */
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.className = "task-delete";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });
  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}

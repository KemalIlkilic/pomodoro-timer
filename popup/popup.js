const tasks = [];

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");

  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
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
  // !!! The key here is that the taskNum is captured in the closure created by the arrow function
  // () => { tasks[taskNum] = text.value; }. This means that even as the addTask function is called multiple times
  // and the taskNum variable changes,
  // each event listener remembers the taskNum value from when it was created.!!!
  /*
  Now, let's say you add multiple tasks. Each time you add a task, a new taskNum is created,
  and a new event listener is added to the new task's text input field.
  Each event listener "remembers" the taskNum from when it was created,
  so it knows which task to update in the tasks array.
  */
  // Memory of taskNum and text: Each time addTask runs, a new closure is created for the change event listener.
  // This closure remembers the taskNum and text from that specific execution of addTask
  // When you change the text in one of the input fields, the corresponding event listener
  // knows exactly which task (tasks[taskNum]) to update because it "remembers" its taskNum.
  // This is a practical example of how closures allow functions to
  // retain access to variables from their parent function's scope,
  //even after that parent function has finished executing.
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

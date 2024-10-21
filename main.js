let tasks = []; // empty array

document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.tasks);
    if(storedTasks){ // the same as if (localStorage.tasks != null))
        tasks = storedTasks; // the same as tasks = JSON.parse(localStorage.tasks);
        updateTaskList();
        updateStats();
    }
})
const saveTasks = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if(text){ // if true
        tasks.push({text: text, completed: false});
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
}

const updateTaskList = () =>{
    const taskList = document.getElementById("task-list")
    taskList.innerHTML = ''

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
            <p>${task.text}</p>
                </div>
            <div class="icons">
            <img src="/images/edit.png" onclick="editTask(${index})"/>
            <img src="/images/bin.png" onclick="deleteTask(${index})"/> 
            </div>
        </div>
        `;
        listItem.addEventListener("change", () => toggleTaskComplete(index))
        taskList.appendChild(listItem);
    });
}
document.getElementById("submit").addEventListener("click", function(e){
    e.preventDefault();

    addTask();
});
const toggleTaskComplete = (index)=>{
    tasks[index].completed = !tasks[index].completed; //is used to reverse boolean value
    updateTaskList();
    updateStats();
    saveTasks();
}
const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}
const editTask = (index) => {
    taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    taskInput.focus();
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}
const updateStats = ()=>{
    const completeTasks = tasks.filter((task) => task.completed).length; // عدد المهام بعد الفلترة حسب الشرط اللي حطيته
    const totalTasks = tasks.length; // عدد المهام كلها من غير فلترة
    const progress = (completeTasks/totalTasks)*100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`
    if(tasks.length&&completeTasks==totalTasks)
        blaskconfettie();
}
const blaskconfettie = () =>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

    




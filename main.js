let submit = document.getElementById("submit");
let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value != ''){
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '\u00d7'
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
},false);

function saveData(){
    localStorage.setItem("task", listContainer.innerHTML)
}
function showData(){
    listContainer.innerHTML = localStorage.task;
}
showData();




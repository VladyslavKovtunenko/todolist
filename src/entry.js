import Todolist from './TodoList'
var list = new Todolist();
var taskList = document.getElementById('list');

taskList.onclick = function (event) {
    var target = event.target;
    var action = target.getAttribute('data-action');
    if (action != 'delete') return;
    
    list.deleteTask(target.getAttribute('id'));
};

document.body.onload = function () {
    list.loadlist();
    document.getElementById("set").addEventListener("click", list.setNewTask, false);
};

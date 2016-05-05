var list = new todolist();
var taskList = document.getElementById('list');

taskList.onclick = function (event) {
    var target = event.target;
    var action = target.getAttribute('data-action');

    if (action != 'delete') return;

    target.parentNode.parentNode.innerHTML = "";
};
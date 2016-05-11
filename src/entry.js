import Todolist from './TodoList'

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render( <h1>Hello, world!</h1>, document.getElementById('example'));
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

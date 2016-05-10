import database from './Database'

export default function Todolist() {

    var Data = new database();
    var task;
    
    this.setNewTask = () => {
        task = {title: document.getElementById("task_title").value,
                description: document.getElementById("task_description").value};
        Data.setTask(task);
        this.loadlist();
        document.getElementById("task_title").value = "";
        document.getElementById("task_description").value = "";
    };

    this.loadlist = () => {
        Data.getTasks();
    };

    this.deleteTask = (taskID) => {
        Data.delete(taskID);
        this.loadlist();
    }
}

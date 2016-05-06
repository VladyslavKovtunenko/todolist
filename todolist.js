function database() {
    var data = new Firebase("https://vivid-torch-5093.firebaseio.com");

    this.setTask = function (task) {
        data.once("value", function (snap) {
            var i = snap.val().counter;
            task.id = i;
            data.child("tasks/" + i).update(task);
            i++;
            data.child("counter").set(i);
        });
        this.getTasks();
    };

    this.getTasks = function () {
        data.on("value", function(snapshot) {
            var outputData = snapshot.val();
            // var i = snapshot.val(;

            var template = "<ol> {{#tasks}} <li>" +
                "{{title}}<ul><li>{{description}}</li></ul>" +
                "<p><button type='button' data-action='delete' id='" + "{{id}}" +
                "'>Delete task</button></p>{{/tasks}}</li></ol>";

            var output = Mustache.render(template, outputData);
            document.getElementById('list').innerHTML = output;
        });
    };

    this.delete = function (id){
        data.once("value", function (snapshot) {
            var currentCounter = snapshot.val().counter,
                i,
                nextID;

            // console.log(snapshot.val().tasks[id]);

            for(i = id; i < currentCounter - 1; i++){
                nextID = +i+1;
                data.child("tasks/" + i + "/").set(snapshot.val().tasks[nextID]);
                data.child("tasks/" + i + "/id").set(snapshot.val().tasks[i].id);
            }

            data.child("tasks/" + i).set(null);
            data.child("counter").set(currentCounter-1);
        });
    };

}

function todolist() {

    var Data = new database();
    var task;

    this.setNewTask = function () {
            task = {title: document.getElementById("task_title").value,
                description: document.getElementById("task_description").value};
            Data.setTask(task);
            this.loadlist();
    };

    this.loadlist = function () {
        Data.getTasks();
    };

    this.deleteTask = function (taskID) {
        Data.delete(taskID);
        this.loadlist();
    }
}
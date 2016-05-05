function database() {
    var data = new Firebase("https://vivid-torch-5093.firebaseio.com");

    this.setTask = function (task) {
        data.once("value", function (snap) {
            var i = snap.val().counter;
            data.child("tasks/" + i).update(task);
            i++;
            data.child("counter").set(i);
        });
        this.getTasks();
    };

    this.getTasks = function () {
        data.on("value", function(snapshot) {
            var outputData = snapshot.val();

            var template = "<ol> {{#tasks}} <li>" +
                "{{title}}<ul><li>{{description}}</li></ul>" +
                "<p><button type='button' data-action='delete'>Delete task</button></p>{{/tasks}}</li></ol>";
            
            var output = Mustache.render(template, outputData);
            document.getElementById('list').innerHTML = output;
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
}
function database() {
    var data = new Firebase("https://vivid-torch-5093.firebaseio.com");
    this.count = getCount();

    this.setTask = function (task) {
        var i = this.count;
        data.child("tasks/" + i).update(task);
        i++;
        data.child("counter").set(i);
    };

    this.getTasks = function () {
        data.once("value", function(snapshot) {
            var outputData = snapshot.val();

            template = "<ol> {{#tasks}} <li>" +
                "{{title}}<ul><li>{{description}}</li></ul>" +
                "</li><p><button type='button' data-action='delete'>Delete task</button></p>{{/tasks}}</ol>";
            
            var output = Mustache.render(template, outputData);
            document.getElementById('list').innerHTML = output;
        });
    };

    function getCount() {
        return data.once("value", function (snap) {
            return snap.val().counter;
        });
    }

}

function todolist() {

    var Data = new database();
    var tasks = [];

    this.setNewTask = function () {
        tasks[Data.count] = {title: document.getElementById("task_title").value,
            description: document.getElementById("task_description").value};
        Data.setTask(tasks[Data.count]);
        this.loadlist();
    };

    this.loadlist = function () {
        Data.getTasks();
    };
    
    
    /*
     var taskList = document.getElementById('list');

     taskList.onclick = function (event) {
     var target = event.target;
     var action = target.getAttribute('data-action');

     if(action === 'delete'){
     console.log('ok');

     }

     };*/
}
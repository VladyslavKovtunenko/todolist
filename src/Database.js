import template from './template.html'
export default function database() {
    var data = new Firebase("https://vivid-torch-5093.firebaseio.com");

    this.setTask = (task) => {
        data.once("value", function (snap) {
            var i = snap.val().counter;
            task.id = i;
            data.child("tasks/" + i).update(task);
            i++;
            data.child("counter").set(i);
        });
        this.getTasks();
    };

    this.getTasks = () => {
        data.on("value", function(snapshot) {
            var outputData = snapshot.val();
            document.getElementById('list').innerHTML = template(outputData);
        });
    };

    this.delete = (id) => {
        data.once("value", function (snapshot) {
            var currentCounter = snapshot.val().counter,
                i,
                nextID;

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
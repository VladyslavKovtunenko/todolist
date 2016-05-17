import React from 'react'
import ReactDOM from 'react-dom'

export default function database() {
    var data = new Firebase("https://vivid-torch-5093.firebaseio.com");

    var Task = React.createClass({
        render: function () {
            return <li>{this.props.task.title}<ul>
                    <li>{this.props.task.description}</li>
                    <button type='button' data-action='delete' id={this.props.index}>Delete task</button></ul></li>;
        }
    });

    var Todo = React.createClass({
        render: function () {
            return <ol>{this.props.tasks.map((task, index) => (<Task task={task} index={index}/>))}</ol>;
        }
    });
    
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
            ReactDOM.render(<Todo tasks={snapshot.val().tasks}/>, document.getElementById('list'));
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

import React from 'react'
import ReactDOM from 'react-dom'

export default function database() {
    var data = new Firebase("https://vivid-torch-5093.firebaseio.com");

    var Template = React.createClass({
        render: function () {
            return <li>{this.props.list.title}
            <ul>
                <li>{this.props.list.description}</li>
            </ul>
            <p>
            <button type='button' data-action='delete'>Delete task</button>
            </p>
            </li>;
        }
    });

    var Project = React.createClass({
        render: function () {
            return <ol>
                <Template />
            </ol>;
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
            var task = {},
                count = snapshot.val().counter;

            for(var i = 0; i < count; i++){
                task.title = snapshot.val().tasks[i].title;
                task.description = snapshot.val().tasks[i].description;
                task.id = "'" + (1+i) + "'";
                console.log(task.id);
                ReactDOM.render(<Template list={task} />, document.getElementById('next'));
            }
            /*task.title = snapshot.val().tasks[0].title;
            task.description = snapshot.val().tasks[0].description;
            ReactDOM.render(<Template list={task} />, document.getElementById('next'));*/
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

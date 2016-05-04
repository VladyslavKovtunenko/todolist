var view = {
    tasks: [
        {   title: "working",
            description : "All day"},
        {   title: "walking",
            description : "All night"}
    ]
};

var template = "<ol> {{#tasks}} <li>" +
        "{{title}}<ul><li>{{description}}</li></ul>" +
    "</li>{{/tasks}}</ol>";

function loadlist(){
    var output = Mustache.render(template, view);
    document.getElementById('list').innerHTML = output;
}
var command = {
    todomsg: {
        creator: {
            name: "hehe"
        }
    }
};

var jumpPath = "/jump/www";
var imgPath = "/img/www"
var todoHtml = "<div class='todo-oDiv' onclick='window.open(" + jumpPath + ")'>" +
                    "<div class='todo-topDiv'>" +
                        "<p class='todo-titleDiv'>" +
                            "<img class='todo-titleImg' src='" + imgPath + "todo_20.png'>" +
                            command['todomsg']['creator']['name'] + "创建了待办：" +
                        "</p>" +
                    "</div>" +
                "</div>"
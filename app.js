const bodyParser = require("body-parser");
const express = require("express");
const app = express();
let todos = [];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
    var today = new Date();
    var currentDay = today.getDay();
    // var day = "";
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    var day = today.toLocaleDateString("en-US", options);
    // if (today.getDay() === 6 || today.getDay() === 0) {
    //     day = "weekend";
    // } else {
    //     day = "weekday";
    // }
    res.render("list", {
        listTitle: day,
        newListItems: todos,
    });
});
app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work",
        newListItems: workItems,
    });
});

app.post("/", (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        var todo = req.body.newItem;
        todos.push(todo);
        res.redirect("/");
    }


});
app.post("/work", (req, res) => {
    let todo = req.body.newItem;
    workItems.push(todo);
    res.redirect("/work");
});

app.listen(3000, () => {
    console.log(" server up and running");
});
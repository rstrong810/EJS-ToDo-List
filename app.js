const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {
        listTitle: day, listItems: items}
    );

});

app.post('/', (req, res) => {
    let item = req.body.newItem;

    if(req.body.button === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get('/work', (req, res) => {
    res.render("list", {listTitle: "Work List", listItems: workItems}); 
});

app.post("work", (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
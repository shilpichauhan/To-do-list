const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let items = ["eating", "Swimming"];
let workitem = [];

app.set("view engine", "ejs");
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.sendFile(__dirname+"/index.html")
  let today = new Date();

  let option = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", option);

  res.render("list", { listTitle: day, nitem: items });
});


app.post("/", (req, res) => {
  let item = req.body.newitem;
  console.log(req.body);

  if (req.body.list === "Work") {
    workitem.push(item);
    res.redirect("/work");
  } 
  else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", nitem: workitem });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

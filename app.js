const path = require("path");
const fs = require('fs');

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

//routes
const blogs = require("./routes/blogs");
const posts = require("./routes/posts");
const getCollection = require("./utils").getCollection;

//template
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(bodyParser.json());

app.use("/blogs", blogs);
app.use("/posts", posts);

app.get('/', (req, res) => {
	res.render('home')
}) 

app.get("/archive", (req, res) => {
	fs.readFile(getCollection('blogs.json'), (err, data) => {
		if (err) res.sendStatus(500)
		
		const posts = JSON.parse(data).filter(post => post.archive == true)
		res.render("all_posts", { title: "Hey", posts: posts });
	  })
	});

app.listen(8000, err => {
	if (err) throw err
	console.log("App is running on port 8000...")
})
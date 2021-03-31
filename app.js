const path = require("path");
const fs = require('fs');

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//routes
const posts = require("./routes/posts");
const comments = require("./routes/comments");
const getCollection = require("./utils").getCollection;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(bodyParser.json());

//template
app.set('view engine', 'pug')

app.use("/posts", posts);
app.use("/comments", comments);

app.get('/', (req, res) => {
	res.render('home')
}) 

app.get('/api/v1/posts', (req, res) => {
	fs.readFile('./database/blogs.json', (err, data) => {
	  if (err) throw err
  
	  const posts = JSON.parse(data)
  
	  res.json(posts)
	})
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
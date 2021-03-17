const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
	res.render('home')
}) 

app.get('/create_posts', (req, res) => {
	res.render('create_posts')
}) 

app.get('/posts', (req, res)=> {
	//const notes = ['first', 'second', 'third']
	const posts = require('./db')
	res.render('all_posts', { posts: posts })
})
//mocking the router handling for note detail page
app.get('/posts/detail', (req, res) => {
	res.render('post_detail')
})

app.listen(8000, err => {
	if (err) throw err
	console.log("App is running...")
})
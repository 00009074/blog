const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
	res.render('home')
}) 

app.get('/create_note', (req, res) => {
	res.render('create_note')
}) 

app.get('/notes', (req, res)=> {
	//const notes = ['first', 'second', 'third']
	const notes = require('./db')
	res.render('all_notes', { notes: notes })
})
//mocking the router handling for note detail page
app.get('/notes/detail', (req, res) => {
	res.render('note_detail')
})

app.listen(8000, err => {
	if (err) throw err
	console.log("App is running...")
})
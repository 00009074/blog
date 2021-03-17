const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.render('Hello!')
})

app.listen(8000, err => {
    if (err) throw err
    console.log("App is running on 8000 port")
})
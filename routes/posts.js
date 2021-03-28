const fs = require('fs')
const path = require('path')

const express = require("express")
const router = express.Router()

const Validator = require("../services/validators")
const DbContext = require("../services/db")
const root = require("../utils").root;
const getCollection = require("../utils").getCollection;

const dbc = new DbContext()
const v = new Validator()
dbc.useCollection("blogs.json")

router.get("/", (req, res) => {
  dbc.getAll(
    records => res.render("all_posts", { posts: records }),
    () => res.render("all_posts", { posts: null })
  )
})

router.get("/create-post", (req, res) => {
  res.render("create_post", {})
});

router.post("/create-post", (req, res) => {
  if (v.isValid(req.body)) {
    dbc.saveOne(req.body, () => res.render("create_post", { success: true }))
  } else {
    res.render("create_post", { error: true, success: false })
  }
})

router.get('/:id/delete', (req, res) => {
  dbc.deleteOne(
    req.params.id, 
    () => res.redirect('/')),
    () => res.sendStatus(500)
})

router.get("/:id/archive", (req, res) => {
  fs.readFile(getCollection('blogs.json'), (err, data) => {
    if (err) res.sendStatus(500)

    const posts = JSON.parse(data)
    const post = posts.filter(post => post.id == req.params.id)[0]
    const postIdx = posts.indexOf(post)
    const splicedPost = posts.splice(postIdx, 1)[0]
    splicedPost.archive = true
    posts.push(splicedPost)

    fs.writeFile(getCollection('blogs.json'), JSON.stringify(posts), err => {
      if (err) res.sendStatus(500)

      res.redirect('/posts')
    })
    
  })
})

router.get("/:id", (req, res) => {
  dbc.getOne(
    req.params.id,
    record => res.render("post_detail", { post: record }),
    () => res.sendStatus(404)
  )
})

module.exports = router;


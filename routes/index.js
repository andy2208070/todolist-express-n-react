const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const todoList = [
  {id: 1, title: '1️⃣ for A'},
  {id: 2, title: '2️⃣ for B'},
];

router.get('/todo', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(todoList);
});
router.post('/todo', async function (req, res, next) {
  const body = await req.body;
  const newTodo = {...body, id: crypto.randomUUID()};
  todoList.push(newTodo);
  res.send(newTodo);
});
router.patch('/todo/:id', async function (req, res, next) {
  const body = await req.body;
  const {id} = req.params;
  const todoIdx = todoList.findIndex(todo=>todo.id==id);
  if(todoIdx<0) {
    res.status(422);
    res.send(`❌ no such item!`)
  } else {
    todoList[todoIdx].title = body.title;
    res.send(todoList[todoIdx]);
  }
});
router.delete('/todo/:id', async function(req, res, next) {
  const {id} = req.params;
  const todoIdx = todoList.findIndex(todo=>todo.id==id);
  if(todoIdx<0) {
    res.status(422);
    res.send(`❌ no such item!`)
  } else {
    todoList.splice(todoIdx, 1);
    res.send(todoList);
  }
});

module.exports = router;

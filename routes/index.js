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
  res.send(todoList);
});

module.exports = router;

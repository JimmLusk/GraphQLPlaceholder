const faker = require('faker');
const fs = require('fs');

const todosToCreate = 100;
const existingUsers = 25;
let todos = [];

for(let i = 1; i <= todosToCreate; i++){
  let todo = {};
  todo.id = i;
  todo.userId = Math.floor((Math.random()*existingUsers)+1);
  todo.title = faker.lorem.sentence();
  todo.completed = Math.floor(Math.random()*2) === 1 ? true : false;
  todos.push(todo); 
}

const todosData = JSON.stringify(todos, null, 2);
fs.writeFile('./data/todos/todos.json', todosData, ()=>{console.log('wrote to todos.json');});
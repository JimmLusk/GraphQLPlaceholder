const faker = require('faker');
const fs = require('fs');

const existingUsers = 25;
const postsToCreate = 75;
let posts = [];
const commentsToCreate = 225;
let comments = [];

for(let i = 1; i <= postsToCreate; i++){
  let post = {};
  post.id = i;
  post.userId = Math.floor((Math.random()*existingUsers)+1);
  post.title = faker.lorem.sentence(Math.floor(Math.random()*8)+1);
  post.body = faker.lorem.paragraphs(Math.floor(Math.random()*3)+1);
  post.timestamp = Date.now() - Math.floor(Math.random()*31536000000);
  post.likes = Math.floor((Math.random()*(existingUsers/2))+1);
  posts.push(post);
}

for(let i = 1; i <= commentsToCreate; i++){
  let comment = {};
  comment.id = i;
  comment.postId = Math.floor((Math.random()*postsToCreate)+1);
  comment.userId = Math.floor((Math.random()*existingUsers)+1);
  comment.body = faker.lorem.sentences(Math.floor(Math.random()*3)+1);
  comment.timestamp = posts[comment.postId-1].timestamp + Math.floor(Math.random()*(Date.now()-posts[comment.postId-1].timestamp));
  comment.likes = Math.floor((Math.random()*(existingUsers/3))+1);
  comments.push(comment);
}

// console.log(posts);
// console.log(comments);

const postsData = JSON.stringify(posts, null, 2);
fs.writeFile('./data/posts/posts.json', postsData, ()=>{console.log('wrote to posts.json');});

const commentsData = JSON.stringify(comments, null, 2);
fs.writeFile('./data/posts/comments.json', commentsData, ()=>{console.log('wrote to comments.json');});
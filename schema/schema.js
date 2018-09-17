const graphql = require('graphql');
const _ = require('lodash');

// Users Data
const users = require('../data/users/users.json');
const addresses = require('../data/users/addresses.json');
const coords = require('../data/users/coords.json');
const dobs = require('../data/users/dobs.json');
const todos = require('../data/todos/todos.json');

// Posts Data
const posts = require('../data/posts/posts.json');
const comments = require('../data/posts/comments.json');


const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  // GraphQLNonNull // Will be used with mutations
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: ( ) => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    phone: { type: GraphQLString },
    address: {
      type: AddressType,
      resolve(parent, args){
        return addresses[parent.addressId-1]; // Using indecies in many places because they're faster/cheaper/easier than searching but if the data was out of order and did not have a 1 to 1 relationship would not work
      }
    },
    dob: {
      type: DOBType,
      resolve(parent, args){
        return dobs[parent.dobId-1]; 
      }
    },
    comments: {
      type : new GraphQLList(CommentType),
      resolve(parent, args){
        return _.filter(comments, {userId: parseInt(parent.id)});
      }
    },
    posts: {
      type : new GraphQLList(PostType),
      resolve(parent, args){
        return _.filter(posts, {userId: parseInt(parent.id)});
      }
    },
    todos: {
      type : new GraphQLList(TodoType),
      resolve(parent, args){
        return _.filter(todos, {userId: parseInt(parent.id)});
      }
    }
  })
});

const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: ( ) =>  ({
    id: { type: GraphQLID },
    line1: { type: GraphQLString },
    line2: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    coords: { 
      type: GeoType, 
      resolve(parent, args){
        return coords[parent.coordsId-1]; 
      }
    },
  })
});

const GeoType = new GraphQLObjectType({
  name: 'Coords',
  fields: ( ) =>  ({
    id: { type: GraphQLID },
    lat: { type: GraphQLFloat },
    long: { type: GraphQLFloat }
  })
});

const DOBType = new GraphQLObjectType({
  name: 'DOB',
  fields: ( ) =>  ({
    id: { type: GraphQLID },
    day: { type: GraphQLInt },
    month: { type: GraphQLString },
    year: { type: GraphQLInt },
  })
}); 

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: ( ) =>  ({
    id: { type: GraphQLID },
    timestamp: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    likes: { type: GraphQLInt }, 
    comments : {
      type : new GraphQLList(CommentType),
      resolve(parent, args){
        return _.filter(comments, {postId: parseInt(parent.id)});
      }
    },
    user : {
      type : UserType,
      resolve(parent, args){
        return users[parent.userId-1]; // This is faster/cheaper/easier than searching
      }
    }
  })
}); 

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: ( ) =>  ({
    id: { type: GraphQLID },
    timestamp: { type: GraphQLString },
    body: { type: GraphQLString },
    likes: { type: GraphQLInt }, 
    user : {
      type : UserType,
      resolve(parent, args){
        return users[parent.userId-1];
      }
    }
  })
}); 

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: ( ) =>  ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return users[args.id-1]; 
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return users;
      }
    },
    post: {
      type: PostType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return posts[args.id-1]; 
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args){
        return posts;
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
const faker = require('faker');
const fs = require('fs');
const {createFakeEmail, createFakeUsername, createFakeDOB} = require('./user-helpers');
const addresses = require('./seed-addresses.json').addresses;

let numberOfUsers = 25;
let usersArray = [];
let addressesArray = [];
let coordsArray = [];
let dobsArray = [];

for(let i = 1; i <= numberOfUsers; i++){
  const user = {};
  user.id = i;
  user.addressId = i;
  user.dobId = i;

  let address = {};
  address.id = i;
  address.coordsId = i;

  let coords = {};
  coords.id = i;

  let dob = {};

  const fakeDOB = createFakeDOB();
  dob = { id: i, ...fakeDOB };
  
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  user.name = firstName + ' ' + lastName;

  user.email = createFakeEmail(firstName, lastName);
  user.username = createFakeUsername(firstName, lastName, fakeDOB);
  user.phoneNumber = faker.phone.phoneNumber(); // Maybe get appropriate area codes at some point

  const pickedAddress = addresses[Math.floor(Math.random()*99)];
  address = { 
    id: i, 
    coordsId: i, 
    line1: pickedAddress.address1,
    line2: pickedAddress.address2,
    city: pickedAddress.city,
    state: pickedAddress.state,
    postalCode: pickedAddress.postalCode
  };

  coords = { id: i, ...pickedAddress.geo }


  usersArray.push(user);
  addressesArray.push(address);
  coordsArray.push(coords);
  dobsArray.push(dob);
}

//console.log(usersArray);
const usersData = JSON.stringify(usersArray, null, 2);
fs.writeFile('./data/users/users.json', usersData, ()=>{console.log('wrote to users.json')});

// console.log(addressesArray);
const addressesData = JSON.stringify(addressesArray, null, 2);
fs.writeFile('./data/users/addresses.json', addressesData, ()=>{console.log('wrote to addresses.json')});

// console.log(coordsArray);
const coordsData = JSON.stringify(coordsArray, null, 2);
fs.writeFile('./data/users/coords.json', coordsData, ()=>{console.log('wrote to coords.json')});

// console.log(dobsArray);
const dobsData = JSON.stringify(dobsArray, null, 2);
fs.writeFile('./data/users/dobs.json', dobsData, ()=>{console.log('wrote to dobs.json')});
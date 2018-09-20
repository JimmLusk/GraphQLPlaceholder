
const createFakeEmail = (firstName, lastName) => {
  let email = '';
  let number = Math.floor(Math.random()*10);
  switch(number){
  case(1):
    email = firstName + '' + lastName + '@gmail.com';
    break;
  case(2):
    email = firstName[0] + '' + lastName + '@gmail.com';
    break;
  case(3):
    email = firstName + '' + lastName[0] + '@gmail.com';
    break;
  case(4):
    email = firstName + '_' + lastName + '@gmail.com';
    break;
  case(5):
    email = firstName + '.' + lastName + '@yahoo.com';
    break;
  case(6):
    email = firstName[0] + '' + lastName + '@yahoo.com';
    break;
  case(7):
    email = firstName[0] + '' + lastName + '@outlook.com';
    break;
  case(8):
    email = firstName + '.' + lastName + '@outlook.com';
    break;
  case(9):
    email = firstName + `@${lastName}.com`;
    break;
  default:
    email = firstName + `@${lastName}.me`;
  }
  return email;
};

const createFakeUsername = (firstName, lastName, DOB) => {
  let username = '';
  let number = Math.floor(Math.random()*10);
  switch(number){
  case(1):
    username = firstName + '' + lastName;
    break;
  case(2):
    username = firstName[0] + '' + lastName;
    break;
  case(3):
    username = firstName + '' + lastName[0];
    break;
  case(4):
    username = firstName + lastName + DOB.year;
    break;
  case(5):
    username = firstName + lastName[0] + lastName[1];
    break;
  case(6):
    username = 'real' + firstName + lastName;
    break;
  case(7):
    username = firstName + 'lovesHorses';
    break;
  case(8):
    username = 'Official' + lastName + firstName;
    break;
  case(9):
    username = lastName + firstName;
    break;
  default:
    username = firstName + '2';
  }

  if(Math.random() > 0.25 || username.length < 9){
    return username + Math.floor(Math.random()*100);
  } else {
    return username;
  }
};

const createFakeDOB = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const DOB = {};
  DOB.month = months[Math.floor(Math.random()*12)];
  DOB.day = Math.floor(Math.random()*28); // At least 28 days in each month, saves writing more logic
  DOB.year = 1950 + Math.floor((Math.random()*50)+(Math.random()*50)); // Ensures all users are at least 13 and tend to b twenties or thirties
  if(DOB.year > 2004){
    DOB.year = 2004 - Math.floor(Math.random()*6);
  }
  return DOB;
};

const createFakeAvatar = () => {
  const avatar = {};
  const variety = Math.floor(Math.random()*5000);
  avatar.thumbnail = `https://api.adorable.io/avatars/${50}/${variety}`;
  avatar.small = `https://api.adorable.io/avatars/${150}/${variety}`;
  avatar.medium = `https://api.adorable.io/avatars/${250}/${variety}`;
  avatar.large = `https://api.adorable.io/avatars/${400}/${variety}`;

  return avatar;
};

module.exports = {createFakeEmail, createFakeUsername, createFakeDOB, createFakeAvatar};